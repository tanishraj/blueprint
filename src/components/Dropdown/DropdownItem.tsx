import { forwardRef, type MouseEvent, useCallback } from 'react';

import { cn } from '@/utils';

import {
  dropdownItemIconStyles,
  dropdownItemLabelStyles,
  dropdownItemStyles,
} from './Dropdown.styles';
import type { DropdownItemComponentProps } from './types';

export const DropdownItem = forwardRef<
  HTMLButtonElement,
  DropdownItemComponentProps
>(({ className, item, onClick, onSelect, selected = false, ...props }, ref) => {
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
      className={cn(dropdownItemStyles({ selected }), className)}
      disabled={item.disabled}
      onClick={handleClick}
      role='menuitem'
      type='button'
      value={item.value}
    >
      {LeadingIcon && (
        <LeadingIcon
          aria-hidden='true'
          className={cn(dropdownItemIconStyles())}
        />
      )}
      <span className={cn(dropdownItemLabelStyles())}>{item.label}</span>
    </button>
  );
});

DropdownItem.displayName = 'DropdownItem';
