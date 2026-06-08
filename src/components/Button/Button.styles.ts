import { cva } from 'class-variance-authority';

export const buttonStyles = cva(
  'inline-flex w-fit items-center justify-center gap-2.5 cursor-pointer text-sm p-2 rounded border outline-none border-transparent hover:bg-default-hovered active:bg-default-pressed',
  {
    variants: {
      size: {
        sm: 'p-2 text-sm gap-2',
        md: 'px-3 py-2 text-base gap-2.5',
        lg: 'px-3.5 py-2 text-lg gap-3',
      },
      variant: {
        default: 'text-default',
        primary: 'text-primary',
        info: 'text-info',
        success: 'text-success',
        warning: 'text-warning',
        danger: 'text-danger',
      },
      appearance: {
        filled: 'bg-default',
        outline: 'bg-transparent',
        dashed: 'bg-transparent border-dashed',
        ghost: 'bg-transparent',
      },
      disabled: {
        true: '',
      },
      loading: {
        true: '',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    compoundVariants: [
      /* FILLED */
      {
        appearance: 'filled',
        variant: 'default',
        className: 'bg-default text-default',
      },
      {
        appearance: 'filled',
        variant: 'primary',
        className:
          'bg-primary text-white hover:bg-primary-hovered active:bg-primary-pressed',
      },
      {
        appearance: 'filled',
        variant: 'info',
        className:
          'bg-info text-white hover:bg-info-hovered active:bg-info-pressed',
      },
      {
        appearance: 'filled',
        variant: 'success',
        className:
          'bg-success text-white hover:bg-success-hovered active:bg-success-pressed',
      },
      {
        appearance: 'filled',
        variant: 'warning',
        className:
          'bg-warning text-white hover:bg-warning-hovered active:bg-warning-pressed',
      },
      {
        appearance: 'filled',
        variant: 'danger',
        className:
          'bg-danger text-white hover:bg-danger-hovered active:bg-danger-pressed',
      },
      {
        appearance: 'filled',
        disabled: true,
        className:
          'hover:bg-disabled hover:text-disabled active:bg-disabled active:text-disabled disabled:bg-disabled disabled:text-disabled',
      },

      /* OUTLINE & DASHED */
      {
        appearance: ['outline', 'dashed'],
        variant: 'default',
        className: 'border-default',
      },
      {
        appearance: ['outline', 'dashed'],
        variant: 'primary',
        className: 'border-primary',
      },
      {
        appearance: ['outline', 'dashed'],
        variant: 'info',
        className: 'border-info',
      },
      {
        appearance: ['outline', 'dashed'],
        variant: 'success',
        className: 'border-success',
      },
      {
        appearance: ['outline', 'dashed'],
        variant: 'warning',
        className: 'border-warning',
      },
      {
        appearance: ['outline', 'dashed'],
        variant: 'danger',
        className: 'border-danger',
      },
      {
        appearance: ['outline', 'dashed'],
        disabled: true,
        className:
          'hover:bg-transparent active:bg-transparent hover:border-disabled hover:text-disabled active:border-disabled active:text-disabled disabled:border-disabled disabled:text-disabled',
      },

      /* GHOST BUTTON */
      {
        appearance: 'ghost',
        variant: 'default',
        className: 'text-default',
      },
      {
        appearance: 'ghost',
        variant: 'primary',
        className: 'text-primary',
      },
      {
        appearance: 'ghost',
        variant: 'info',
        className: 'text-info',
      },
      {
        appearance: 'ghost',
        variant: 'success',
        className: 'text-success',
      },
      {
        appearance: 'ghost',
        variant: 'warning',
        className: 'text-warning',
      },
      {
        appearance: 'ghost',
        variant: 'danger',
        className: 'text-danger',
      },
      {
        appearance: 'ghost',
        disabled: true,
        className:
          'hover:bg-transparent active:bg-transparent hover:text-disabled active:text-disabled disabled:text-disabled',
      },

      /* VARIANT LOADING */
      {
        appearance: ['filled', 'dashed', 'outline', 'ghost'],
        variant: 'default',
        loading: true,
        className:
          'bg-default-loading text-loading hover:bg-default-loading active:bg-default-loading',
      },
      {
        appearance: 'filled',
        variant: 'primary',
        loading: true,
        className:
          'bg-primary-loading text-white hover:bg-primary-loading active:bg-primary-loading',
      },
      {
        appearance: 'filled',
        variant: 'info',
        loading: true,
        className:
          'bg-info-loading text-white hover:bg-info-loading active:bg-info-loading',
      },
      {
        appearance: 'filled',
        variant: 'success',
        loading: true,
        className:
          'bg-success-loading text-white hover:bg-success-loading active:bg-success-loading',
      },
      {
        appearance: 'filled',
        variant: 'warning',
        loading: true,
        className:
          'bg-warning-loading text-white hover:bg-warning-loading active:bg-warning-loading',
      },
      {
        appearance: 'filled',
        variant: 'danger',
        loading: true,
        className:
          'bg-danger-loading text-white hover:bg-danger-loading active:bg-danger-loading',
      },
      {
        appearance: ['dashed', 'outline', 'ghost'],
        variant: ['default', 'primary', 'info', 'success', 'warning', 'danger'],
        loading: true,
        className:
          'bg-default-loading hover:bg-default-loading active:bg-default-loading',
      },
    ],
    defaultVariants: {},
  },
);

export const buttonSpinnerStyles = cva(
  'inline-block animate-spin rounded-full border-2 border-current border-t-transparent',
  {
    variants: {
      size: {
        sm: 'size-5',
        md: 'size-6',
        lg: 'size-7',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export const buttonIconStyle = cva('shrink-0', {
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
});
