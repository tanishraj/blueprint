import { cva } from 'class-variance-authority';

export const buttonStyles = cva(
  'relative inline-flex w-fit items-center justify-center cursor-pointer whitespace-nowrap border border-transparent font-medium outline-none transition-colors hover:bg-default-hovered active:bg-default-pressed focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base',
  {
    variants: {
      size: {
        sm: 'px-3 py-2 text-sm leading-none gap-2',
        md: 'px-4 py-2 text-base leading-none gap-2.5',
        lg: 'px-[18px] py-2 text-lg leading-none gap-3',
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
      shape: {
        rounded: 'rounded-full',
        squared: 'rounded',
      },
      disabled: {
        true: 'opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
      },
      loading: {
        true: '',
      },
      fullWidth: {
        true: 'w-full',
      },
      iconOnly: {
        true: '',
      },
      inverted: {
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
        variant: 'default',
        inverted: true,
        className:
          'bg-default-inverted text-default-inverted hover:bg-default-hovered-inverted active:bg-default-pressed-inverted',
      },
      {
        appearance: 'filled',
        variant: 'primary',
        inverted: true,
        className:
          'bg-primary-inverted text-white-inverted hover:bg-primary-hovered-inverted active:bg-primary-pressed-inverted',
      },
      {
        appearance: 'filled',
        variant: 'info',
        inverted: true,
        className:
          'bg-info-inverted text-white-inverted hover:bg-info-hovered-inverted active:bg-info-pressed-inverted',
      },
      {
        appearance: 'filled',
        variant: 'success',
        inverted: true,
        className:
          'bg-success-inverted text-white-inverted hover:bg-success-hovered-inverted active:bg-success-pressed-inverted',
      },
      {
        appearance: 'filled',
        variant: 'warning',
        inverted: true,
        className:
          'bg-warning-inverted text-white-inverted hover:bg-warning-hovered-inverted active:bg-warning-pressed-inverted',
      },
      {
        appearance: 'filled',
        variant: 'danger',
        inverted: true,
        className:
          'bg-danger-inverted text-white-inverted hover:bg-danger-hovered-inverted active:bg-danger-pressed-inverted',
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
        variant: 'default',
        inverted: true,
        className:
          'text-default-inverted hover:bg-default-hovered-inverted active:bg-default-pressed-inverted',
      },
      {
        appearance: ['outline', 'dashed'],
        variant: 'primary',
        inverted: true,
        className:
          'text-primary-inverted hover:bg-primary-hovered-inverted active:bg-primary-pressed-inverted hover:text-primary active:text-primary',
      },
      {
        appearance: ['outline', 'dashed'],
        variant: 'info',
        inverted: true,
        className:
          'text-info-inverted hover:bg-info-hovered-inverted active:bg-info-pressed-inverted hover:text-info active:text-info',
      },
      {
        appearance: ['outline', 'dashed'],
        variant: 'success',
        inverted: true,
        className:
          'text-success-inverted hover:bg-success-hovered-inverted active:bg-success-pressed-inverted hover:text-success active:text-success',
      },
      {
        appearance: ['outline', 'dashed'],
        variant: 'warning',
        inverted: true,
        className:
          'text-warning-inverted hover:bg-warning-hovered-inverted active:bg-warning-pressed-inverted hover:text-warning active:text-warning',
      },
      {
        appearance: ['outline', 'dashed'],
        variant: 'danger',
        inverted: true,
        className:
          'text-danger-inverted hover:bg-danger-hovered-inverted active:bg-danger-pressed-inverted hover:text-danger active:text-danger',
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
        variant: 'default',
        inverted: true,
        className:
          'text-default-inverted hover:bg-default-hovered-inverted active:bg-default-pressed-inverted',
      },
      {
        appearance: 'ghost',
        variant: 'primary',
        inverted: true,
        className:
          'text-primary-inverted hover:bg-primary-hovered-inverted active:bg-primary-pressed-inverted hover:text-primary active:text-primary',
      },
      {
        appearance: 'ghost',
        variant: 'info',
        inverted: true,
        className:
          'text-info-inverted hover:bg-info-hovered-inverted active:bg-info-pressed-inverted hover:text-info active:text-info',
      },
      {
        appearance: 'ghost',
        variant: 'success',
        inverted: true,
        className:
          'text-success-inverted hover:bg-success-hovered-inverted active:bg-success-pressed-inverted hover:text-success active:text-success',
      },
      {
        appearance: 'ghost',
        variant: 'warning',
        inverted: true,
        className:
          'text-warning-inverted hover:bg-warning-hovered-inverted active:bg-warning-pressed-inverted hover:text-warning active:text-warning',
      },
      {
        appearance: 'ghost',
        variant: 'danger',
        inverted: true,
        className:
          'text-danger-inverted hover:bg-danger-hovered-inverted active:bg-danger-pressed-inverted hover:text-danger active:text-danger',
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
      {
        appearance: ['filled', 'dashed', 'outline', 'ghost'],
        variant: 'default',
        loading: true,
        inverted: true,
        className:
          'bg-default-loading-inverted text-loading-inverted hover:bg-default-loading-inverted active:bg-default-loading-inverted',
      },
      {
        appearance: 'filled',
        variant: 'primary',
        loading: true,
        inverted: true,
        className:
          'bg-primary-loading-inverted text-white-inverted hover:bg-primary-loading-inverted active:bg-primary-loading-inverted',
      },
      {
        appearance: 'filled',
        variant: 'info',
        loading: true,
        inverted: true,
        className:
          'bg-info-loading-inverted text-white-inverted hover:bg-info-loading-inverted active:bg-info-loading-inverted',
      },
      {
        appearance: 'filled',
        variant: 'success',
        loading: true,
        inverted: true,
        className:
          'bg-success-loading-inverted text-white-inverted hover:bg-success-loading-inverted active:bg-success-loading-inverted',
      },
      {
        appearance: 'filled',
        variant: 'warning',
        loading: true,
        inverted: true,
        className:
          'bg-warning-loading-inverted text-white-inverted hover:bg-warning-loading-inverted active:bg-warning-loading-inverted',
      },
      {
        appearance: 'filled',
        variant: 'danger',
        loading: true,
        inverted: true,
        className:
          'bg-danger-loading-inverted text-white-inverted hover:bg-danger-loading-inverted active:bg-danger-loading-inverted',
      },
      {
        appearance: ['dashed', 'outline', 'ghost'],
        variant: ['default', 'primary', 'info', 'success', 'warning', 'danger'],
        loading: true,
        inverted: true,
        className:
          'bg-default-loading-inverted text-loading-inverted hover:bg-default-loading-inverted active:bg-default-loading-inverted',
      },
      {
        size: 'sm',
        iconOnly: true,
        className: 'size-8 p-0',
      },
      {
        size: 'md',
        iconOnly: true,
        className: 'size-10 p-0',
      },
      {
        size: 'lg',
        iconOnly: true,
        className: 'size-12 p-0',
      },
    ],
    defaultVariants: {
      size: 'md',
      variant: 'default',
      appearance: 'filled',
      shape: 'squared',
    },
  },
);

export const buttonContentStyles = cva(
  'inline-flex items-center justify-center',
  {
    variants: {
      size: {
        sm: 'gap-2',
        md: 'gap-2.5',
        lg: 'gap-3',
      },
      loading: {
        true: 'opacity-0',
        false: '',
      },
      iconOnly: {
        true: 'gap-0',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      loading: false,
      iconOnly: false,
    },
  },
);

export const buttonSpinnerOverlayStyles =
  'pointer-events-none absolute inset-0 flex items-center justify-center';

export const buttonSpinnerStyles = cva(
  'inline-block animate-spin rounded-full border-2 border-current border-t-transparent',
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
