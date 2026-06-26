import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  useCallback,
  useMemo,
  useRef,
} from 'react';

import { cn } from '@/utils/classNames';

import { TabsListContext, useTabs } from './context';
import { tabListStyles } from './Tabs.styles';
import type { InternalTabProps, TabsListProps } from './types';

export function TabsList({ children, className, ...restProps }: TabsListProps) {
  const {
    baseId,
    disabled,
    orientation,
    selectedIndex,
    setSelectedIndex,
    size,
    variant,
  } = useTabs();
  const childArray = Children.toArray(children).filter(
    (child): child is ReactElement<InternalTabProps> =>
      isValidElement<InternalTabProps>(child),
  );
  const tabCount = childArray.length;
  const tabRefs = useRef<Array<HTMLDivElement | null>>([]);
  const disabledIndices = useRef<Set<number>>(new Set());

  const registerTab = useCallback(
    (index: number, node: HTMLDivElement | null) => {
      tabRefs.current[index] = node;

      if (node?.dataset['disabled'] === 'true') {
        disabledIndices.current.add(index);
        return;
      }

      disabledIndices.current.delete(index);
    },
    [],
  );

  const isTabDisabled = useCallback(
    (index: number) => disabledIndices.current.has(index) || disabled,
    [disabled],
  );

  const focusTab = useCallback((index: number) => {
    tabRefs.current[index]?.focus();
  }, []);

  const getNextEnabledIndex = useCallback(
    (currentIndex: number, direction: 1 | -1) => {
      if (tabCount === 0) {
        return 0;
      }

      let nextIndex = currentIndex;

      for (let loop = 0; loop < tabCount; loop += 1) {
        nextIndex = (nextIndex + direction + tabCount) % tabCount;

        if (!isTabDisabled(nextIndex)) {
          return nextIndex;
        }
      }

      return currentIndex;
    },
    [isTabDisabled, tabCount],
  );

  const getFirstEnabledIndex = useCallback(() => {
    for (let index = 0; index < tabCount; index += 1) {
      if (!isTabDisabled(index)) {
        return index;
      }
    }

    return 0;
  }, [isTabDisabled, tabCount]);

  const getLastEnabledIndex = useCallback(() => {
    for (let index = tabCount - 1; index >= 0; index -= 1) {
      if (!isTabDisabled(index)) {
        return index;
      }
    }

    return Math.max(tabCount - 1, 0);
  }, [isTabDisabled, tabCount]);

  const contextValue = useMemo(
    () => ({
      baseId,
      disabled,
      focusTab,
      getFirstEnabledIndex,
      getLastEnabledIndex,
      getNextEnabledIndex,
      isTabDisabled,
      orientation,
      registerTab,
      selectedIndex,
      setSelectedIndex,
      size,
      tabCount,
      variant,
    }),
    [
      baseId,
      disabled,
      focusTab,
      getFirstEnabledIndex,
      getLastEnabledIndex,
      getNextEnabledIndex,
      isTabDisabled,
      orientation,
      registerTab,
      selectedIndex,
      setSelectedIndex,
      size,
      tabCount,
      variant,
    ],
  );

  return (
    <TabsListContext value={contextValue}>
      <div
        {...restProps}
        aria-orientation={orientation}
        className={cn(tabListStyles({ orientation, variant }), className)}
        role='tablist'
      >
        {childArray.map((child, index) =>
          cloneElement(child, {
            index,
            panelId: `${baseId}-panel-${index}`,
            selected: index === selectedIndex,
          }),
        )}
      </div>
    </TabsListContext>
  );
}
