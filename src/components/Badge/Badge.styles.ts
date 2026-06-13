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
        /* Backward-compatible alias for legacy usage */
        dot: '',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-lg',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded',
        /* Backward-compatible aliases */
        rounded: 'rounded',
        'full rounded': 'rounded-full',
      },
      inverted: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      appearance: 'dots',
      size: 'md',
      shape: 'circle',
      inverted: false,
    },
    compoundVariants: [
      { appearance: 'dots', size: 'sm', className: 'size-2 min-h-2 min-w-2' },
      { appearance: 'dots', size: 'md', className: 'size-3 min-h-3 min-w-3' },
      { appearance: 'dots', size: 'lg', className: 'size-4 min-h-4 min-w-4' },
      { appearance: 'dot', size: 'sm', className: 'size-2 min-h-2 min-w-2' },
      { appearance: 'dot', size: 'md', className: 'size-3 min-h-3 min-w-3' },
      { appearance: 'dot', size: 'lg', className: 'size-4 min-h-4 min-w-4' },

      { appearance: 'icon', size: 'sm', className: 'size-[22px] p-0' },
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
