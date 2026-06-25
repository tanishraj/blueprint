import type { FC } from 'react';

import {
  metricCardHintStyles,
  metricCardValueStyles,
  metricCardValueSupportStyles,
} from './MetricCard.styles';
import type { IMetricValueItem } from './types';
import { TrendIndicator } from '../TrendIndicator';

export const MetricValueItem: FC<IMetricValueItem> = ({ value, hint }) => {
  const valueClassName = metricCardValueStyles({ color: value?.color });
  const valueSupportClassName = metricCardValueSupportStyles({
    size:
      !value?.text && value?.supportText
        ? (value.supportTextSize ?? 'sm')
        : 'sm',
  });
  const hintClassName = metricCardHintStyles({ color: hint?.color });

  const hintTrendIndicator = hint?.trend ? (
    <TrendIndicator
      size='md'
      strokeWidth='thin'
      variant={hint.trend}
      {...(hint.trendInverted !== undefined
        ? { inverted: hint.trendInverted }
        : {})}
    />
  ) : null;

  return (
    <div className='min-w-0'>
      <div className='flex items-center gap-1'>
        <div className='flex items-baseline gap-2'>
          {value?.text && <span className={valueClassName}>{value.text}</span>}
          {value?.supportText && (
            <span className={valueSupportClassName}>{value.supportText}</span>
          )}
        </div>
        {value?.trend && (
          <TrendIndicator
            size='lg'
            strokeWidth='thin'
            variant={value.trend}
            {...(value.trendInverted !== undefined
              ? { inverted: value.trendInverted }
              : {})}
          />
        )}
      </div>

      {(hint?.text || hint?.trend) && (
        <div className='flex items-center gap-1'>
          {hint?.trendPosition === 'left' && hintTrendIndicator}
          {hint?.text && <div className={hintClassName}>{hint.text}</div>}
          {(hint?.trendPosition === 'right' || !hint?.trendPosition) &&
            hintTrendIndicator}
        </div>
      )}
    </div>
  );
};
