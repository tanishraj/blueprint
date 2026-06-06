import {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { ThemeContext } from './context';
import { ThemeMode, ThemeModeContextType } from './types';

export interface ThemeProviderProps {
  name: string;
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

  useEffect(() => {
    localStorage.setItem(themeModeName, themeMode);
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [localStorage, themeMode, themeModeName]);

  const handleSetMode = useCallback(
    (mode: ThemeMode) => {
      setThemeMode(mode);
      localStorage.setItem(themeModeName, mode);
      document.documentElement.setAttribute('data-theme', mode);
    },
    [localStorage, themeModeName],
  );

  const contextValue: ThemeModeContextType = useMemo(() => {
    return {
      mode: themeMode,
      setMode: handleSetMode,
      isDarkMode: themeMode === ThemeMode.DARK,
    };
  }, [themeMode, handleSetMode]);

  return <ThemeContext value={contextValue}>{children}</ThemeContext>;
};
