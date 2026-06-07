import { cva } from 'class-variance-authority';

export const buttonStyles = cva(
  'text-sm p-2 rounded border outline-none border-transparent hover:bg-default-hovered active:bg-default-pressed',
  {
    variants: {
      size: {
        sm: 'p-2 text-sm',
        md: 'px-3 py-2 text-base',
        lg: 'px-3.5 py-2 text-lg',
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
    ],
    defaultVariants: {},
  },
);
