import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex items-center justify-center border border-1 border-base overflow-hidden relative font-medium whitespace-nowrap',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white',
        default: 'bg-default text-default',
        info: 'bg-info text-white',
        success: 'bg-success text-white',
        warning: 'bg-warning text-white',
        danger: 'bg-danger text-white',
      },
      appearance: {
        dots: '',
        icon: '',
        text: '',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-lg',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded',
      },
      inverted: {
        true: '',
        false: '',
      },
      hasIcon: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      appearance: 'text',
      size: 'md',
      shape: 'circle',
      inverted: false,
      hasIcon: false,
    },
    compoundVariants: [
      { appearance: 'dots', size: 'sm', className: 'size-2' },
      { appearance: 'dots', size: 'md', className: 'size-3' },
      { appearance: 'dots', size: 'lg', className: 'size-4' },
      { appearance: 'icon', size: 'sm', className: 'size-5.5 p-0' },
      {
        appearance: 'icon',
        size: 'md',
        className: 'size-8 p-0',
      },
      {
        appearance: 'icon',
        size: 'lg',
        className: 'size-10 p-0',
      },

      {
        appearance: 'text',
        size: 'sm',
        className: 'h-6 min-h-6 min-w-6 px-1',
      },
      {
        appearance: 'text',
        size: 'md',
        className: 'h-7 min-h-7 min-w-7 px-1.5',
      },
      {
        appearance: 'text',
        size: 'lg',
        className: 'h-8 min-h-8 min-w-8 px-2.5',
      },

      { appearance: 'text', hasIcon: true, size: 'sm', className: 'gap-1' },
      { appearance: 'text', hasIcon: true, size: 'md', className: 'gap-2' },
      { appearance: 'text', hasIcon: true, size: 'lg', className: 'gap-3' },

      {
        inverted: true,
        variant: 'default',
        className: 'bg-default-inverted text-white',
      },
      {
        inverted: true,
        variant: 'info',
        className: 'bg-info-inverted text-default',
      },
      {
        inverted: true,
        variant: 'success',
        className: 'bg-success-inverted text-default',
      },
      {
        inverted: true,
        variant: 'warning',
        className: 'bg-warning-inverted text-default',
      },
      {
        inverted: true,
        variant: 'danger',
        className: 'bg-danger-inverted text-default',
      },
      {
        inverted: true,
        variant: 'primary',
        className: 'bg-primary-inverted text-white',
      },
    ],
  },
);

export const badgeIconStyles = cva('shrink-0', {
  variants: {
    size: {
      sm: 'size-3.5',
      md: 'size-5',
      lg: 'size-7',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const badgeTextStyles = cva('leading-none font-medium', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
