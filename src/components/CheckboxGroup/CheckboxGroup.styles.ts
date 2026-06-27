import { cva } from 'class-variance-authority';

export const checkboxGroupStyles = cva('flex w-fit min-w-0 flex-col gap-3', {
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

export const checkboxGroupHeaderStyles = cva('flex min-w-0 flex-col gap-1');

export const checkboxGroupLegendStyles = cva('font-medium text-default', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const checkboxGroupRequiredStyles = cva('ml-1 text-danger');

export const checkboxGroupDescriptionStyles = cva('text-caption', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-xs',
      lg: 'text-sm',
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

export const checkboxGroupItemsStyles = cva('flex min-w-0', {
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
