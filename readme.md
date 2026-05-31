# Vite React Library Starter

## About

Vite React Library Starter is a boilerplate for building and publishing React component libraries. It leverages modern tooling, including Vite for bundling, TypeScript for type safety, Tailwind CSS for styling, and Storybook for documentation. This starter kit provides a streamlined development experience with built-in linting, formatting, and unit testing.

## Features

- **Vite** - Fast bundling and development
- **React & TypeScript** - Strict type safety for better development
- **Tailwind CSS** - Utility-first styling approach
- **Tailwind Merge & CVA** - Class name manipulation
- **CLSX** - Conditional class name handling
- **ESLint & Prettier** - Code linting and formatting
- **Vitest & React Testing Library** - Unit testing setup
- **Storybook** - Interactive documentation for components

## Getting Started

### Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/your-repo/vite-react-library-starter.git
cd vite-react-library-starter
npm install
```

### Running Storybook

To start Storybook for interactive component documentation:

```sh
npm run storybook
```

### Building the Library

Build the component library for distribution:

```sh
npm run build
```

### Running Tests

Run unit tests with Vitest:

```sh
npm test
```

To watch tests:

```sh
npm run test:watch
```

### Linting & Formatting

Lint and format code using ESLint and Prettier:

```sh
npm run lint
npm run format
```

### Cleaning the Project

To remove generated files:

```sh
npm run clean
```

## Folder Structure

```
├── src/                # Component source code
│   ├── components/     # React components
│   ├── hooks/         # Custom hooks (if any)
│   ├── utils/         # Utility functions
│   ├── index.ts       # Library entry point
├── .storybook/         # Storybook configuration
├── tests/             # Unit tests
├── dist/              # Compiled library output
├── package.json       # Project metadata and scripts
└── README.md          # Documentation
```

## Publishing to NPM

Ensure the package is built before publishing:

```sh
npm run build
npm publish
```

## License

This project is licensed under the MIT License.
