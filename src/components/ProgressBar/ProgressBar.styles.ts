import { cva } from 'class-variance-authority';

export const progressBarRootStyles = cva('inline-flex flex-col gap-1', {
  variants: {
    appearance: {
      linear: 'w-64',
      circular: 'w-fit items-center',
    },
    fullWidth: {
      true: 'w-full',
      false: '',
    },
  },
  compoundVariants: [
    {
      appearance: 'circular',
      fullWidth: true,
      className: 'w-full items-center',
    },
  ],
  defaultVariants: {
    appearance: 'linear',
    fullWidth: false,
  },
});

export const progressBarMetaStyles = cva(
  'flex items-center justify-between gap-3 font-medium',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-xs',
        lg: 'text-sm',
      },
      inverted: {
        true: 'text-default-inverted',
        false: 'text-default',
      },
    },
    defaultVariants: {
      size: 'md',
      inverted: false,
    },
  },
);

export const progressBarLabelStyles = cva('min-w-0 truncate');

export const progressBarValueStyles = cva('shrink-0 tabular-nums', {
  variants: {
    variant: {
      default: '',
      primary: '',
      info: '',
      success: '',
      warning: '',
      danger: '',
    },
    inverted: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    { variant: 'default', inverted: false, className: 'text-default' },
    { variant: 'primary', inverted: false, className: 'text-primary' },
    { variant: 'info', inverted: false, className: 'text-info' },
    { variant: 'success', inverted: false, className: 'text-success' },
    { variant: 'warning', inverted: false, className: 'text-warning' },
    { variant: 'danger', inverted: false, className: 'text-danger' },
    { variant: 'default', inverted: true, className: 'text-default-inverted' },
    { variant: 'primary', inverted: true, className: 'text-primary-inverted' },
    { variant: 'info', inverted: true, className: 'text-info-inverted' },
    { variant: 'success', inverted: true, className: 'text-success-inverted' },
    { variant: 'warning', inverted: true, className: 'text-warning-inverted' },
    { variant: 'danger', inverted: true, className: 'text-danger-inverted' },
  ],
  defaultVariants: {
    variant: 'primary',
    inverted: false,
  },
});

export const progressBarTrackStyles = cva(
  'relative overflow-hidden rounded-full',
  {
    variants: {
      size: {
        sm: 'h-1',
        md: 'h-1.5',
        lg: 'h-2',
      },
      inverted: {
        true: 'bg-default-hovered-inverted',
        false: 'bg-default-hovered',
      },
    },
    defaultVariants: {
      size: 'md',
      inverted: false,
    },
  },
);

export const progressBarIndicatorStyles = cva(
  'block h-full rounded-full transition-[width] duration-300 ease-out',
  {
    variants: {
      variant: {
        default: 'bg-default-inverted',
        primary: 'bg-primary',
        info: 'bg-info',
        success: 'bg-success',
        warning: 'bg-warning',
        danger: 'bg-danger',
      },
      inverted: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      { variant: 'default', inverted: true, className: 'bg-default-inverted' },
      { variant: 'primary', inverted: true, className: 'bg-primary-inverted' },
      { variant: 'info', inverted: true, className: 'bg-info-inverted' },
      { variant: 'success', inverted: true, className: 'bg-success-inverted' },
      { variant: 'warning', inverted: true, className: 'bg-warning-inverted' },
      { variant: 'danger', inverted: true, className: 'bg-danger-inverted' },
    ],
    defaultVariants: {
      variant: 'primary',
      inverted: false,
    },
  },
);

export const progressBarDotStyles = cva(
  'absolute top-1/2 rounded-full border-2 transition-[left] duration-300 ease-out',
  {
    variants: {
      size: {
        sm: 'size-2 -translate-x-1/2 -translate-y-1/2',
        md: 'size-2.5 -translate-x-1/2 -translate-y-1/2',
        lg: 'size-3 -translate-x-1/2 -translate-y-1/2',
      },
      variant: {
        default: 'bg-default-inverted',
        primary: 'bg-primary',
        info: 'bg-info',
        success: 'bg-success',
        warning: 'bg-warning',
        danger: 'bg-danger',
      },
      inverted: {
        true: 'border-default-inverted',
        false: 'border-base',
      },
    },
    compoundVariants: [
      { variant: 'default', inverted: true, className: 'bg-default-inverted' },
      { variant: 'primary', inverted: true, className: 'bg-primary-inverted' },
      { variant: 'info', inverted: true, className: 'bg-info-inverted' },
      { variant: 'success', inverted: true, className: 'bg-success-inverted' },
      { variant: 'warning', inverted: true, className: 'bg-warning-inverted' },
      { variant: 'danger', inverted: true, className: 'bg-danger-inverted' },
    ],
    defaultVariants: {
      size: 'md',
      variant: 'primary',
      inverted: false,
    },
  },
);

export const progressBarCaptionStyles = cva('', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-xs',
      lg: 'text-sm',
    },
    inverted: {
      true: 'text-caption-inverted',
      false: 'text-caption',
    },
  },
  defaultVariants: {
    size: 'md',
    inverted: false,
  },
});

export const progressBarCircleWrapStyles = cva(
  'relative inline-flex items-center justify-center',
  {
    variants: {
      size: {
        sm: 'size-[72px]',
        md: 'size-[88px]',
        lg: 'size-[104px]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export const progressBarCircleSvgStyles = cva('block -rotate-90');

export const progressBarCircleTrackStyles = cva('', {
  variants: {
    inverted: {
      true: '[stroke:var(--background-color-default-hovered-inverted)]',
      false: '[stroke:var(--background-color-default-hovered)]',
    },
  },
  defaultVariants: {
    inverted: false,
  },
});

export const progressBarCircleIndicatorStyles = cva(
  'transition-[stroke-dashoffset] duration-300 ease-out',
  {
    variants: {
      variant: {
        default: '[stroke:var(--background-color-default-inverted)]',
        primary: '[stroke:var(--background-color-primary)]',
        info: '[stroke:var(--background-color-info)]',
        success: '[stroke:var(--background-color-success)]',
        warning: '[stroke:var(--background-color-warning)]',
        danger: '[stroke:var(--background-color-danger)]',
      },
      inverted: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        inverted: true,
        className: '[stroke:var(--background-color-default-inverted)]',
      },
      {
        variant: 'primary',
        inverted: true,
        className: '[stroke:var(--background-color-primary-inverted)]',
      },
      {
        variant: 'info',
        inverted: true,
        className: '[stroke:var(--background-color-info-inverted)]',
      },
      {
        variant: 'success',
        inverted: true,
        className: '[stroke:var(--background-color-success-inverted)]',
      },
      {
        variant: 'warning',
        inverted: true,
        className: '[stroke:var(--background-color-warning-inverted)]',
      },
      {
        variant: 'danger',
        inverted: true,
        className: '[stroke:var(--background-color-danger-inverted)]',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      inverted: false,
    },
  },
);

export const progressBarCircleValueStyles = cva(
  'absolute inset-0 flex items-center justify-center font-semibold tabular-nums',
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
      inverted: {
        true: 'text-default-inverted',
        false: 'text-default',
      },
    },
    defaultVariants: {
      size: 'md',
      inverted: false,
    },
  },
);
