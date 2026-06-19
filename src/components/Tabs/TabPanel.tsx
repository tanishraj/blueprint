import { type FC } from 'react';

import { cn } from '@/utils';

import { useTabs } from './context';
import { tabPanelStyles } from './Tabs.styles';
import type { TabPanelProps } from './types';

export const TabPanel: FC<TabPanelProps> = ({
  children,
  className,
  ...restProps
}) => {
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
      {children}
    </div>
  );
};
