import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

interface ManifestChunk {
	css?: string[];
}

function toCssPathsRelativeToRemoteEntry(
	cssFiles: string[],
	distDir: string,
	remoteEntryDir: string,
): string[] {
	return cssFiles.map((cssFile) => {
		const absoluteCss = path.join(distDir, cssFile);
		const relative = path.relative(remoteEntryDir, absoluteCss);
		const normalized = relative.replace(/\\/g, "/");
		return normalized.startsWith(".") ? normalized : `./${normalized}`;
	});
}

function discoverCssPaths(distDir: string, remoteEntryDir: string): string[] {
	const manifestPath = path.join(distDir, ".vite", "manifest.json");
	if (fs.existsSync(manifestPath)) {
		const manifest = JSON.parse(
			fs.readFileSync(manifestPath, "utf8"),
		) as Record<string, ManifestChunk>;
		const cssFiles = new Set<string>();
		for (const chunk of Object.values(manifest)) {
			for (const css of chunk.css ?? []) {
				cssFiles.add(css);
			}
		}
		if (cssFiles.size > 0) {
			return toCssPathsRelativeToRemoteEntry(
				[...cssFiles],
				distDir,
				remoteEntryDir,
			);
		}
	}

	const assetsDir = path.join(distDir, "assets");
	if (!fs.existsSync(assetsDir)) {
		return [];
	}

	return fs
		.readdirSync(assetsDir)
		.filter((file) => file.endsWith(".css"))
		.map((file) => `./${file}`);
}

function patchRemoteEntry(code: string, cssPaths: string[]): string {
	const cssArrayLiteral = JSON.stringify(cssPaths);

	code = code.replace(/`__v__css__[^`]*`/g, cssArrayLiteral);
	code = code.replace(
		/a\(`__v__css__[^`]+`,/g,
		`a(${cssArrayLiteral},`,
	);
	code = code.replace(/a\(\[\],!1,(`\.\/[^`]+`)\)/g, `a(${cssArrayLiteral},!1,$1)`);

	return code;
}

/** Workaround for originjs/vite-plugin-federation#740 with Vite 8 / Rolldown. */
export function fixFederationCssForVite8(): Plugin {
	return {
		name: "fix-federation-css-vite8",
		apply: "build",
		enforce: "post",
		closeBundle() {
			const distDir = path.resolve("dist");
			const candidates = [
				path.resolve(distDir, "remoteEntry.js"),
				path.resolve(distDir, "assets", "remoteEntry.js"),
			];

			for (const remoteEntry of candidates) {
				if (!fs.existsSync(remoteEntry)) {
					continue;
				}

				const remoteEntryDir = path.dirname(remoteEntry);
				const cssPaths = discoverCssPaths(distDir, remoteEntryDir);
				if (cssPaths.length === 0) {
					console.warn(
						`[fix-federation-css-vite8] No CSS assets found for ${remoteEntry}`,
					);
					continue;
				}

				const code = patchRemoteEntry(
					fs.readFileSync(remoteEntry, "utf8"),
					cssPaths,
				);
				fs.writeFileSync(remoteEntry, code);
			}
		},
	};
}
