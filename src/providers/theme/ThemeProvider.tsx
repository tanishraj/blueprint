import { FC, ReactNode, useCallback, useMemo, useState } from 'react';

import { ThemeContext } from './context';
import { ThemeMode, ThemeModeContextType } from './types';

export interface ThemeProviderProps {
  name: string;
  value: ThemeMode;
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ name, children }) => {
  const themeModeName = `${name}-themeMode`;
  const localStorage = window.localStorage;
  const persistedThemeMode = localStorage.getItem(
    themeModeName,
  ) as ThemeMode | null;
  const systemThemeMode =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? ThemeMode.DARK
      : ThemeMode.LIGHT;
  const [themeMode, setThemeMode] = useState<ThemeMode>(
    persistedThemeMode || systemThemeMode,
  );

  const handleToggleMode = useCallback((mode: ThemeMode) => {
    setThemeMode(mode);
    console.log('Toggling theme mode', mode);
  }, []);

  const contextValue: ThemeModeContextType = useMemo(() => {
    return {
      mode: themeMode,
      setMode: handleToggleMode,
      isDarkMode: themeMode === ThemeMode.DARK,
    };
  }, [themeMode, handleToggleMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
