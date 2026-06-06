import { createContext } from 'react';

import { ThemeMode, ThemeModeContextType } from './types';

export const ThemeContext = createContext<ThemeModeContextType>({
  mode:
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? ThemeMode.DARK
      : ThemeMode.LIGHT,
  setMode: () => {},
  isDarkMode:
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches,
});
