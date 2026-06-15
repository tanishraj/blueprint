import type { HTMLAttributes, ReactNode, RefObject } from 'react';
import { type VariantProps } from 'class-variance-authority';

import { RemoveNull } from '@/utils';

import { drawerPanelStyles } from './Drawer.styles';

export type DrawerPlacements = RemoveNull<
  VariantProps<typeof drawerPanelStyles>
>['placement'];

export type DrawerSizes = RemoveNull<
  VariantProps<typeof drawerPanelStyles>
>['size'];

export interface DrawerProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
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
