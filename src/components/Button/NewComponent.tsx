import { useCallback, useContext } from 'react';

import { ThemeContext, ThemeMode } from '../../providers/theme';
import { Button } from './Button';

export const NewComponent = () => {
  const { mode, setMode } = useContext(ThemeContext);

  const handleToggleMode = useCallback(() => {
    const newMode = mode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT;
    setMode(newMode);
  }, [mode, setMode]);

  return (
    <div>
      Theme Mode: {mode}
      <Button onClick={handleToggleMode}>Toggle Mode</Button>
    </div>
  );
};
