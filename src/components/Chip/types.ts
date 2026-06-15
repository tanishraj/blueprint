import type { ComponentPropsWithoutRef, FC, SVGProps } from 'react';
import { type VariantProps } from 'class-variance-authority';

import { RemoveNull } from '@/utils';

import { chipStyles } from './Chip.styles';

export type ChipSizes = RemoveNull<VariantProps<typeof chipStyles>>['size'];

export type ChipShapes = RemoveNull<VariantProps<typeof chipStyles>>['shape'];

export type ChipVariants = RemoveNull<
  VariantProps<typeof chipStyles>
>['variant'];

export type ChipIcon = FC<SVGProps<SVGSVGElement>>;

export interface ChipProps
  extends
    Omit<ComponentPropsWithoutRef<'span'>, 'children'>,
    RemoveNull<
      Omit<
        VariantProps<typeof chipStyles>,
        'disabled' | 'hasLeadingVisual' | 'removable'
      >
    > {
  children: string | number;
  icon?: ChipIcon;
  disabled?: boolean;
  onClose?: () => void;
  closeLabel?: string;
}
