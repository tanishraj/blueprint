import type {
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  SVGProps,
  FC,
} from 'react';
import type { VariantProps } from 'class-variance-authority';

import type { RemoveNull } from '@/utils';

import type { ButtonProps } from '../Button';
import {
  confirmationPopupIconStyles,
  confirmationPopupPanelStyles,
} from './ConfirmationPopup.styles';

export type ConfirmationPopupPlacements = 'top' | 'right' | 'bottom' | 'left';

export type ConfirmationPopupAlignments = 'start' | 'center' | 'end';

export type ConfirmationPopupVariants = RemoveNull<
  VariantProps<typeof confirmationPopupIconStyles>
>['variant'];

export type ConfirmationPopupSizes = RemoveNull<
  VariantProps<typeof confirmationPopupPanelStyles>
>['size'];

export type ConfirmationPopupIcon = FC<SVGProps<SVGSVGElement>>;

export interface ConfirmationPopupProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onCancel' | 'title'>,
    RemoveNull<VariantProps<typeof confirmationPopupIconStyles>>,
    RemoveNull<VariantProps<typeof confirmationPopupPanelStyles>> {
  trigger?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  placement?: ConfirmationPopupPlacements;
  align?: ConfirmationPopupAlignments;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
  onCancel?: (event: MouseEvent<HTMLButtonElement>) => void;
  onAction?: (event: MouseEvent<HTMLButtonElement>) => void;
  closeLabel?: string;
  cancelLabel?: ReactNode;
  actionLabel?: ReactNode;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
  closeOnCancel?: boolean;
  closeOnAction?: boolean;
  showArrow?: boolean;
  showCloseButton?: boolean;
  showCancelButton?: boolean;
  showActionButton?: boolean;
  leadingIcon?: ConfirmationPopupIcon;
  contentClassName?: string;
  triggerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  actionButtonProps?: Partial<ButtonProps>;
  cancelButtonProps?: Partial<ButtonProps>;
}
