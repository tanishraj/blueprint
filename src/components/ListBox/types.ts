import type { ComponentPropsWithoutRef, FC, ReactNode, SVGProps } from 'react';

export type ListBoxIcon = FC<SVGProps<SVGSVGElement>>;

export type ListBoxSizes = 'sm' | 'md' | 'lg';

export interface ListBoxItemData {
  disabled?: boolean;
  id?: string;
  label: ReactNode;
  leadingIcon?: ListBoxIcon;
  value: string;
}

export interface ListItemProps extends Omit<
  ComponentPropsWithoutRef<'button'>,
  'children' | 'disabled' | 'onSelect' | 'value'
> {
  item: ListBoxItemData;
  onSelect?: (item: ListBoxItemData) => void;
  selected?: boolean;
  size?: ListBoxSizes;
}

export interface ListBoxProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'children'
> {
  children?: ReactNode;
  itemRole?: 'option' | 'menuitem';
  items?: ListBoxItemData[];
  leadingSlot?: ReactNode;
  onItemSelect?: (item: ListBoxItemData) => void;
  selectedValue?: string;
  size?: ListBoxSizes;
}
