import type { HTMLAttributes, ReactNode } from 'react';
import type { ILabelProps } from '../Label';
import { ETrend } from '../TrendIndicator';

export type TMetricCardColorVariant =
  | 'secondary'
  | 'warning'
  | 'success'
  | 'error';

export type TValueSupportSize = 'sm' | 'lg';

export type TTrendPosition = 'left' | 'right';

export interface IMetricValue {
  color?: TMetricCardColorVariant;
  supportText?: ReactNode;
  supportTextSize?: TValueSupportSize;
  text?: ReactNode;
  trend?: ETrend;
  trendInverted?: boolean;
}

export interface IMetricHint {
  color?: TMetricCardColorVariant;
  text?: ReactNode;
  trend?: ETrend;
  trendInverted?: boolean;
  trendPosition?: TTrendPosition;
}

export interface IMetricValueItem {
  hint?: IMetricHint;
  value?: IMetricValue;
}

export interface IMetricCardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  hint?: IMetricHint;
  items?: IMetricValueItem[];
  label?: ILabelProps;
  showDivider?: boolean;
  value?: IMetricValue;
}

export { ETrend };
