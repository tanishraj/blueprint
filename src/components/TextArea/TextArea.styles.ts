import { cva } from 'class-variance-authority';

export const textAreaRootStyles = cva('inline-flex flex-col gap-1', {
  variants: {
    fullWidth: {
      true: 'w-full',
      false: 'w-fit',
    },
  },
  defaultVariants: {
    fullWidth: true,
  },
});

export const textAreaLabelStyles = cva('font-medium text-default', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-sm',
    },
    disabled: {
      true: 'text-gray-500',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    disabled: false,
  },
});

export const textAreaRequiredStyles = cva('ml-0.5 text-danger');

export const textAreaFieldStyles = cva(
  'group inline-flex overflow-hidden rounded border bg-base text-default outline-none transition-[border-color,box-shadow,background-color] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-0',
  {
    variants: {
      size: {
        sm: 'min-w-48 px-2 py-2 text-sm',
        md: 'min-w-64 px-2.5 py-2.5 text-base',
        lg: 'min-w-80 px-3 py-3 text-lg',
      },
      variant: {
        default:
          'border-gray-400 hover:border-gray-600 focus-within:border-gray-600 focus-within:ring-[var(--gray-200)]',
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
        true: 'pointer-events-none cursor-not-allowed border-gray-300 bg-gray-100 text-gray-500 opacity-70 hover:border-gray-300 focus-within:ring-0',
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

export const textAreaElementStyles = cva(
  'block w-full flex-1 resize-y appearance-none border-0 bg-transparent p-0 text-current outline-none placeholder:text-gray-500 focus:outline-none focus:ring-0 focus-visible:outline-none disabled:cursor-not-allowed disabled:placeholder:text-gray-500',
);

export const textAreaCaptionStyles = cva('font-medium text-default', {
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
      true: 'text-gray-500',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    invalid: false,
    disabled: false,
  },
});
