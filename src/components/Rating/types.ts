import type { ComponentPropsWithRef } from 'react';
import type { VariantProps } from 'class-variance-authority';

import type { RemoveNull } from '@/utils';

import { ratingStarStyles } from './Rating.styles';

export type RatingSizes = RemoveNull<
  VariantProps<typeof ratingStarStyles>
>['size'];

export type RatingPrecision = 0.5 | 1;

export interface RatingProps extends Omit<
  ComponentPropsWithRef<'div'>,
  'defaultValue' | 'onChange'
> {
  defaultValue?: number;
  disabled?: boolean;
  getLabelText?: (value: number, max: number) => string;
  max?: number;
  name?: string;
  onValueChange?: (value: number) => void;
  precision?: RatingPrecision;
  readOnly?: boolean;
  size?: RatingSizes;
  value?: number;
}
