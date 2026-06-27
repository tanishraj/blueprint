import type { Preview } from '@storybook/react-vite';

import { StorybookThemeProvider } from './StorybookThemeProvider';

import './preview.css';

const preview: Preview = {
  globalTypes: {
    colorTheme: {
      defaultValue: 'indigo',
      description: 'Color theme',
      toolbar: {
        dynamicTitle: true,
        icon: 'paintbrush',
        items: [
          { title: 'Indigo', value: 'indigo' },
          { title: 'Violet', value: 'violet' },
        ],
        title: 'Color theme',
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      stylePreview: true,
      classTarget: 'html',
    },
  },
  decorators: [
    (Story, context) => {
      const story = <Story />;
      const colorTheme = String(context.globals['colorTheme'] ?? 'indigo');

      if (context.viewMode === 'docs') {
        return (
          <StorybookThemeProvider colorTheme={colorTheme}>
            {story}
          </StorybookThemeProvider>
        );
      }

      if (context.parameters['layout'] !== 'centered') {
        return (
          <StorybookThemeProvider colorTheme={colorTheme}>
            {story}
          </StorybookThemeProvider>
        );
      }

      return (
        <StorybookThemeProvider colorTheme={colorTheme}>
          <div className='flex min-h-screen w-full items-center justify-center p-8'>
            {story}
          </div>
        </StorybookThemeProvider>
      );
    },
  ],
};

export default preview;
