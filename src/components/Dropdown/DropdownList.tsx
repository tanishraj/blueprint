import { forwardRef, useCallback } from 'react';

import { cn } from '@/utils';

import { dropdownMenuStyles } from './Dropdown.styles';
import { DropdownItem } from './DropdownItem';
import type {
  DropdownItem as DropdownItemData,
  DropdownListProps,
} from './types';

export const DropdownList = forwardRef<HTMLDivElement, DropdownListProps>(
  (
    {
      children,
      className,
      closeMenu,
      closeOnSelect = true,
      items = [],
      leadingSlot,
      onItemSelect,
      selectedValue,
      ...props
    },
    ref,
  ) => {
    const handleItemSelect = useCallback(
      (item: DropdownItemData) => {
        onItemSelect?.(item);

        if (closeOnSelect) {
          closeMenu?.();
        }
      },
      [closeMenu, closeOnSelect, onItemSelect],
    );

    return (
      <div {...props} ref={ref} className={cn(dropdownMenuStyles(), className)}>
        {leadingSlot}
        {children ??
          items.map(item => (
            <DropdownItem
              key={item.id ?? item.value}
              item={item}
              onSelect={handleItemSelect}
              selected={item.value === selectedValue}
            />
          ))}
      </div>
    );
  },
);

DropdownList.displayName = 'DropdownList';
