import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export enum ETrend {
  positive = 'positive',
  negative = 'negative',
  neutral = 'neutral',
}

export type TrendIndicatorSize = 'sm' | 'md' | 'lg';
export type TrendIndicatorStrokeWidth = 'thin' | 'thick' | 'thicker';

export interface TrendIndicatorProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'children'
> {
  colorizeValueText?: boolean;
  inverted?: boolean;
  label?: ReactNode;
  size?: TrendIndicatorSize;
  strokeWidth?: TrendIndicatorStrokeWidth;
  value?: ReactNode;
  variant?: ETrend;
}
