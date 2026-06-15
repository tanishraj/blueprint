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
  Breadcrumb,
  Checkbox,
  CheckboxGroup,
  Chip,
  Divider,
  Drawer,
  Portal,
} from '@tanishraj/ui-kit';

export function Demo() {
  return <Button variant='primary'>Get Started</Button>;
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
import { Avatar, Button, Chip, Divider, Drawer } from '@tanishraj/ui-kit';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export default function Demo() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className='flex items-center gap-4'>
      <Button variant='primary' size='md'>
        Primary Button
      </Button>
      <Avatar initials='AB' variant='primary' />
      <Chip icon={Plus} variant='success'>
        Active
      </Chip>
      <Button onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
      <Drawer
        footer={<Button onClick={() => setDrawerOpen(false)}>Close</Button>}
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        title='Title'
      >
        Drawer content
      </Drawer>
      <Divider className='w-32' />
    </div>
  );
}
```

### Theme file options

```ts
// Optional: import this only when you want secondary theme
import '@tanishraj/ui-kit/theme-secondary.css';
```

### Adding new themes (for maintainers)

To add a new packaged theme later:

1. Add `src/themes/<theme-name>.css`.
2. Add a package export in `package.json`:
   - `./theme-<theme-name>.css` -> `./dist/themes/<theme-name>.css`
3. Update the `copy:theme` script to include the new file.
4. Optionally publish a themed import via `./themes/<theme-name>.css` (already supported by the wildcard export pattern).

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
  - `appearance` (container treatment such as `filled`, `outline`, `ghost`, or `dashed`, depending on component)
  - `shape` (`circle`, `square` where supported)
  - `inverted` for alternate surface color modes where supported
  - `disabled`, `loading`, and interaction states where applicable
- Component stories in `*.stories.tsx` are the source of truth for public usage patterns and prop combinations.

### Common Examples

```tsx
import {
  Breadcrumb,
  Button,
  CheckboxGroup,
  Chip,
  Divider,
  Drawer,
} from '@tanishraj/ui-kit';
import { Home, Plus, Tag } from 'lucide-react';

export function ComponentExamples() {
  return (
    <div className='flex flex-col gap-6'>
      <Breadcrumb
        appearance='outline'
        items={[
          { label: 'Home', href: '/', icon: Home },
          { label: 'Components', href: '/components' },
          { label: 'Chip' },
        ]}
        separator='>'
      />

      <Chip appearance='filled' icon={Tag} shape='circle' variant='primary'>
        Filter
      </Chip>

      <CheckboxGroup
        label='Notification channels'
        options={[
          { label: 'Email', value: 'email' },
          { label: 'SMS', value: 'sms' },
        ]}
        shape='square'
      />

      <Divider>
        <Button leadingIcon={Plus} size='sm' variant='default'>
          Add item
        </Button>
      </Divider>
    </div>
  );
}
```

### Component Notes

- `Breadcrumb` supports `appearance="ghost" | "outline"` and `separator=">" | "/"`. The chevron separator is rendered as an icon.
- `Checkbox` and `CheckboxGroup` support `shape="square" | "circle"`, with `square` as the default.
- `Chip` supports `variant`, `appearance="filled" | "outline"`, `shape`, `size`, `inverted`, optional `icon`, and removable chips via `onClose`.
- `Divider` supports `orientation="horizontal" | "vertical"` and optional centered content through `children`.
- `Drawer` is controlled with `open` and `onClose`, supports `placement="right" | "left" | "top" | "bottom"`, `size="sm" | "md" | "lg" | "full"`, overlay close, Escape close, footer actions, and Portal targeting.
- `Portal` renders to `document.body` by default and can target a custom container via `container`, `containerRef`, or `containerId`.

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

| Component         | Location                           | Storybook                                                                                                     | Status |
| ----------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------ |
| Accordion         | `src/components/Accordion`         | [Accordion](https://tanishraj.github.io/ui-kit/?path=/story/components-accordion--default)                    | Stable |
| Alert             | `src/components/Alert`             | [Alert](https://tanishraj.github.io/ui-kit/?path=/story/components-alert--default)                            | Stable |
| Avatar            | `src/components/Avatar`            | [Avatar](https://tanishraj.github.io/ui-kit/?path=/story/components-avatar--playground)                       | Stable |
| AvatarGroup       | `src/components/AvatarGroup`       | [AvatarGroup](https://tanishraj.github.io/ui-kit/?path=/story/components-avatargroup--default)                | Stable |
| Badge             | `src/components/Badge`             | [Badge](https://tanishraj.github.io/ui-kit/?path=/story/components-badge--playground)                         | Stable |
| Breadcrumb        | `src/components/Breadcrumb`        | [Breadcrumb](https://tanishraj.github.io/ui-kit/?path=/story/components-breadcrumb--playground)               | Stable |
| Button            | `src/components/Button`            | [Button](https://tanishraj.github.io/ui-kit/?path=/story/components-button--playground)                       | Stable |
| ButtonGroup       | `src/components/ButtonGroup`       | [ButtonGroup](https://tanishraj.github.io/ui-kit/?path=/story/components-buttongroup--playground)             | Stable |
| Checkbox          | `src/components/Checkbox`          | [Checkbox](https://tanishraj.github.io/ui-kit/?path=/story/components-checkbox--playground)                   | Stable |
| CheckboxGroup     | `src/components/CheckboxGroup`     | [CheckboxGroup](https://tanishraj.github.io/ui-kit/?path=/story/components-checkboxgroup--playground)         | Stable |
| Chip              | `src/components/Chip`              | [Chip](https://tanishraj.github.io/ui-kit/?path=/story/components-chip--playground)                           | Stable |
| Divider           | `src/components/Divider`           | [Divider](https://tanishraj.github.io/ui-kit/?path=/story/components-divider--playground)                     | Stable |
| Drawer            | `src/components/Drawer`            | [Drawer](https://tanishraj.github.io/ui-kit/?path=/story/components-drawer--playground)                       | Stable |
| OrganizationChart | `src/components/OrganizationChart` | [OrganizationChart](https://tanishraj.github.io/ui-kit/?path=/story/components-organizationchart--playground) | Stable |
| Portal            | `src/components/Portal`            | N/A                                                                                                           | Stable |

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
