import {
  Children,
  isValidElement,
  type ReactNode,
  useCallback,
  useId,
  useMemo,
  useState,
} from 'react';

import { cn } from '@/utils/classNames';

import { TabsContext } from './context';
import { tabsRootStyles } from './Tabs.styles';
import type { TabsProps } from './types';

const clampIndex = (index: number, max: number) =>
  Math.min(Math.max(index, 0), max);

const hasContent = (value: ReactNode | undefined) =>
  value !== undefined && value !== null && value !== false && value !== '';

export function Tabs({
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
}: TabsProps) {
  const generatedId = useId();
  const baseId = id ?? `tabs-${generatedId}`;
  const childrenArray = Children.toArray(children).filter(child =>
    isValidElement(child),
  );
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
        {hasContent(tabsList) ? tabsList : null}
        {isValidElement(activePanel) ? activePanel : null}
      </div>
    </TabsContext>
  );
}
