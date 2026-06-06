import { createContext } from 'react';

import { EThemeOptions } from './types';

export const ThemeContext = createContext<{
  theme: EThemeOptions;
  setTheme: (theme: EThemeOptions) => void;
  isDark: boolean;
}>({
  theme: EThemeOptions.LIGHT,
  setTheme: () => {},
  isDark: false,
});
