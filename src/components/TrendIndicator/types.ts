import type { FC, HTMLProps, ReactNode } from 'react';

export enum ETrend {
  positive = 'positive',
  negative = 'negative',
  neutral = 'neutral',
}

export type IndicatorMapper = Record<ETrend, FC>;

export type TrendIndicatorSize = 'sm' | 'md' | 'lg';
export type TrendIndicatorStrokeWidth = 'thin' | 'thick' | 'thicker';

export interface TrendIndicatorProps {
  className?: HTMLProps<HTMLElement>['className'];
  colorizeValueText?: boolean;
  inverted?: boolean | undefined;
  label?: ReactNode;
  size?: TrendIndicatorSize;
  strokeWidth?: TrendIndicatorStrokeWidth;
  value?: ReactNode;
  variant?: ETrend;
}

export type ITrendIndicatorProps = TrendIndicatorProps;
