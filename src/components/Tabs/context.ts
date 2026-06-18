import { createContext, useContext } from 'react';

import type { TabsContextValue, TabsListContextValue } from './types';

export const TabsContext = createContext<TabsContextValue | null>(null);
export const TabsListContext = createContext<TabsListContextValue | null>(null);

export const useTabs = () => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('Tabs compound components must be used within Tabs.');
  }

  return context;
};

export const useTabsList = () => {
  const context = useContext(TabsListContext);

  if (!context) {
    throw new Error('Tab must be used within TabsList.');
  }

  return context;
};
