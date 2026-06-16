import { forwardRef, type MouseEvent, useCallback } from 'react';

import { cn } from '@/utils';

import {
  listItemIconStyles,
  listItemLabelStyles,
  listItemStyles,
} from './ListBox.styles';
import type { ListItemProps } from './types';

export const ListItem = forwardRef<HTMLButtonElement, ListItemProps>(
  (
    {
      className,
      item,
      onClick,
      onSelect,
      role = 'option',
      selected = false,
      size = 'md',
      ...props
    },
    ref,
  ) => {
    const LeadingIcon = item.leadingIcon;

    const handleClick = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);

        if (event.defaultPrevented || item.disabled) {
          return;
        }

        onSelect?.(item);
      },
      [item, onClick, onSelect],
    );

    return (
      <button
        {...props}
        ref={ref}
        aria-selected={role === 'option' ? selected : undefined}
        className={cn(listItemStyles({ size, selected }), className)}
        disabled={item.disabled}
        onClick={handleClick}
        role={role}
        type='button'
        value={item.value}
      >
        {LeadingIcon && (
          <LeadingIcon
            aria-hidden='true'
            className={cn(listItemIconStyles({ size }))}
          />
        )}
        <span className={cn(listItemLabelStyles())}>{item.label}</span>
      </button>
    );
  },
);

ListItem.displayName = 'ListItem';
