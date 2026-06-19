import {
  Children,
  isValidElement,
  type FC,
  useCallback,
  useId,
  useMemo,
  useState,
} from 'react';

import { cn } from '@/utils';

import { TabsContext } from './context';
import { tabsRootStyles } from './Tabs.styles';
import type { TabsProps } from './types';

const clampIndex = (index: number, max: number) =>
  Math.min(Math.max(index, 0), max);

export const Tabs: FC<TabsProps> = ({
  children,
  className,
  defaultValue = 0,
  disabled = false,
  id,
  onValueChange,
  orientation = 'horizontal',
  size = 'md',
  value,
  variant = 'underline',
  ...restProps
}) => {
  const generatedId = useId();
  const baseId = id ?? `tabs-${generatedId}`;
  const childrenArray = Children.toArray(children);
  const [tabsList, ...tabPanels] = childrenArray;
  const [internalValue, setInternalValue] = useState(defaultValue);

  const panelCount = tabPanels.length;
  const activeIndex = clampIndex(
    value ?? internalValue,
    Math.max(panelCount - 1, 0),
  );

  const setSelectedIndex = useCallback(
    (nextIndex: number) => {
      const normalizedIndex = clampIndex(
        nextIndex,
        Math.max(panelCount - 1, 0),
      );

      if (value === undefined) {
        setInternalValue(normalizedIndex);
      }

      onValueChange?.(normalizedIndex);
    },
    [onValueChange, panelCount, value],
  );

  const contextValue = useMemo(
    () => ({
      baseId,
      disabled,
      orientation,
      selectedIndex: activeIndex,
      setSelectedIndex,
      size,
      variant,
    }),
    [
      activeIndex,
      baseId,
      disabled,
      orientation,
      setSelectedIndex,
      size,
      variant,
    ],
  );

  const activePanel = tabPanels[activeIndex];

  return (
    <TabsContext value={contextValue}>
      <div
        {...restProps}
        className={cn(tabsRootStyles({ orientation }), className)}
      >
        {tabsList}
        {isValidElement(activePanel) ? activePanel : null}
      </div>
    </TabsContext>
  );
};
