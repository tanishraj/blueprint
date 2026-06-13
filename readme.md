# @tanishraj/ui-kit

[![npm version](https://img.shields.io/npm/v/@tanishraj/ui-kit.svg)](https://www.npmjs.com/package/@tanishraj/ui-kit)
[![npm downloads](https://img.shields.io/npm/dm/@tanishraj/ui-kit.svg)](https://www.npmjs.com/package/@tanishraj/ui-kit)
[![license](https://img.shields.io/github/license/tanishraj/ui-kit.svg)](https://github.com/tanishraj/ui-kit/blob/develop/LICENSE)
[![storybook](https://img.shields.io/badge/storybook-live-purple)](https://tanishraj.github.io/ui-kit/)

A production-ready React + TypeScript UI component library built with Vite, Storybook, Tailwind CSS, CVA, and strict quality gates.

## Table of Contents

- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
- [Component Library API](#component-library-api)
- [Theming](#theming)
- [Accessibility](#accessibility)
- [Development](#development)
- [Testing](#testing)
- [CI / Automation](#ci--automation)
- [Publishing](#publishing)
- [Release Process](#release-process)
- [Repository Structure](#repository-structure)
- [Contributing](#contributing)
- [License](#license)
- [Changelog](#changelog)

## About

This package is designed to be consumed as a reusable component library for modern React apps. It includes:

- TypeScript-first component APIs with prop-driven variants
- Storybook docs and usage examples
- Accessibility-minded defaults
- Unit tests and coverage workflows
- Automated release and quality checks

## Installation

```bash
npm install @tanishraj/ui-kit
```

or

```bash
yarn add @tanishraj/ui-kit
```

or

```bash
pnpm add @tanishraj/ui-kit
```

## Usage

```tsx
import {
  Button,
  Badge,
  Avatar,
  AvatarGroup,
} from '@tanishraj/ui-kit';

export function Demo() {
  return <Button variant="primary">Get Started</Button>;
}
```

## Setup for app consumers

The library is built to be consumed like a standard React UI package:

1. Install dependency

```bash
npm install @tanishraj/ui-kit
```

2. Use components (styles are included automatically on package import):

Use component APIs directly from the package.

```tsx
import { Button, Avatar } from '@tanishraj/ui-kit';

export default function Demo() {
  return (
    <div className="flex items-center gap-4">
      <Button variant="primary" size="md">
        Primary Button
      </Button>
      <Avatar initials="AB" name="Amit B." variant="primary" />
    </div>
  );
}
```

### Theme file options

```ts
// Optional: import this only when you want secondary theme
import '@tanishraj/ui-kit/theme-secondary.css';
```

You can also import through:

```ts
import '@tanishraj/ui-kit/themes/secondary.css';
```

If your app uses a custom design token strategy, import one packaged theme and override required CSS variables in your own stylesheet after the theme import.

## Component Library API

- Components are exported from the package entrypoint in a single import surface.
- Props follow consistent naming patterns:
  - `size` (`sm`, `md`, `lg`)
  - `variant` (status/visual intent)
  - `shape` (`circle`, `square` where supported)
  - `disabled`, `loading`, and interaction states where applicable
- Component stories in `*.stories.tsx` are the source of truth for public usage patterns and prop combinations.

### Documentation and examples

- Storybook: run locally with `npm run storybook`
- Deploy guide and live docs: see repository CI/Pages setup

## Theming

- Component style variants are centralized with CVA + Tailwind utility patterns.
- Theme tokens are built in and theme files are exported from package entry points:
  - `theme-secondary.css`
  - `globals.css`

## Accessibility

This library is built with accessibility as a first-class goal:

- Keyboard support follows platform conventions (`Tab`, `Enter`, `Space`, and focus-visible states).
- ARIA attributes are applied where required.
- Buttons, badges, and avatar controls are composed to preserve semantic meaning.
- Disabled/loading states are explicitly represented in props and reflected visually and via attributes.

## Development

### Prerequisites

- Node.js 20+
- Yarn lockfile (`yarn.lock`) used in CI installs

### Common scripts

```bash
npm run build             # build distributable
npm run lint              # lint source and config
npm run type-check        # TypeScript checks
npm run test              # run Vitest tests
npm run release:check      # full release validation
npm run test:coverage     # generate coverage report
npm run storybook         # run Storybook locally
npm run storybook:build   # build Storybook static site
npm run clean             # remove generated artifacts
```

### Local component generation (Codex)

This repo can scaffold components from Figma via Codex workflows used by the maintainer.

## Testing

- Run `npm run test` while developing.
- Run coverage with `npm run test:coverage`.
- CI publishes only when unit tests and type checks are green.

## CI / Automation

Current repository workflows:

- `eslint.yml`
- `type-check.yml`
- `unit-tests.yml`
- `coverage-report.yml`
- `codeql.yml`
- `npm-publish.yml`
- `deploy-storybook.yml`

Quality gates include linting, type checking, unit tests, and coverage checks.

## Publishing

### Automated publish (recommended)

- Publish is handled through GitHub Actions.
- Workflow validates checks before `npm publish`.
- Scope is controlled by repository secrets and workflow rules.

### Required secret

- `NPM_TOKEN`

## Release Process

A dedicated release guide is available:

- [`release.md`](release.md)

Quick release flow:

1. bump version (`npm version patch|minor|major`)
2. create release tag (for example: `v1.2.0`)
3. CI validates + publishes

## Repository Structure

```text
src/
  components/      # React component implementations
  themes/          # theme entry files
  utils/           # shared helpers and class utilities
.storybook/        # Storybook config
.github/workflows/ # CI and release automation
```

## Components

| Component | Location | Storybook | Status |
| --- | --- | --- | --- |
| Alert | `src/components/Alert` | [Alert](https://tanishraj.github.io/ui-kit/?path=/story/components-alert--default) | Stable |
| Badge | `src/components/Badge` | [Badge](https://tanishraj.github.io/ui-kit/?path=/story/components-badge--playground) | Stable |
| Avatar | `src/components/Avatar` | [Avatar](https://tanishraj.github.io/ui-kit/?path=/story/components-avatar--playground) | Stable |
| AvatarGroup | `src/components/AvatarGroup` | [AvatarGroup](https://tanishraj.github.io/ui-kit/?path=/story/components-avatargroup--default) | Stable |
| Button | `src/components/Button` | [Button](https://tanishraj.github.io/ui-kit/?path=/story/components-button--playground) | Stable |
| ButtonGroup | `src/components/ButtonGroup` | [ButtonGroup](https://tanishraj.github.io/ui-kit/?path=/story/components-buttongroup--playground) | Stable |
| OrganizationChart | `src/components/OrganizationChart` | [OrganizationChart](https://tanishraj.github.io/ui-kit/?path=/story/components-organizationchart--playground) | Stable |

## Versioning and Changelog

- This package follows [Semantic Versioning (SemVer)](https://semver.org/).
- Version updates use `npm version patch|minor|major`.
- Pre-release versions are supported and published with the `next` tag when release is marked as prerelease.
- Breaking changes are documented and shipped as a new major version.
- Changes must be recorded in [`CHANGELOG.md`](CHANGELOG.md).

## Changelog

- Maintained using Keep a Changelog structure: `Unreleased`, `Added`, `Changed`, `Fixed`.
- Update changelog before tagging and include impact, scope, and migration notes when needed.
- Keep the latest released version at top below `Unreleased`.

## Contributing

Contributions should include:

- component changes with matching story updates
- tests for new/changed behavior
- lint-safe and type-safe implementation

Please keep API changes minimal and backward-compatible unless part of an intentional major version.

## License

MIT © Tanishraj
