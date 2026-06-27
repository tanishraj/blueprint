import { cva } from 'class-variance-authority';

export const radioGroupStyles = cva('flex w-fit min-w-0 flex-col gap-3', {
  variants: {
    disabled: {
      true: 'opacity-40',
      false: '',
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

export const radioGroupHeaderStyles = cva('flex min-w-0 flex-col gap-1');

export const radioGroupLegendStyles = cva('font-medium text-default', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const radioGroupRequiredStyles = cva('ml-1 text-danger');

export const radioGroupDescriptionStyles = cva('text-caption', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-xs',
      lg: 'text-xs',
    },
    invalid: {
      true: 'text-danger',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    invalid: false,
  },
});

export const radioGroupItemsStyles = cva('flex min-w-0', {
  variants: {
    orientation: {
      horizontal: 'flex-row flex-wrap gap-x-6 gap-y-3',
      vertical: 'flex-col gap-3',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
});
