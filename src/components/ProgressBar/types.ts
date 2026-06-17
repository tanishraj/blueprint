import type { HTMLAttributes, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';

import type { RemoveNull } from '@/utils';

import type { ButtonVariants } from '../Button';
import {
  progressBarRootStyles,
  progressBarTrackStyles,
} from './ProgressBar.styles';

export type ProgressBarAppearances = NonNullable<
  RemoveNull<VariantProps<typeof progressBarRootStyles>>['appearance']
>;

export type ProgressBarSizes = NonNullable<
  RemoveNull<VariantProps<typeof progressBarTrackStyles>>['size']
>;

export type ProgressBarVariants = ButtonVariants;

export interface ProgressBarValueFormatterArgs {
  max: number;
  min: number;
  percentage: number;
  value: number;
}

export interface ProgressBarProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> {
  appearance?: ProgressBarAppearances;
  caption?: ReactNode;
  captionClassName?: string;
  fullWidth?: boolean;
  indicatorClassName?: string;
  inverted?: boolean;
  label?: ReactNode;
  labelClassName?: string;
  max?: number;
  min?: number;
  showDot?: boolean;
  showValue?: boolean;
  size?: ProgressBarSizes;
  trackClassName?: string;
  value?: number;
  valueClassName?: string;
  valueFormatter?: (args: ProgressBarValueFormatterArgs) => ReactNode;
  variant?: ProgressBarVariants;
}
