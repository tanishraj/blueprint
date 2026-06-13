import type { StorybookConfig } from '@storybook/react-vite';

declare const process: {
  env: {
    STORYBOOK_BASE_PATH?: string;
  };
};

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  viteFinal: async config => {
    config.plugins = (config.plugins || []).filter(plugin => {
      const resolvedPlugin = plugin as
        | { name?: string }
        | null
        | undefined
        | false;
      if (!resolvedPlugin || !resolvedPlugin.name) {
        return true;
      }
      return !resolvedPlugin.name.includes('dts');
    });
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
