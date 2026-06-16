import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { Placement } from '@floating-ui/react';

import type {
  ButtonAppearances,
  ButtonProps,
  ButtonSizes,
  ButtonVariants,
} from '../Button';
import type { ListBoxItemData } from '../ListBox';

export type DropdownVariants = ButtonVariants;

export type DropdownAppearances = ButtonAppearances;

export type DropdownSizes = ButtonSizes;

export type DropdownIcon = NonNullable<ButtonProps['leadingIcon']>;

export type DropdownPlacements = 'top' | 'right' | 'bottom' | 'left';

export type DropdownAlignments = 'start' | 'center' | 'end';

export type DropdownTriggerAction = 'click' | 'hover';

export type DropdownRenderAs = 'button' | 'unstyled';

export type DropdownItem = ListBoxItemData;

export interface DropdownProps extends Omit<
  ButtonProps,
  'children' | 'trailingIcon' | 'value'
> {
  children?: ReactNode;
  chevronIcon?: DropdownIcon;
  clickOutsideToClose?: boolean;
  closeOnSelect?: boolean;
  defaultOpen?: boolean;
  icon?: DropdownIcon;
  iconOnly?: boolean;
  inline?: boolean;
  items?: DropdownItem[];
  align?: DropdownAlignments;
  menuClassName?: string;
  menuContent?: ReactNode | ((closeMenu: () => void) => ReactNode);
  menuOffset?: [number, number];
  menuPlacement?: Placement;
  onItemSelect?: (item: DropdownItem) => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  placement?: DropdownPlacements;
  portalTarget?: HTMLElement | null;
  renderAs?: DropdownRenderAs;
  selectedValue?: string;
  showChevron?: boolean;
  trigger?: ReactNode | ((open: boolean) => ReactNode);
  triggerAction?: DropdownTriggerAction;
  triggerClassName?: string;
  menuProps?: Omit<ComponentPropsWithoutRef<'div'>, 'children'>;
  usePortal?: boolean;
  withArrow?: boolean;
}
