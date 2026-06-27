import type {
  ComponentType,
  HTMLAttributes,
  ReactNode,
  RefObject,
  SVGProps,
} from 'react';
import { type VariantProps } from 'class-variance-authority';

import { RemoveNull } from '@/utils';

import { modalPanelStyles } from './Modal.styles';

export type ModalSizes = RemoveNull<
  VariantProps<typeof modalPanelStyles>
>['size'];

export type ModalIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface ModalProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
    RemoveNull<VariantProps<typeof modalPanelStyles>> {
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
  leadingIcon?: ModalIcon;
  showCloseButton?: boolean;
  showOverlay?: boolean;
}
