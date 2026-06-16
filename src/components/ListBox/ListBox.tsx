import { forwardRef } from 'react';

import { cn } from '@/utils';

import { listBoxStyles } from './ListBox.styles';
import { ListItem } from './ListItem';
import type { ListBoxProps } from './types';

export const ListBox = forwardRef<HTMLDivElement, ListBoxProps>(
  (
    {
      children,
      className,
      itemRole = 'option',
      items = [],
      leadingSlot,
      onItemSelect,
      role = 'listbox',
      selectedValue,
      size = 'md',
      ...props
    },
    ref,
  ) => {
    return (
      <div
        {...props}
        ref={ref}
        className={cn(listBoxStyles({ size }), className)}
        role={role}
      >
        {leadingSlot}
        {children ??
          items.map(item => (
            <ListItem
              key={item.id ?? item.value}
              item={item}
              role={itemRole}
              selected={item.value === selectedValue}
              size={size}
              {...(onItemSelect ? { onSelect: onItemSelect } : {})}
            />
          ))}
      </div>
    );
  },
);

ListBox.displayName = 'ListBox';
