import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fixFederationCssForVite8 } from "./vite-federation-css-fix";

export default defineConfig({
	base: process.env.VITE_BASE ?? "/",
	plugins: [
		react(),
		tailwindcss(),
		federation({
			name: "product",
			filename: "remoteEntry.js",
			exposes: {
				"./Product": "./src/components/product-container.tsx",
			},
			shared: {
				react: { singleton: true },
				"react-dom": { singleton: true },
			},
		}),
		fixFederationCssForVite8(),
	],
	build: {
		target: "esnext",
		manifest: true,
	},
	server: {
		port: 5001,
		strictPort: true,
		cors: true,
	},
	preview: {
		port: 5001,
		strictPort: true,
		cors: true,
	},
});
