import { cva } from 'class-variance-authority';

export const avatarGroupStyles = cva(
  'inline-flex items-center -space-x-[8px]',
  {
    variants: {
      size: {
        xs: '',
        sm: '',
        md: '',
        lg: '',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export const avatarGroupCounterStyles = cva(
  'inline-flex shrink-0 items-center justify-center border border-base bg-default-inverted text-white font-medium leading-none z-10',
  {
    variants: {
      variant: {
        default: 'bg-default-pressed',
        primary: 'bg-primary-pressed',
        info: 'bg-info-pressed',
        success: 'bg-success-pressed',
        warning: 'bg-warning-pressed',
        danger: 'bg-danger-pressed',
      },
      size: {
        xs: 'size-4 text-xs',
        sm: 'size-6 text-xs',
        md: 'size-9 text-sm',
        lg: 'size-10 text-base',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      shape: 'circle',
    },
    compoundVariants: [],
  },
);
