# Product MFE

Remote micro-frontend for the product details section (title, gallery, description).

## Federation

Exposes `./Product` → `src/components/product-container.tsx` as `product/Product` when consumed by the shell.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Standalone dev server (port 5001) |
| `npm run build` | Type-check + production build |
| `npm run preview` | Serve built assets (port 5001) |
| `npm run test` | Unit tests (Vitest) |
| `npm run test-coverage` | Unit tests with coverage |
| `npm run type-check` | `tsc --noEmit` |
| `npm run format-and-lint` | Biome check |

## Local development

**Standalone:** `npm ci && npm run dev`

**With shell:** `npm run build && npm run preview`, then start the shell (see `../README.md`).

## CI

Push/PR to `main` runs lint, build, type-check, and `test-coverage`. Production builds set `VITE_BASE=/mba-mfe-product/` so artifacts work on GitHub Pages.

## Deploy (GitHub Pages)

One-time setup in the repository **Settings → Pages**: set **Source** to **GitHub Actions** (not “Deploy from a branch”). Confirm the `github-pages` environment exists.

The federation remote is published from CI artifacts (no rebuild in deploy):

1. Wait for a successful **CI** run on `main`.
2. **Manual:** copy the numeric **artifact_id** for `product-dist` from the CI job summary (or the run’s Artifacts list), then run **Deploy to GitHub Pages** (`workflow_dispatch`) and paste it.
3. **Tag:** push a `v*` tag (e.g. `v1.0.0`) on a commit that already has a successful CI run; deploy resolves the `product-dist` artifact for that commit.

Site URL: `https://trevelint.github.io/mba-mfe-product/`. Point the shell product remote at the deployed `remoteEntry.js` path under that base (verify after first deploy).

## Contributor guidelines

Agent and contributor conventions: [`.cursor/rules/project-guidelines.mdc`](.cursor/rules/project-guidelines.mdc).
