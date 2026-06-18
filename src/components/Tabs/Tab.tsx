import { type FC, type KeyboardEvent, type MouseEvent, useCallback } from 'react';
import { X } from 'lucide-react';

import { cn } from '@/utils';

import { useTabsList } from './context';
import {
  tabAdornmentStyles,
  tabCloseButtonStyles,
  tabIconStyles,
  tabRootStyles,
  tabStatusDotStyles,
} from './Tabs.styles';
import type { InternalTabProps } from './types';

export const Tab: FC<InternalTabProps> = ({
  children,
  className,
  closeLabel = 'Close tab',
  disabled = false,
  endAdornment,
  index = 0,
  onClose,
  panelId,
  selected = false,
  startAdornment,
  statusDot = false,
  ...restProps
}) => {
  const {
    baseId,
    disabled: tabsDisabled,
    focusTab,
    getFirstEnabledIndex,
    getLastEnabledIndex,
    getNextEnabledIndex,
    orientation,
    registerTab,
    selectedIndex,
    setSelectedIndex,
    size,
    variant,
  } = useTabsList();

  const isDisabled = tabsDisabled || disabled;

  const handleClick = useCallback(() => {
    if (isDisabled) {
      return;
    }

    setSelectedIndex(index);
  }, [index, isDisabled, setSelectedIndex]);

  const moveSelection = useCallback(
    (nextIndex: number) => {
      focusTab(nextIndex);
      setSelectedIndex(nextIndex);
    },
    [focusTab, setSelectedIndex],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (isDisabled) {
        return;
      }

      const isHorizontal = orientation === 'horizontal';

      switch (event.key) {
        case 'ArrowRight':
          if (isHorizontal) {
            event.preventDefault();
            moveSelection(getNextEnabledIndex(index, 1));
          }
          break;
        case 'ArrowLeft':
          if (isHorizontal) {
            event.preventDefault();
            moveSelection(getNextEnabledIndex(index, -1));
          }
          break;
        case 'ArrowDown':
          if (!isHorizontal) {
            event.preventDefault();
            moveSelection(getNextEnabledIndex(index, 1));
          }
          break;
        case 'ArrowUp':
          if (!isHorizontal) {
            event.preventDefault();
            moveSelection(getNextEnabledIndex(index, -1));
          }
          break;
        case 'Home':
          event.preventDefault();
          moveSelection(getFirstEnabledIndex());
          break;
        case 'End':
          event.preventDefault();
          moveSelection(getLastEnabledIndex());
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          setSelectedIndex(index);
          break;
        default:
          break;
      }
    },
    [
      getFirstEnabledIndex,
      getLastEnabledIndex,
      getNextEnabledIndex,
      index,
      isDisabled,
      moveSelection,
      orientation,
      setSelectedIndex,
    ],
  );

  const handleClose = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onClose?.(event);
    },
    [onClose],
  );

  return (
    <div
      {...restProps}
      aria-controls={panelId}
      aria-disabled={isDisabled || undefined}
      aria-selected={selected}
      className={cn(
        tabRootStyles({
          disabled: isDisabled,
          orientation,
          selected,
          size,
          variant,
        }),
        className,
      )}
      data-disabled={isDisabled ? 'true' : 'false'}
      id={`${baseId}-tab-${index}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      ref={node => registerTab(index, node)}
      role='tab'
      tabIndex={selectedIndex === index && !isDisabled ? 0 : -1}
    >
      {startAdornment && (
        <span className={cn(tabAdornmentStyles(), tabIconStyles({ size }))}>
          {startAdornment}
        </span>
      )}
      <span>{children}</span>
      {statusDot && (
        <span
          aria-hidden='true'
          className={cn(tabStatusDotStyles({ selected }))}
        />
      )}
      {endAdornment && <span className={cn(tabAdornmentStyles())}>{endAdornment}</span>}
      {onClose && (
        <button
          aria-label={closeLabel}
          className={cn(tabCloseButtonStyles({ selected, size, variant }))}
          onClick={handleClose}
          tabIndex={-1}
          type='button'
        >
          <X strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
};
