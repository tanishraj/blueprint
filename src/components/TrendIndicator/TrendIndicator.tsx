import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-react';

import { cn } from '@/utils/classNames';

import {
  trendIndicatorIconStyles,
  trendIndicatorLabelStyles,
  trendIndicatorRootStyles,
  trendIndicatorValueStyles,
} from './TrendIndicator.styles';
import { ETrend, type TrendIndicatorProps } from './types';

const indicatorMapper = {
  [ETrend.positive]: ArrowUpRight,
  [ETrend.negative]: ArrowDownRight,
  [ETrend.neutral]: ArrowRight,
} as const;

const indicatorInvertedMapper = {
  [ETrend.positive]: ArrowDownRight,
  [ETrend.negative]: ArrowUpRight,
  [ETrend.neutral]: ArrowRight,
} as const;

const trendDescriptions = {
  [ETrend.positive]: 'Positive Trend',
  [ETrend.negative]: 'Negative Trend',
  [ETrend.neutral]: 'Neutral Trend',
} as const;

const trendDescriptionsInverted = {
  [ETrend.positive]: 'Negative Trend',
  [ETrend.negative]: 'Positive Trend',
  [ETrend.neutral]: 'Neutral Trend',
} as const;

const hasContent = (
  value: TrendIndicatorProps['value'] | TrendIndicatorProps['label'],
) => value !== undefined && value !== null && value !== false && value !== '';

export function TrendIndicator({
  className,
  colorizeValueText = false,
  inverted = false,
  label,
  size = 'lg',
  strokeWidth = 'thicker',
  value,
  variant,
  ...restProps
}: TrendIndicatorProps) {
  const Icon =
    variant && inverted
      ? indicatorInvertedMapper[variant]
      : variant
        ? indicatorMapper[variant]
        : null;
  const ariaLabel = variant
    ? inverted
      ? trendDescriptionsInverted[variant]
      : trendDescriptions[variant]
    : undefined;

  return (
    <div
      {...restProps}
      aria-label={ariaLabel}
      className={cn(trendIndicatorRootStyles(), className)}
      role={variant ? 'figure' : undefined}
    >
      {hasContent(value) ? (
        <span
          className={cn(
            colorizeValueText
              ? trendIndicatorValueStyles({ tone: variant ?? 'undefined' })
              : undefined,
          )}
        >
          {value}
        </span>
      ) : null}
      {Icon ? (
        <span
          className={cn(
            trendIndicatorIconStyles({
              size,
              strokeWidth,
              tone: variant ?? 'undefined',
            }),
          )}
        >
          <Icon aria-hidden='true' className='size-full' />
        </span>
      ) : null}
      {hasContent(label) ? (
        <span className={cn(trendIndicatorLabelStyles())}>{label}</span>
      ) : null}
    </div>
  );
}
