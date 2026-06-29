import { FC, ReactNode, useEffect } from 'react';
import { useDarkMode } from '@vueless/storybook-dark-mode';

import { EThemeOptions, ThemeProvider } from '../src/providers/theme';
import forestThemeCss from '../src/themes/forest.css?raw';
import indigoThemeCss from '../src/themes/indigo.css?raw';
import violetThemeCss from '../src/themes/violet.css?raw';

interface IStorybookThemeProviderProps {
  children: ReactNode;
  colorTheme?: string;
}

const STORYBOOK_THEME_STYLE_ID = 'ui-kit-storybook-color-theme';
const storybookColorThemeCss = {
  forest: forestThemeCss,
  indigo: indigoThemeCss,
  violet: violetThemeCss,
};

type StorybookColorTheme = keyof typeof storybookColorThemeCss;

const getStorybookColorTheme = (theme?: string): StorybookColorTheme => {
  if (theme === 'forest') {
    return 'forest';
  }

  return theme === 'violet' ? 'violet' : 'indigo';
};

const getCustomProperties = (css: string): string => {
  return css.match(/^\s*--[\w-]+:\s*[^;]+;/gm)?.join('\n') ?? '';
};

const getRuntimeThemeCss = (themeCss: string): string => {
  const [themeBlock = themeCss, baseLayerBlock = ''] =
    themeCss.split('@layer base');
  const darkThemeBlock = baseLayerBlock.match(
    /:root\.dark\s*{([\s\S]*?)\n\s*}/,
  )?.[1];

  return `
    :root {
      ${getCustomProperties(themeBlock)}
    }

    :root.light {
      color-scheme: light;
    }

    :root.dark {
      color-scheme: dark;
      ${getCustomProperties(darkThemeBlock ?? '')}
    }
  `;
};

export const StorybookThemeProvider: FC<IStorybookThemeProviderProps> = ({
  children,
  colorTheme,
}) => {
  const isDarkMode = useDarkMode();
  const theme = isDarkMode ? EThemeOptions.DARK : EThemeOptions.LIGHT;
  const activeColorTheme = getStorybookColorTheme(colorTheme);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const existingThemeStyle = document.getElementById(
      STORYBOOK_THEME_STYLE_ID,
    );
    const themeStyle = existingThemeStyle ?? document.createElement('style');

    themeStyle.id = STORYBOOK_THEME_STYLE_ID;
    themeStyle.textContent = getRuntimeThemeCss(
      storybookColorThemeCss[activeColorTheme],
    );

    if (!existingThemeStyle) {
      document.head.appendChild(themeStyle);
    }
  }, [activeColorTheme]);

  return (
    <ThemeProvider name='blueprint' persist={false} theme={theme}>
      {children}
    </ThemeProvider>
  );
};
