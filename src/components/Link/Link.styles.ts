import { cva } from 'class-variance-authority';

export const linkStyles = cva(
  'inline-flex w-fit max-w-full items-center font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base',
  {
    variants: {
      variant: {
        default: 'text-default hover:text-gray-700 active:text-gray-950',
        primary:
          'text-primary hover:text-primary-hovered active:text-primary-pressed',
        info: 'text-info hover:text-info-hovered active:text-info-pressed',
        success:
          'text-success hover:text-success-hovered active:text-success-pressed',
        warning:
          'text-warning hover:text-warning-hovered active:text-warning-pressed',
        danger:
          'text-danger hover:text-danger-hovered active:text-danger-pressed',
      },
      size: {
        sm: 'gap-1.5 text-sm',
        md: 'gap-2 text-base',
        lg: 'gap-2.5 text-lg',
      },
      underline: {
        none: 'no-underline',
        hover: 'no-underline hover:underline',
        always: 'underline',
      },
      disabled: {
        true: 'pointer-events-none cursor-not-allowed text-gray-500 opacity-60 hover:text-gray-500 active:text-gray-500',
        false: 'cursor-pointer',
      },
      inverted: {
        true: '',
        false: '',
      },
      truncate: {
        true: 'min-w-0',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        inverted: true,
        disabled: false,
        className:
          'text-default-inverted hover:text-default-hovered-inverted active:text-default-pressed-inverted',
      },
      {
        variant: 'primary',
        inverted: true,
        disabled: false,
        className:
          'text-primary-inverted hover:text-primary-hovered-inverted active:text-primary-pressed-inverted',
      },
      {
        variant: 'info',
        inverted: true,
        disabled: false,
        className:
          'text-info-inverted hover:text-info-hovered-inverted active:text-info-pressed-inverted',
      },
      {
        variant: 'success',
        inverted: true,
        disabled: false,
        className:
          'text-success-inverted hover:text-success-hovered-inverted active:text-success-pressed-inverted',
      },
      {
        variant: 'warning',
        inverted: true,
        disabled: false,
        className:
          'text-warning-inverted hover:text-warning-hovered-inverted active:text-warning-pressed-inverted',
      },
      {
        variant: 'danger',
        inverted: true,
        disabled: false,
        className:
          'text-danger-inverted hover:text-danger-hovered-inverted active:text-danger-pressed-inverted',
      },
      {
        inverted: true,
        disabled: true,
        className:
          'text-gray-400 hover:text-gray-400 active:text-gray-400 opacity-70',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      underline: 'hover',
      disabled: false,
      inverted: false,
      truncate: false,
    },
  },
);

export const linkIconStyles = cva('shrink-0', {
  variants: {
    size: {
      sm: 'size-3.5',
      md: 'size-4',
      lg: 'size-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const linkLabelStyles = cva('', {
  variants: {
    truncate: {
      true: 'min-w-0 truncate',
      false: '',
    },
  },
  defaultVariants: {
    truncate: false,
  },
});
