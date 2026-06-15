import { cva } from 'class-variance-authority';

export const checkboxRootStyles = cva('inline-flex w-fit items-start gap-2', {
  variants: {
    disabled: {
      true: 'cursor-not-allowed opacity-40',
      false: 'cursor-pointer',
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

export const checkboxInputStyles = cva(
  'peer absolute size-0 opacity-0 outline-none',
);

export const checkboxControlStyles = cva(
  'inline-flex shrink-0 items-center justify-center rounded border bg-base text-white transition-colors [&>svg]:hidden peer-checked:[&>svg]:flex peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-base peer-checked:border-primary peer-checked:bg-primary peer-disabled:cursor-not-allowed',
  {
    variants: {
      size: {
        sm: 'mt-0.5 size-4 rounded-sm',
        md: 'mt-0.5 size-5 rounded',
        lg: 'mt-1 size-6 rounded-md',
      },
      invalid: {
        true: 'border-danger peer-checked:border-danger peer-checked:bg-danger',
        false: 'border-gray-400',
      },
      indeterminate: {
        true: 'border-primary bg-primary [&>svg]:flex',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      invalid: false,
      indeterminate: false,
    },
  },
);

export const checkboxCheckIconStyles = cva('shrink-0', {
  variants: {
    size: {
      sm: 'size-3',
      md: 'size-3.5',
      lg: 'size-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const checkboxIndeterminateIconStyles = cva('shrink-0', {
  variants: {
    size: {
      sm: 'size-3',
      md: 'size-3.5',
      lg: 'size-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const checkboxContentStyles = cva('flex min-w-0 flex-col gap-1');

export const checkboxLabelStyles = cva('font-medium text-default', {
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

export const checkboxRequiredStyles = cva('ml-1 text-danger');

export const checkboxDescriptionStyles = cva('text-gray-600', {
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
