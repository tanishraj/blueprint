import { cva } from 'class-variance-authority';

import type { TMetricCardColorVariant } from './types';

const metricCardToneClasses: Record<TMetricCardColorVariant, string> = {
  secondary: 'text-default',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-danger',
};

export const metricCardStyles = cva('flex flex-col gap-1', {
  variants: {
    hasDivider: {
      true: 'border-l border-gray-300 pl-6',
      false: '',
    },
  },
  defaultVariants: {
    hasDivider: false,
  },
});

export const metricCardItemsStyles = cva('', {
  variants: {
    multiple: {
      true: 'flex items-start gap-4',
      false: 'flex flex-col gap-0.5',
    },
  },
  defaultVariants: {
    multiple: false,
  },
});

export const metricCardValueStyles = cva(
  'text-2xl leading-8 font-bold tracking-tight text-default',
  {
    variants: {
      color: metricCardToneClasses,
    },
  },
);

export const metricCardHintStyles = cva(
  'text-sm leading-5 font-normal text-caption',
  {
    variants: {
      color: metricCardToneClasses,
    },
  },
);

export const metricCardValueSupportStyles = cva('text-caption', {
  variants: {
    size: {
      sm: 'text-sm leading-5 font-normal',
      lg: 'text-lg leading-7 font-semibold',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});
