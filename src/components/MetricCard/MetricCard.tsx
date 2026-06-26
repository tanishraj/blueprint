import { cn } from '@/utils/classNames';

import { metricCardItemsStyles, metricCardStyles } from './MetricCard.styles';
import { MetricValueItem } from './MetricValueItem';
import type { MetricCardProps, MetricValueItemData } from './types';
import { Label } from '../Label';

const hasLabelText = (text: unknown) => text !== undefined && text !== null;

const getMetricItemKey = (item: MetricValueItemData, index: number) =>
  [
    index,
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

export function MetricCard({
  className,
  hint,
  items,
  label,
  showDivider = false,
  value,
  ...restProps
}: MetricCardProps) {
  const fallbackItem: MetricValueItemData | null =
    value || hint
      ? {
          ...(value ? { value } : {}),
          ...(hint ? { hint } : {}),
        }
      : null;
  const valueItems: MetricValueItemData[] =
    items ?? (fallbackItem ? [fallbackItem] : []);

  return (
    <div
      {...restProps}
      className={cn(metricCardStyles({ hasDivider: showDivider }), className)}
    >
      {hasLabelText(label?.text) ? <Label {...label} /> : null}

      <div
        className={metricCardItemsStyles({ multiple: valueItems.length > 1 })}
      >
        {valueItems.map((item, index) => (
          <MetricValueItem key={getMetricItemKey(item, index)} {...item} />
        ))}
      </div>
    </div>
  );
}
