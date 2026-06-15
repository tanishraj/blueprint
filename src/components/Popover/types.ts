import type { HTMLAttributes, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';

import type { RemoveNull } from '@/utils';

import { popoverIconStyles } from './Popover.styles';

export type PopoverPlacements = 'top' | 'right' | 'bottom' | 'left';

export type PopoverAlignments = 'start' | 'center' | 'end';

export type PopoverVariants = RemoveNull<
  VariantProps<typeof popoverIconStyles>
>['variant'];

export interface PopoverProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
    RemoveNull<VariantProps<typeof popoverIconStyles>> {
  trigger?: ReactNode;
  title?: ReactNode;
  children?: ReactNode;
  placement?: PopoverPlacements;
  align?: PopoverAlignments;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeLabel?: string;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
  showArrow?: boolean;
  showCloseButton?: boolean;
  showSlotBorder?: boolean;
  contentClassName?: string;
  triggerClassName?: string;
}
