import { FC, ReactNode } from 'react';
import { useDarkMode } from '@vueless/storybook-dark-mode';

import { EThemeOptions, ThemeProvider } from '../src/providers/theme';

interface IStorybookThemeProviderProps {
  children: ReactNode;
}

export const StorybookThemeProvider: FC<IStorybookThemeProviderProps> = ({
  children,
}) => {
  const isDarkMode = useDarkMode();
  const theme = isDarkMode ? EThemeOptions.DARK : EThemeOptions.LIGHT;

  return (
    <ThemeProvider name='blueprint' persist={false} theme={theme}>
      {children}
    </ThemeProvider>
  );
};
