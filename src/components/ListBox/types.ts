import type {
  ComponentPropsWithoutRef,
  ComponentType,
  ReactNode,
  SVGProps,
} from 'react';

export type ListBoxIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type ListBoxSizes = 'sm' | 'md' | 'lg';
export type ListBoxRole = 'listbox' | 'menu';
export type ListItemRole = 'option' | 'menuitem';

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
  role?: ListItemRole;
  selected?: boolean;
  size?: ListBoxSizes;
}

export interface ListBoxProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'children' | 'role'
> {
  children?: ReactNode;
  itemRole?: ListItemRole;
  items?: ListBoxItemData[];
  leadingSlot?: ReactNode;
  onItemSelect?: (item: ListBoxItemData) => void;
  role?: ListBoxRole;
  selectedValue?: string;
  size?: ListBoxSizes;
}
