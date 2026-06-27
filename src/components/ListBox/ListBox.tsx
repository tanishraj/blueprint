import { forwardRef } from 'react';

import { cn } from '@/utils/classNames';

import { listBoxStyles } from './ListBox.styles';
import { ListItem } from './ListItem';
import type { ListBoxProps } from './types';

export const ListBox = forwardRef<HTMLDivElement, ListBoxProps>(
  (
    {
      children,
      className,
      itemRole,
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
    const resolvedItemRole =
      itemRole ?? (role === 'menu' ? 'menuitem' : 'option');

    return (
      <div
        {...props}
        aria-orientation={props['aria-orientation'] ?? 'vertical'}
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
              role={resolvedItemRole}
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
