import { cva } from 'class-variance-authority';

export const radioRootStyles = cva('inline-flex w-fit gap-2', {
  variants: {
    disabled: {
      true: 'cursor-not-allowed opacity-40',
      false: 'cursor-pointer',
    },
    hasHelperText: {
      true: 'items-start',
      false: 'items-center',
    },
  },
  defaultVariants: {
    disabled: false,
    hasHelperText: false,
  },
});

export const radioInputStyles = cva(
  'peer absolute size-0 opacity-0 outline-none',
);

export const radioControlStyles = cva(
  'inline-flex shrink-0 items-center justify-center rounded-full border bg-base transition-colors peer-checked:border-primary peer-checked:[&>span]:flex peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-base peer-disabled:cursor-not-allowed',
  {
    variants: {
      size: {
        sm: 'size-4',
        md: 'size-[18px]',
        lg: 'size-5',
      },
      hasHelperText: {
        true: '',
        false: 'self-center',
      },
      invalid: {
        true: 'border-danger peer-checked:border-danger',
        false: 'border-default',
      },
    },
    defaultVariants: {
      size: 'md',
      hasHelperText: false,
      invalid: false,
    },
    compoundVariants: [
      {
        hasHelperText: true,
        size: 'sm',
        className: 'mt-0.5',
      },
      {
        hasHelperText: true,
        size: 'md',
        className: 'mt-px',
      },
      {
        hasHelperText: true,
        size: 'lg',
        className: 'mt-0.5',
      },
    ],
  },
);

export const radioDotStyles = cva('hidden rounded-full transition-colors', {
  variants: {
    size: {
      sm: 'size-1.5',
      md: 'size-2',
      lg: 'size-2',
    },
    invalid: {
      true: 'bg-danger',
      false: 'bg-primary',
    },
  },
  defaultVariants: {
    size: 'md',
    invalid: false,
  },
});

export const radioContentStyles = cva('flex min-w-0 flex-col gap-1');

export const radioLabelStyles = cva('font-medium text-default', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-sm',
      lg: 'text-sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const radioRequiredStyles = cva('ml-1 text-danger');

export const radioDescriptionStyles = cva('text-caption', {
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
