import type { ReactNode } from 'react';

import { cn } from '@/utils/classNames';

import { useTabs } from './context';
import { tabPanelStyles } from './Tabs.styles';
import type { TabPanelProps } from './types';

const hasPanelContent = (value: ReactNode) =>
  value !== undefined && value !== null && value !== false && value !== '';

export function TabPanel({ children, className, ...restProps }: TabPanelProps) {
  const { baseId, orientation, selectedIndex } = useTabs();

  return (
    <div
      {...restProps}
      aria-labelledby={`${baseId}-tab-${selectedIndex}`}
      className={cn(tabPanelStyles({ orientation }), className)}
      id={`${baseId}-panel-${selectedIndex}`}
      role='tabpanel'
      tabIndex={0}
    >
      {hasPanelContent(children) ? children : null}
    </div>
  );
}
