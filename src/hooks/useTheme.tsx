import { useEffect, useState } from 'react';

import { ThemeMode } from '@/providers';

export const useTheme = () => {
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute('data-theme') ?? ThemeMode.LIGHT,
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(
        document.documentElement.getAttribute('data-theme') ?? ThemeMode.LIGHT,
      );
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  return theme;
};
