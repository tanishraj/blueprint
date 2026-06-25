import { type FC } from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-react';

import { cn } from '@/utils';

import {
  trendIndicatorIconStyles,
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

export const TrendIndicator: FC<TrendIndicatorProps> = ({
  className,
  colorizeValueText = false,
  inverted = false,
  label,
  size = 'lg',
  strokeWidth = 'thicker',
  value,
  variant,
}) => {
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
      aria-label={ariaLabel}
      className={cn(trendIndicatorRootStyles(), className)}
      role={variant ? 'figure' : undefined}
    >
      {value ? (
        <div
          className={cn(
            colorizeValueText
              ? trendIndicatorValueStyles({ tone: variant ?? 'undefined' })
              : undefined,
          )}
        >
          {value}
        </div>
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
      {label ? <div>{label}</div> : null}
    </div>
  );
};
