export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}

export type ThemeModeContextType = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isDarkMode?: boolean;
};
