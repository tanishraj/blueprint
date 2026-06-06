import type { Preview } from '@storybook/react-vite';

import { ThemeProvider } from '../src/providers/theme';
import { StorybookThemeProvider } from './StorybookThemeProvider';

import '../src/styles/globals.css';
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
    Story => {
      return (
        <ThemeProvider name='blueprint'>
          <StorybookThemeProvider>
            <Story />
          </StorybookThemeProvider>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
