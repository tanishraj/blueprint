import { cva } from 'class-variance-authority';

export const avatarContainerStyles = cva(
  'relative inline-flex shrink-0 items-center justify-center font-medium',
  {
    variants: {
      size: {
        xs: 'size-4',
        sm: 'size-6',
        md: 'size-9',
        lg: 'size-10',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded',
      },
      inverted: {
        true: 'bg-default-inverted text-white',
        false: 'bg-default text-default',
      },
      stroke: {
        true: 'border border-base',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      shape: 'circle',
      inverted: false,
      stroke: false,
    },
    compoundVariants: [],
  },
);

export const avatarImageStyles = cva(
  'absolute inset-0 size-full object-cover',
  {
    variants: {
      shape: {
        circle: 'rounded-full',
        square: 'rounded',
      },
      size: {
        xs: '',
        sm: '',
        md: '',
        lg: '',
      },
    },
    defaultVariants: {
      shape: 'circle',
      size: 'md',
    },
  },
);

export const avatarTextStyles = cva('relative leading-none font-semibold', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const avatarIconStyles = cva('relative shrink-0', {
  variants: {
    size: {
      xs: 'size-2',
      sm: 'size-3',
      md: 'size-4',
      lg: 'size-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const avatarStatusStyles = cva(
  'absolute z-10 rounded-full border border-white',
  {
    variants: {
      status: {
        info: 'bg-info',
        success: 'bg-success',
        warning: 'bg-warning',
        danger: 'bg-danger',
        primary: 'bg-primary',
      },
      shape: {
        circle: '',
        square: '',
      },
      position: {
        'top-right': '',
        'top-left': '',
        'bottom-right': '',
        'bottom-left': '',
      },
      size: {
        xs: 'size-1.5',
        sm: 'size-1.5',
        md: 'size-2',
        lg: 'size-2.5',
      },
    },
    compoundVariants: [
      {
        shape: 'square',
        position: 'top-right',
        className: 'right-0 top-0 translate-x-[2px] -translate-y-[2px]',
      },
      {
        shape: 'square',
        position: 'top-left',
        className: 'left-0 top-0 -translate-x-[2px] -translate-y-[2px]',
      },
      {
        shape: 'square',
        position: 'bottom-right',
        className: 'right-0 bottom-0 translate-x-[2px] translate-y-[2px]',
      },
      {
        shape: 'square',
        position: 'bottom-left',
        className: 'left-0 bottom-0 -translate-x-[2px] translate-y-[2px]',
      },
      {
        shape: 'circle',
        position: 'top-right',
        className: 'right-0.5 top-0.5',
      },
      {
        shape: 'circle',
        position: 'top-left',
        className: 'left-0.5 top-0.5',
      },
      {
        shape: 'circle',
        position: 'bottom-right',
        className: 'right-0.5 bottom-0.5',
      },
      {
        shape: 'circle',
        position: 'bottom-left',
        className: 'left-0.5 bottom-0.5',
      },
    ],
    defaultVariants: {
      status: 'primary',
      position: 'top-right',
      shape: 'circle',
      size: 'md',
    },
  },
);
