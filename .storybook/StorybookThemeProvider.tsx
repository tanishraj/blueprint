import { FC, ReactNode, useEffect } from 'react';
import { useDarkMode } from '@vueless/storybook-dark-mode';

import { EThemeOptions } from '../src/providers/theme';

interface IStorybookThemeProviderProps {
  children: ReactNode;
}

export const StorybookThemeProvider: FC<IStorybookThemeProviderProps> = ({
  children,
}) => {
  const isDarkMode = useDarkMode();

  useEffect(() => {
    const theme = isDarkMode ? EThemeOptions.DARK : EThemeOptions.LIGHT;

    document.documentElement.setAttribute('data-theme', theme);
  }, [isDarkMode]);

  return <div>{children}</div>;
};
