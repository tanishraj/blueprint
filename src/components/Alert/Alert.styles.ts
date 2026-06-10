import { cva } from 'class-variance-authority';

export const alertWrapperStyles = cva(
  'flex flex-row bg-default text-default p-3 gap-2.5 rounded-md border border-transparent',
  {
    variants: {
      appearance: {
        filled: 'bg-default',
        outline: 'border-default',
        dashed: 'border-dashed border-default',
      },
      variant: {
        default: 'bg-default text-default',
        primary: 'bg-primary text-white',
        info: ' bg-info text-white',
        success: 'bg-success text-white',
        warning: 'bg-warning text-white',
        danger: 'bg-danger text-white',
      },
      size: { sm: 'p-3 gap-2.5', md: 'p-3.5 gap-3', lg: 'p-4 gap-3.5' },
    },
    compoundVariants: [
      {
        appearance: ['dashed', 'outline'],
        variant: ['default'],
        className: 'border-default bg-white',
      },
      {
        appearance: ['dashed', 'outline'],
        variant: ['primary'],
        className: 'border-primary bg-white',
      },
      {
        appearance: ['dashed', 'outline'],
        variant: ['info'],
        className: 'border-info bg-white',
      },
      {
        appearance: ['dashed', 'outline'],
        variant: ['success'],
        className: 'border-success bg-white',
      },
      {
        appearance: ['dashed', 'outline'],
        variant: ['warning'],
        className: 'border-warning bg-white',
      },
      {
        appearance: ['dashed', 'outline'],
        variant: ['danger'],
        className: 'border-danger bg-white',
      },
    ],
    defaultVariants: {
      variant: 'default',
      appearance: 'filled',
      size: 'md',
    },
  },
);

export const alertContentWrapperStyles = cva('flex flex-col gap-2', {
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
      outline: '',
      dashed: '',
    },
    size: { sm: 'gap-2', md: 'gap2.5', lg: 'gap-3' },
  },
  compoundVariants: [{}],
  defaultVariants: {
    size: 'md',
  },
});

export const alertTitleStyles = cva('font-semibold', {
  variants: {
    appearance: {
      filled: '',
      outline: '',
      dashed: '',
    },
    variant: {
      default: '',
      primary: '',
      info: '',
      success: '',
      warning: '',
      danger: '',
    },
    size: { sm: 'text-sm', md: 'text-base', lg: 'text-lg' },
  },
  compoundVariants: [
    {
      appearance: ['outline', 'dashed'],
      variant: 'default',
      className: 'text-default',
    },
    {
      appearance: ['outline', 'dashed'],
      variant: 'primary',
      className: 'text-primary',
    },
    {
      appearance: ['outline', 'dashed'],
      variant: 'info',
      className: 'text-info',
    },
    {
      appearance: ['outline', 'dashed'],
      variant: 'success',
      className: 'text-success',
    },
    {
      appearance: ['outline', 'dashed'],
      variant: 'warning',
      className: 'text-warning',
    },
    {
      appearance: ['outline', 'dashed'],
      variant: 'danger',
      className: 'text-danger',
    },
  ],
  defaultVariants: {
    size: 'md',
  },
});

export const alertDescriptionStyles = cva('', {
  variants: {
    appearance: {
      filled: 'text-white',
      outline: '',
      dashed: '',
    },
    variant: {
      default: 'text-default',
      primary: '',
      info: '',
      success: '',
      warning: '',
      danger: '',
    },
    size: { sm: 'text-xs', md: 'text-sm', lg: 'text-base' },
  },
  compoundVariants: [
    {
      appearance: ['outline', 'dashed'],
      variant: ['default', 'primary', 'info', 'success', 'warning', 'danger'],
      className: 'text-default',
    },
  ],
  defaultVariants: {
    size: 'md',
  },
});

export const alertIconStyles = cva('stroke-2', {
  variants: {
    appearance: {
      filled: '',
      outline: '',
      dashed: '',
    },
    variant: {
      default: '',
      primary: '',
      info: '',
      success: '',
      warning: '',
      danger: '',
    },
    size: { sm: 'size-5 pt-0.12', md: 'size-6 pt-0.25', lg: 'size-7 pt-0.5' },
  },
  compoundVariants: [
    {
      appearance: ['outline', 'dashed'],
      variant: 'default',
      className: 'text-default',
    },
    {
      appearance: ['outline', 'dashed'],
      variant: 'primary',
      className: 'text-primary',
    },
    {
      appearance: ['outline', 'dashed'],
      variant: 'info',
      className: 'text-info',
    },
    {
      appearance: ['outline', 'dashed'],
      variant: 'success',
      className: 'text-success',
    },
    {
      appearance: ['outline', 'dashed'],
      variant: 'warning',
      className: 'text-warning',
    },
    {
      appearance: ['outline', 'dashed'],
      variant: 'danger',
      className: 'text-danger',
    },
  ],
  defaultVariants: {
    size: 'md',
  },
});

export const alertCloseButtonStyles = cva('shrink-0 cursor-pointer', {
  variants: {
    appearance: {
      filled: 'text-white',
      outline: '',
      dashed: '',
    },
    variant: {
      default: 'text-default',
      primary: '',
      info: '',
      success: '',
      warning: '',
      danger: '',
    },
    size: { sm: 'size-5', md: 'size-6', lg: 'size-7' },
  },
  defaultVariants: {
    size: 'md',
  },
});
