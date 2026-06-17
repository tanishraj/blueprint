import { type FC, useId } from 'react';

import { cn } from '@/utils';

import {
  progressBarCaptionStyles,
  progressBarCircleIndicatorStyles,
  progressBarCircleSvgStyles,
  progressBarCircleTrackStyles,
  progressBarCircleValueStyles,
  progressBarCircleWrapStyles,
  progressBarDotStyles,
  progressBarIndicatorStyles,
  progressBarLabelStyles,
  progressBarMetaStyles,
  progressBarRootStyles,
  progressBarTrackStyles,
  progressBarValueStyles,
} from './ProgressBar.styles';
import type { ProgressBarProps, ProgressBarSizes } from './types';

const circularConfig: Record<
  ProgressBarSizes,
  { radius: number; size: number; strokeWidth: number }
> = {
  sm: { size: 72, strokeWidth: 5, radius: 33.5 },
  md: { size: 88, strokeWidth: 6, radius: 41 },
  lg: { size: 104, strokeWidth: 8, radius: 48 },
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const getProgressState = (value: number, min: number, max: number) => {
  const safeMin = Number.isFinite(min) ? min : 0;
  const safeMax = Number.isFinite(max) && max > safeMin ? max : safeMin + 1;
  const safeValue = Number.isFinite(value) ? value : safeMin;
  const clampedValue = clamp(safeValue, safeMin, safeMax);
  const percentage = ((clampedValue - safeMin) / (safeMax - safeMin)) * 100;

  return {
    max: safeMax,
    min: safeMin,
    percentage,
    value: clampedValue,
  };
};

export const ProgressBar: FC<ProgressBarProps> = ({
  appearance = 'linear',
  caption,
  captionClassName,
  className,
  fullWidth = false,
  indicatorClassName,
  inverted = false,
  label,
  labelClassName,
  max = 100,
  min = 0,
  role = 'progressbar',
  showDot = false,
  showValue = true,
  size = 'md',
  trackClassName,
  value = 0,
  valueClassName,
  valueFormatter,
  variant = 'primary',
  'aria-describedby': ariaDescribedBy,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...restProps
}) => {
  const generatedId = useId();
  const labelId = `${generatedId}-label`;
  const captionId = `${generatedId}-caption`;
  const state = getProgressState(value, min, max);
  const displayValue = valueFormatter
    ? valueFormatter(state)
    : `${Math.round(state.percentage)}%`;
  const labelledBy = ariaLabelledBy ?? (label ? labelId : undefined);
  const describedBy = ariaDescribedBy ?? (caption ? captionId : undefined);
  const commonA11yProps = {
    'aria-describedby': describedBy,
    'aria-label': ariaLabel,
    'aria-labelledby': labelledBy,
    'aria-valuemax': state.max,
    'aria-valuemin': state.min,
    'aria-valuenow': state.value,
    role,
  };

  const renderMeta = () => {
    if (!label && !showValue) {
      return null;
    }

    return (
      <div className={cn(progressBarMetaStyles({ size, inverted }))}>
        {label && (
          <span
            className={cn(progressBarLabelStyles(), labelClassName)}
            id={labelId}
          >
            {label}
          </span>
        )}
        {showValue && (
          <span
            className={cn(
              progressBarValueStyles({ variant, inverted }),
              valueClassName,
            )}
          >
            {displayValue}
          </span>
        )}
      </div>
    );
  };

  const renderCaption = () => {
    if (!caption) {
      return null;
    }

    return (
      <p
        className={cn(
          progressBarCaptionStyles({ size, inverted }),
          captionClassName,
        )}
        id={captionId}
      >
        {caption}
      </p>
    );
  };

  if (appearance === 'circular') {
    const { radius, size: svgSize, strokeWidth } = circularConfig[size];
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset =
      circumference - (state.percentage / 100) * circumference;

    return (
      <div
        {...restProps}
        {...commonA11yProps}
        className={cn(
          progressBarRootStyles({ appearance, fullWidth }),
          className,
        )}
      >
        {label && (
          <span
            className={cn(
              progressBarMetaStyles({ size, inverted }),
              progressBarLabelStyles(),
              labelClassName,
            )}
            id={labelId}
          >
            {label}
          </span>
        )}
        <div className={cn(progressBarCircleWrapStyles({ size }))}>
          <svg
            aria-hidden='true'
            className={cn(progressBarCircleSvgStyles())}
            focusable='false'
            height={svgSize}
            viewBox={`0 0 ${svgSize} ${svgSize}`}
            width={svgSize}
          >
            <circle
              className={cn(
                progressBarCircleTrackStyles({ inverted }),
                trackClassName,
              )}
              cx={svgSize / 2}
              cy={svgSize / 2}
              fill='none'
              r={radius}
              strokeWidth={strokeWidth}
            />
            <circle
              className={cn(
                progressBarCircleIndicatorStyles({ variant, inverted }),
                indicatorClassName,
              )}
              cx={svgSize / 2}
              cy={svgSize / 2}
              fill='none'
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap='round'
              strokeWidth={strokeWidth}
            />
          </svg>
          {showValue && (
            <span
              className={cn(
                progressBarCircleValueStyles({ size, inverted }),
                valueClassName,
              )}
            >
              {displayValue}
            </span>
          )}
        </div>
        {renderCaption()}
      </div>
    );
  }

  return (
    <div
      {...restProps}
      {...commonA11yProps}
      className={cn(
        progressBarRootStyles({ appearance, fullWidth }),
        className,
      )}
    >
      {renderMeta()}
      <div
        className={cn(
          progressBarTrackStyles({ size, inverted }),
          trackClassName,
        )}
      >
        <span
          className={cn(
            progressBarIndicatorStyles({ variant, inverted }),
            indicatorClassName,
          )}
          style={{ width: `${state.percentage}%` }}
        />
        {showDot && (
          <span
            aria-hidden='true'
            className={cn(progressBarDotStyles({ size, variant, inverted }))}
            style={{ left: `${state.percentage}%` }}
          />
        )}
      </div>
      {renderCaption()}
    </div>
  );
};
