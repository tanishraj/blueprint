import type { HTMLAttributes, ReactNode } from 'react';

import type { LabelProps } from '../Label';
import { ETrend } from '../TrendIndicator';

export type MetricCardColorVariant =
  | 'secondary'
  | 'warning'
  | 'success'
  | 'error';

export type ValueSupportSize = 'sm' | 'lg';

export type TrendPosition = 'left' | 'right';

export interface MetricValue {
  color?: MetricCardColorVariant;
  supportText?: ReactNode;
  supportTextSize?: ValueSupportSize;
  text?: ReactNode;
  trend?: ETrend;
  trendInverted?: boolean;
}

export interface MetricHint {
  color?: MetricCardColorVariant;
  text?: ReactNode;
  trend?: ETrend;
  trendInverted?: boolean;
  trendPosition?: TrendPosition;
}

export interface MetricValueItemData {
  hint?: MetricHint;
  value?: MetricValue;
}

export interface MetricCardProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> {
  hint?: MetricHint;
  items?: MetricValueItemData[];
  label?: LabelProps;
  showDivider?: boolean;
  value?: MetricValue;
}

export type TMetricCardColorVariant = MetricCardColorVariant;
export type TValueSupportSize = ValueSupportSize;
export type TTrendPosition = TrendPosition;
export type IMetricValue = MetricValue;
export type IMetricHint = MetricHint;
export type IMetricValueItem = MetricValueItemData;
export type IMetricCardProps = MetricCardProps;

export { ETrend };
