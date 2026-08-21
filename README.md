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
| `npm run changeset` | Add a changeset (semver bump + notes) |
| `npm run version-packages` | Apply pending changesets (used by Release CI) |
| `npm run release` | Create GitHub tag/release `vX.Y.Z` (used by Release CI) |

## Local development

**Standalone:** `npm ci && npm run dev`

**With shell:** `npm run build && npm run preview`, then start the shell (see `../README.md`).

## CI

[GitHub Actions](https://docs.github.com/en/actions) ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) runs on push to `main`, on pull request open/sync, and on demand via **Run workflow** (`workflow_dispatch`).

| Job | What runs |
|-----|-----------|
| **Build and Quality** | lint → build (`VITE_BASE=/mba-mfe-product/`) → artifact report → upload `product-dist` → type-check → test-coverage |

## Release

Versions are managed with [Changesets](https://github.com/changesets/changesets). Include a changeset in any PR that should bump the version:

```sh
npm run changeset
```

### What happens on `main`

1. Merge the feature PR (with changesets) to `main`.
2. **CI** runs. Only if it succeeds does **Release** ([`.github/workflows/release.yml`](.github/workflows/release.yml)) start.
3. Release opens or updates a **Version Packages** PR.
4. Review and merge that PR when you want to cut a version.
5. CI runs again. On success, Release runs `npm run release`: if the version is not `0.0.0` and `v{version}` does not exist yet, it creates that GitHub tag and Release from `CHANGELOG.md`.
6. **CD** ([`.github/workflows/cd.yml`](.github/workflows/cd.yml)) starts after Release succeeds. If a `v*` tag points at that commit, it reuses the CI `product-dist` artifact and deploys to GitHub Pages.

Site URL: [https://trevelint.github.io/mba-mfe-product/](https://trevelint.github.io/mba-mfe-product/). Point the shell product remote at the deployed `remoteEntry.js` path under that base.

**One-time repo setting:** Settings → Pages → Build and deployment → Source = **GitHub Actions** (not a branch). Confirm the `github-pages` environment exists.

## Contributor guidelines

Agent and contributor conventions: [`.cursor/rules/project-guidelines.mdc`](.cursor/rules/project-guidelines.mdc).
