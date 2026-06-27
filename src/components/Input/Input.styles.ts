import { cva } from 'class-variance-authority';

export const inputRootStyles = cva('inline-flex flex-col gap-1', {
  variants: {
    fullWidth: {
      true: 'w-full',
      false: 'w-fit',
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
});

export const inputLabelStyles = cva('font-medium text-default', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-sm',
    },
    disabled: {
      true: 'text-disabled',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    disabled: false,
  },
});

export const inputRequiredStyles = cva('ml-0.5 text-danger');

export const inputFieldStyles = cva(
  'group inline-flex items-center overflow-hidden rounded border bg-base text-default outline-none transition-[border-color,box-shadow,background-color] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-0',
  {
    variants: {
      size: {
        sm: 'h-7 min-w-48 gap-1.5 px-2 text-sm',
        md: 'h-8 min-w-64 gap-2 px-2.5 text-base',
        lg: 'h-10 min-w-80 gap-2.5 px-3 text-lg',
      },
      variant: {
        default:
          'border-default hover:border-default focus-within:border-default focus-within:ring-[var(--border-color-ring)]',
        primary:
          'border-primary hover:border-primary-hovered focus-within:border-primary focus-within:ring-[var(--primary-100)]',
        info: 'border-info hover:border-info-hovered focus-within:border-info focus-within:ring-[var(--info-100)]',
        success:
          'border-success hover:border-success-hovered focus-within:border-success focus-within:ring-[var(--success-100)]',
        warning:
          'border-warning hover:border-warning-hovered focus-within:border-warning focus-within:ring-[var(--warning-100)]',
        danger:
          'border-danger hover:border-danger-hovered focus-within:border-danger focus-within:ring-[var(--danger-100)]',
      },
      disabled: {
        true: 'pointer-events-none cursor-not-allowed border-disabled bg-disabled text-disabled opacity-70 hover:border-disabled focus-within:ring-0',
        false: '',
      },
      invalid: {
        true: 'border-danger hover:border-danger focus-within:border-danger focus-within:ring-[var(--danger-100)]',
        false: '',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
      disabled: false,
      invalid: false,
      fullWidth: false,
    },
  },
);

export const inputElementStyles = cva(
  'min-w-0 flex-1 appearance-none border-0 bg-transparent p-0 text-current outline-none placeholder:text-placeholder focus:outline-none focus:ring-0 focus-visible:outline-none disabled:cursor-not-allowed disabled:placeholder:text-disabled',
);

export const inputIconStyles = cva('shrink-0 text-current', {
  variants: {
    size: {
      sm: 'size-3.5',
      md: 'size-4',
      lg: 'size-5',
    },
    muted: {
      true: 'text-caption',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    muted: false,
  },
});

export const inputClearButtonStyles = cva(
  'inline-flex shrink-0 cursor-pointer items-center justify-center rounded text-caption outline-none transition-colors hover:bg-default-hovered hover:text-default focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'size-4',
        md: 'size-5',
        lg: 'size-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export const inputCaptionStyles = cva('text-caption', {
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
    disabled: {
      true: 'text-disabled',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    invalid: false,
    disabled: false,
  },
});
