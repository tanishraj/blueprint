import type { FC } from 'react';

import { cn } from '@/utils';

import { metricCardItemsStyles, metricCardStyles } from './MetricCard.styles';
import { MetricValueItem } from './MetricValueItem';
import type { IMetricCardProps, IMetricValueItem } from './types';
import { Label } from '../Label';

const getMetricItemKey = (item: IMetricValueItem) =>
  [
    item.value?.text,
    item.value?.supportText,
    item.value?.color,
    item.value?.trend,
    item.hint?.text,
    item.hint?.color,
    item.hint?.trend,
    item.hint?.trendPosition,
  ]
    .map(part => String(part ?? ''))
    .join('::');

export const MetricCard: FC<IMetricCardProps> = ({
  className,
  hint,
  items,
  label,
  showDivider = false,
  value,
  ...restProps
}) => {
  const fallbackItem: IMetricValueItem | null =
    value || hint
      ? {
          ...(value ? { value } : {}),
          ...(hint ? { hint } : {}),
        }
      : null;
  const valueItems: IMetricValueItem[] =
    items ?? (fallbackItem ? [fallbackItem] : []);

  return (
    <div
      {...restProps}
      className={cn(metricCardStyles({ hasDivider: showDivider }), className)}
    >
      {label?.text ? <Label {...label} /> : null}

      <div
        className={metricCardItemsStyles({ multiple: valueItems.length > 1 })}
      >
        {valueItems.map(item => (
          <MetricValueItem key={getMetricItemKey(item)} {...item} />
        ))}
      </div>
    </div>
  );
};
