import type { ComponentPropsWithoutRef, ReactNode, RefObject } from 'react';
import { type VariantProps } from 'class-variance-authority';

import type { RemoveNull } from '@/utils/types';

import { drawerPanelStyles } from './Drawer.styles';

export type DrawerPlacements = RemoveNull<
  VariantProps<typeof drawerPanelStyles>
>['placement'];

export type DrawerSizes = RemoveNull<
  VariantProps<typeof drawerPanelStyles>
>['size'];

export interface DrawerProps
  extends
    Omit<ComponentPropsWithoutRef<'div'>, 'title'>,
    RemoveNull<VariantProps<typeof drawerPanelStyles>> {
  open: boolean;
  children?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  onClose?: () => void;
  closeLabel?: string;
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
  container?: HTMLElement | null | undefined;
  containerId?: string | undefined;
  containerRef?: RefObject<HTMLElement | null> | undefined;
  disablePortal?: boolean;
  showCloseButton?: boolean;
  showOverlay?: boolean;
}
