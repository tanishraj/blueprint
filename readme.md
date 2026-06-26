# @tanishraj/ui-kit

[![npm version](https://img.shields.io/npm/v/@tanishraj/ui-kit.svg)](https://www.npmjs.com/package/@tanishraj/ui-kit)
[![npm downloads](https://img.shields.io/npm/dm/@tanishraj/ui-kit.svg)](https://www.npmjs.com/package/@tanishraj/ui-kit)
[![license](https://img.shields.io/github/license/tanishraj/ui-kit.svg)](https://github.com/tanishraj/ui-kit/blob/develop/LICENSE)
[![storybook](https://img.shields.io/badge/storybook-live-purple)](https://tanishraj.github.io/ui-kit/)

A React + TypeScript component library for product UIs, built with Vite, Storybook, Tailwind CSS, CVA, Floating UI, and strict CI quality gates.

## Why this library

- TypeScript-first component APIs
- Consistent visual variants and sizing patterns
- Storybook-backed documentation and examples
- Accessibility-minded defaults
- Unit tests, coverage checks, linting, and type checks

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

## Quick Start

```tsx
import { Button, Input, Modal } from '@tanishraj/ui-kit';
import { useState } from 'react';

export function Demo() {
  const [open, setOpen] = useState(false);

  return (
    <div className='flex flex-col gap-4'>
      <Input label='Workspace name' placeholder='Enter a name' />

      <Button variant='primary' onClick={() => setOpen(true)}>
        Open modal
      </Button>

      <Modal
        open={open}
        title='Create workspace'
        onClose={() => setOpen(false)}
        footer={
          <Button variant='primary' onClick={() => setOpen(false)}>
            Done
          </Button>
        }
      >
        Your content goes here.
      </Modal>
    </div>
  );
}
```

## Styling

Styles are included by the package entrypoint. If your app needs explicit stylesheet imports, use:

```ts
import '@tanishraj/ui-kit/globals.css';
```

Optional theme entrypoints:

```ts
import '@tanishraj/ui-kit/base.css';
import '@tanishraj/ui-kit/theme-secondary.css';

// or
import '@tanishraj/ui-kit/themes/primary.css';
import '@tanishraj/ui-kit/themes/secondary.css';
```

## Documentation

- Live Storybook: https://tanishraj.github.io/ui-kit/
- Repository: https://github.com/tanishraj/ui-kit
- Package: https://www.npmjs.com/package/@tanishraj/ui-kit

Storybook is the source of truth for public component usage, variants, and examples.

## Included Components

### Layout and overlays

- `Accordion`
- `AnimatePresence`
- `AnimatePresenceChild`
- `ConfirmationPopup`
- `Divider`
- `Drawer`
- `Modal`
- `Popover`
- `Portal`
- `Table`
- `Tabs`
- `TabsList`
- `Tab`
- `TabPanel`

### Actions and navigation

- `Breadcrumb`
- `Button`
- `ButtonGroup`
- `Dropdown`
- `Link`

### Inputs and selection

- `Calendar`
- `Checkbox`
- `CheckboxGroup`
- `Input`
- `Radio`
- `RadioGroup`
- `Select`
- `AsyncSelect`
- `CheckboxSelect`
- `GroupedSelect`
- `MultiSelectCompact`
- `SelectWithApply`
- `Slider`
- `TextArea`

### Feedback and status

- `Alert`
- `Badge`
- `Chip`
- `Feedback`
- `ProgressBar`
- `Rating`
- `Tooltip`
- `TrendIndicator`
- `Toaster`
- `useToast`

### Data display

- `CompactList`
- `CountryFlag`
- `Label`
- `ListBox`
- `ListItem`
- `MetricCard`
- `MetricValueItem`
- `OrganizationChart`

### Identity

- `Avatar`
- `AvatarGroup`

## API Conventions

Most components follow a shared set of prop patterns where relevant:

- `size`: typically `sm`, `md`, `lg`
- `variant`: semantic or visual intent
- `appearance`: surface treatment such as `filled`, `outline`, or `ghost`
- `disabled`: disabled interaction state
- `fullWidth`: expands to parent width where supported

Not every component supports every prop. Use Storybook or the exported TypeScript types for the exact API.

`Calendar` wraps `react-day-picker` with ui-kit styling, supports Day Picker selection modes such as `single`, `multiple`, and `range`, includes `shape="squared" | "circle"` for day cells, and can show month/year selectors with `captionLayout="dropdown"` plus optional `startMonth`/`endMonth` bounds.

## Development

Prerequisites:

- Node.js 20+
- `yarn.lock` is used in CI installs

Common scripts:

```bash
npm run build
npm run lint
npm run type-check
npm run test
npm run test:coverage
npm run storybook
npm run storybook:build
```

## Quality Gates

The repository validates changes with:

- ESLint
- TypeScript type-checking
- Vitest unit tests
- coverage thresholds
- GitHub Actions workflows for CI, releases, and Storybook deployment

## Publishing

Publishing is handled through GitHub Actions.

- npm publish workflow: `.github/workflows/npm-publish.yml`
- required secret: `NPM_TOKEN`
- release guide: [`release.md`](release.md)

Quick release flow:

1. Update the version with `npm version patch|minor|major`
2. Create a release tag such as `v1.2.0`
3. Let CI validate and publish

## Repository Structure

```text
src/
  components/      # React component implementations
  themes/          # exported theme files
  utils/           # shared helpers and utilities
.storybook/        # Storybook configuration
.github/workflows/ # CI and publishing workflows
```

## Contributing

Contributions should include:

- implementation updates
- matching Storybook examples when behavior changes
- tests for new or changed behavior
- lint-safe and type-safe code

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).

## License

MIT © Tanishraj
