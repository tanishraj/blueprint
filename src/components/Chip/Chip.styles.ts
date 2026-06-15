import { cva } from 'class-variance-authority';

export const chipStyles = cva(
  'inline-flex w-fit max-w-full items-center justify-center border font-medium outline-none transition-colors',
  {
    variants: {
      variant: {
        default: '',
        primary: '',
        info: '',
        success: '',
        warning: '',
        danger: '',
      },
      appearance: {
        filled: '',
        outline: 'bg-base',
      },
      size: {
        sm: 'h-6 min-h-6 gap-1.5 px-2 text-xs',
        md: 'h-7 min-h-7 gap-2 px-2.5 text-sm',
        lg: 'h-8 min-h-8 gap-2.5 px-3 text-base',
      },
      shape: {
        square: 'rounded',
        circle: 'rounded-full',
      },
      disabled: {
        true: 'pointer-events-none cursor-not-allowed opacity-40',
        false: '',
      },
      hasLeadingVisual: {
        true: '',
        false: '',
      },
      removable: {
        true: '',
        false: '',
      },
      inverted: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        appearance: 'filled',
        variant: 'default',
        className: 'border-default bg-default text-default',
      },
      {
        appearance: 'filled',
        variant: 'primary',
        className: 'border-primary bg-primary text-white',
      },
      {
        appearance: 'filled',
        variant: 'info',
        className: 'border-info bg-info text-white',
      },
      {
        appearance: 'filled',
        variant: 'success',
        className: 'border-success bg-success text-white',
      },
      {
        appearance: 'filled',
        variant: 'warning',
        className: 'border-warning bg-warning text-white',
      },
      {
        appearance: 'filled',
        variant: 'danger',
        className: 'border-danger bg-danger text-white',
      },
      {
        appearance: 'outline',
        variant: 'default',
        className: 'border-default text-default',
      },
      {
        appearance: 'outline',
        variant: 'primary',
        className: 'border-primary text-primary',
      },
      {
        appearance: 'outline',
        variant: 'info',
        className: 'border-info text-info',
      },
      {
        appearance: 'outline',
        variant: 'success',
        className: 'border-success text-success',
      },
      {
        appearance: 'outline',
        variant: 'warning',
        className: 'border-warning text-warning',
      },
      {
        appearance: 'outline',
        variant: 'danger',
        className: 'border-danger text-danger',
      },
      {
        appearance: 'filled',
        variant: 'default',
        inverted: true,
        className:
          'border-default-inverted bg-default-inverted text-default-inverted',
      },
      {
        appearance: 'filled',
        variant: 'primary',
        inverted: true,
        className:
          'border-primary-inverted bg-primary-inverted text-white-inverted',
      },
      {
        appearance: 'filled',
        variant: 'info',
        inverted: true,
        className: 'border-info-inverted bg-info-inverted text-white-inverted',
      },
      {
        appearance: 'filled',
        variant: 'success',
        inverted: true,
        className:
          'border-success-inverted bg-success-inverted text-white-inverted',
      },
      {
        appearance: 'filled',
        variant: 'warning',
        inverted: true,
        className:
          'border-warning-inverted bg-warning-inverted text-white-inverted',
      },
      {
        appearance: 'filled',
        variant: 'danger',
        inverted: true,
        className:
          'border-danger-inverted bg-danger-inverted text-white-inverted',
      },
      {
        appearance: 'outline',
        variant: 'default',
        inverted: true,
        className: 'border-default-inverted text-default-inverted',
      },
      {
        appearance: 'outline',
        variant: 'primary',
        inverted: true,
        className: 'border-primary-inverted text-primary-inverted',
      },
      {
        appearance: 'outline',
        variant: 'info',
        inverted: true,
        className: 'border-info-inverted text-info-inverted',
      },
      {
        appearance: 'outline',
        variant: 'success',
        inverted: true,
        className: 'border-success-inverted text-success-inverted',
      },
      {
        appearance: 'outline',
        variant: 'warning',
        inverted: true,
        className: 'border-warning-inverted text-warning-inverted',
      },
      {
        appearance: 'outline',
        variant: 'danger',
        inverted: true,
        className: 'border-danger-inverted text-danger-inverted',
      },
      {
        hasLeadingVisual: true,
        size: 'sm',
        className: 'pl-1',
      },
      {
        hasLeadingVisual: true,
        size: 'md',
        className: 'pl-1',
      },
      {
        hasLeadingVisual: true,
        size: 'lg',
        className: 'pl-1.5',
      },
      {
        removable: true,
        size: 'sm',
        className: 'pr-1',
      },
      {
        removable: true,
        size: 'md',
        className: 'pr-1',
      },
      {
        removable: true,
        size: 'lg',
        className: 'pr-1.5',
      },
    ],
    defaultVariants: {
      variant: 'default',
      appearance: 'filled',
      size: 'md',
      shape: 'circle',
      disabled: false,
      hasLeadingVisual: false,
      removable: false,
      inverted: false,
    },
  },
);

export const chipLabelStyles = cva('min-w-0 truncate leading-none');

export const chipAvatarStyles = cva('', {
  variants: {
    size: {
      sm: 'size-4 [&_svg]:size-3',
      md: 'size-5 [&_svg]:size-3.5',
      lg: 'size-6 [&_svg]:size-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const chipCloseButtonStyles = cva(
  'inline-flex shrink-0 items-center justify-center rounded-full outline-none transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/80',
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

export const chipCloseIconStyles = cva('shrink-0', {
  variants: {
    size: {
      sm: 'size-3',
      md: 'size-3.5',
      lg: 'size-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
