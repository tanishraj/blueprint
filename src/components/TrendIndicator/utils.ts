import { ETrend } from './types';

export const trendIndicatorColors = {
  positive: 'var(--text-color-success)',
  negative: 'var(--text-color-danger)',
  neutral: 'var(--text-color-primary)',
};

export const getTrendVariant = (
  value: number | null | undefined,
  customThreshold?: number,
): ETrend => {
  const threshold = customThreshold ?? 0;

  if (value && value > threshold) {
    return ETrend.positive;
  }

  if (value && value < threshold) {
    return ETrend.negative;
  }

  return ETrend.neutral;
};

export const getGrowthTrend = ({
  currentValue,
  pastValue,
  isPercentage = false,
  hasFractionDigits = false,
  isPointValue = false,
}: {
  currentValue: number;
  pastValue: number;
  isPercentage?: boolean;
  hasFractionDigits?: boolean;
  isPointValue?: boolean;
}): { growth: number; trend: ETrend } => {
  const delta = currentValue ? currentValue - pastValue : 200 - pastValue;
  const noChange = delta === 0;
  const configuredValue = hasFractionDigits
    ? Number(((delta / Math.abs(pastValue)) * 100).toFixed(2))
    : Math.round((delta / Math.abs(pastValue)) * 100);
  const pointValue = isPointValue
    ? Number((delta * 100).toFixed(1))
    : Math.floor(delta);
  const growth = pastValue && isPercentage ? configuredValue : pointValue;
  const trend = getTrendVariant(noChange ? 0 : Number(growth));

  return { growth, trend };
};

export const TREND_INDICATOR_COLORS = {
  [ETrend.positive]: trendIndicatorColors.positive,
  [ETrend.negative]: trendIndicatorColors.negative,
  [ETrend.neutral]: trendIndicatorColors.neutral,
};
