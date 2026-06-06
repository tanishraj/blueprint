import {
  type FC,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { ThemeContext } from './context';
import { EThemeOptions } from './types';

interface IThemeProviderProps {
  children: ReactNode;
  name: string;
  onThemeChange?: (theme: EThemeOptions) => void;
  persist?: boolean;
  theme?: EThemeOptions;
}

const getSystemTheme = (): EThemeOptions => {
  if (typeof window === 'undefined') {
    return EThemeOptions.LIGHT;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? EThemeOptions.DARK
    : EThemeOptions.LIGHT;
};

const getStoredTheme = (themeName: string): EThemeOptions | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const storedTheme = window.localStorage.getItem(themeName);

  return storedTheme === EThemeOptions.LIGHT ||
    storedTheme === EThemeOptions.DARK
    ? storedTheme
    : null;
};

export const ThemeProvider: FC<IThemeProviderProps> = ({
  children,
  name,
  onThemeChange,
  persist = true,
  theme: controlledTheme,
}) => {
  const themeName = `${name}-theme`;
  const isControlled = controlledTheme !== undefined;
  const initialTheme = useMemo(
    () => controlledTheme ?? getStoredTheme(themeName) ?? getSystemTheme(),
    [controlledTheme, themeName],
  );
  const [theme, setTheme] = useState<EThemeOptions>(initialTheme);
  const activeTheme = controlledTheme ?? theme;

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    document.documentElement.classList.remove(
      EThemeOptions.LIGHT,
      EThemeOptions.DARK,
    );
    document.documentElement.classList.add(activeTheme);
    document.documentElement.style.colorScheme = activeTheme;

    if (!isControlled && persist && typeof window !== 'undefined') {
      window.localStorage.setItem(themeName, activeTheme);
    }
  }, [activeTheme, isControlled, persist, themeName]);

  const handleTheme = useCallback(
    (value: EThemeOptions) => {
      onThemeChange?.(value);

      if (!isControlled) {
        setTheme(value);
      }
    },
    [isControlled, onThemeChange],
  );

  const contextValue = useMemo(() => {
    return {
      theme: activeTheme,
      setTheme: handleTheme,
      isDark: activeTheme === EThemeOptions.DARK,
    };
  }, [activeTheme, handleTheme]);

  return <ThemeContext value={contextValue}>{children}</ThemeContext>;
};
