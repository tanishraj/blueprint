import type { StorybookConfig } from '@storybook/react-vite';

declare const process: {
  env: {
    STORYBOOK_BASE_PATH?: string;
  };
};

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  viteFinal: async config => {
    return {
      ...config,
      base: process.env.STORYBOOK_BASE_PATH || '/',
    };
  },
  addons: [
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-docs',
    '@vueless/storybook-dark-mode',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};
export default config;
