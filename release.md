# Release Guide

This repository uses GitHub Actions to publish the package to npm via the workflow:

- [.github/workflows/npm-publish.yml](/Users/tanish/Tanish/blueprint/.github/workflows/npm-publish.yml)

## 1) Prerequisites

1. You have publish rights on npm.
2. You added the GitHub secret:
   - `NPM_TOKEN` (`Settings` → `Secrets and variables` → `Actions`)
3. Your branch is clean and committed for the release.
4. The package name in `package.json` is correct.

## 2) Code changes required for release

- Ensure changelog/docs are updated (if your project uses one).
- Ensure component and style updates are merged to `main`.
- Confirm tests, lint and types are passing locally before creating release tags.

## 3) Local quality checks

Run before tagging:

```sh
npm run lint
npm run type-check
npm run test -- --run
npm run build
```

Optional:

```sh
npm run test:coverage -- --run
```

## 4) Version and tag flow

1. Bump version:

```sh
npm version patch   # or minor / major
```

2. Push commit and tags:

```sh
git push
git push --tags
```

3. Pushing `v*` tag automatically triggers release.
4. Tag examples:
   - `v1.3.0` → publishes with dist-tag `latest`
   - `v1.3.0-beta.0` → publishes with dist-tag `next`

## 5) Manual publish (if needed)

- Go to **Actions → Publish to npm → Run workflow**.
- Set `distTag` to `latest`, `next`, `beta`, `canary`, etc.
- The workflow still re-runs quality checks before publish.

## 6) Post-release checks

- Confirm workflow completed successfully.
- Verify package:

```sh
npm view <your-package-name> version
```

- Install a fresh test install:

```sh
npm install <your-package-name>@latest
```

## 7) Rollback guidance

- If needed, publish a corrective tag (usually `patch` + `v*` tag).
- For problematic versions, ask npm to deprecate quickly and publish a fix:

```sh
npm deprecate <your-package-name>@<bad-version> "Deprecated due to issue"
```

Use this only for urgent issues.

## 8) Current workflow summary

The publish workflow enforces:

- `npm run lint`
- `npm run type-check`
- `npm run test -- --run`
- `npm run build`
- `npm publish --tag <computed-tag>`

