import type {
  ComponentPropsWithoutRef,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
} from 'react';
import type { VariantProps } from 'class-variance-authority';

import type { RemoveNull } from '@/utils/types';

import {
  tabListStyles,
  tabPanelStyles,
  tabRootStyles,
  tabsRootStyles,
} from './Tabs.styles';

export type TabsOrientation = RemoveNull<
  VariantProps<typeof tabsRootStyles>
>['orientation'];

export type TabsVariant = RemoveNull<
  VariantProps<typeof tabRootStyles>
>['variant'];

export type TabsSizes = RemoveNull<VariantProps<typeof tabRootStyles>>['size'];

export interface TabsProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'children' | 'defaultValue' | 'onChange'
> {
  children: ReactNode;
  defaultValue?: number;
  disabled?: boolean;
  id?: string;
  onValueChange?: (value: number) => void;
  orientation?: TabsOrientation;
  size?: TabsSizes;
  value?: number;
  variant?: TabsVariant;
}

export interface TabsListProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'children'
> {
  children: ReactNode;
}

export interface TabProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'children' | 'id' | 'onClick' | 'onKeyDown' | 'role' | 'tabIndex'
> {
  children: ReactNode;
  closeLabel?: string;
  disabled?: boolean;
  endAdornment?: ReactNode;
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void;
  startAdornment?: ReactNode;
  statusDot?: boolean;
}

export interface TabPanelProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'children'
> {
  children: ReactNode;
}

export interface TabsContextValue {
  baseId: string;
  disabled: boolean;
  orientation: NonNullable<TabsProps['orientation']>;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  size: NonNullable<TabsProps['size']>;
  variant: NonNullable<TabsProps['variant']>;
}

export interface TabsListContextValue extends TabsContextValue {
  registerTab: (index: number, node: HTMLDivElement | null) => void;
  focusTab: (index: number) => void;
  getNextEnabledIndex: (currentIndex: number, direction: 1 | -1) => number;
  getFirstEnabledIndex: () => number;
  getLastEnabledIndex: () => number;
  isTabDisabled: (index: number) => boolean;
  tabCount: number;
}

export interface InternalTabProps extends TabProps {
  index?: number;
  panelId?: string;
  selected?: boolean;
}

export interface InternalTabListProps extends TabsListProps {
  children: ReactElement<TabProps> | ReactElement<TabProps>[];
}

export interface InternalTabPanelProps extends TabPanelProps {
  index?: number;
}

export type TabKeyboardEvent = KeyboardEvent<HTMLDivElement>;

export type TabsRootOrientation = RemoveNull<
  VariantProps<typeof tabListStyles>
>['orientation'];

export type TabPanelOrientation = RemoveNull<
  VariantProps<typeof tabPanelStyles>
>['orientation'];
