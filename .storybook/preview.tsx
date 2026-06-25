import type { Preview } from '@storybook/react-vite';

import { StorybookThemeProvider } from './StorybookThemeProvider';

import './preview.css';

const preview: Preview = {
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

      if (context.viewMode === 'docs') {
        return <StorybookThemeProvider>{story}</StorybookThemeProvider>;
      }

      if (context.parameters['layout'] !== 'centered') {
        return <StorybookThemeProvider>{story}</StorybookThemeProvider>;
      }

      return (
        <StorybookThemeProvider>
          <div className='flex min-h-screen w-full items-center justify-center p-8'>
            {story}
          </div>
        </StorybookThemeProvider>
      );
    },
  ],
};

export default preview;
