import { createContext, useContext } from 'react';

import type { TableContextValue } from './types';

export const TableContext = createContext<TableContextValue | null>(null);

export const useTable = () => {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error('Table compound components must be used within Table.');
  }

  return context;
};
