import { cva } from 'class-variance-authority';

export const alertWrapperStyles = cva(
  'flex flex-row gap-2.5 rounded-md border border-transparent bg-default p-3 text-default',
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
        info: 'bg-info text-white',
        success: 'bg-success text-white',
        warning: 'bg-warning text-white',
        danger: 'bg-danger text-white',
      },
      size: { sm: 'p-3 gap-2.5', md: 'p-3.5 gap-3', lg: 'p-4 gap-3.5' },
      inverted: {
        true: 'bg-default-inverted text-default-inverted',
      },
    },
    compoundVariants: [
      {
        appearance: ['dashed', 'outline'],
        variant: ['default'],
        className: 'border-default bg-base',
      },
      {
        appearance: ['dashed', 'outline'],
        variant: ['primary'],
        className: 'border-primary bg-base',
      },
      {
        appearance: ['dashed', 'outline'],
        variant: ['info'],
        className: 'border-info bg-base',
      },
      {
        appearance: ['dashed', 'outline'],
        variant: ['success'],
        className: 'border-success bg-base',
      },
      {
        appearance: ['dashed', 'outline'],
        variant: ['warning'],
        className: 'border-warning bg-base',
      },
      {
        appearance: ['dashed', 'outline'],
        variant: ['danger'],
        className: 'border-danger bg-base',
      },

      /* FILLED INVERTED */
      {
        appearance: ['filled'],
        variant: ['default'],
        inverted: true,
        className: 'bg-default-inverted text-default-inverted',
      },
      {
        appearance: ['filled'],
        variant: ['primary'],
        inverted: true,
        className: 'bg-primary-inverted text-default',
      },
      {
        appearance: ['filled'],
        variant: ['info'],
        inverted: true,
        className: 'bg-info-inverted text-default',
      },
      {
        appearance: ['filled'],
        variant: ['success'],
        inverted: true,
        className: 'bg-success-inverted text-default',
      },
      {
        appearance: ['filled'],
        variant: ['warning'],
        inverted: true,
        className: 'bg-warning-inverted text-default',
      },
      {
        appearance: ['filled'],
        variant: ['danger'],
        inverted: true,
        className: 'bg-danger-inverted text-default',
      },
    ],
    defaultVariants: {
      variant: 'default',
      appearance: 'filled',
      size: 'md',
    },
  },
);

export const alertContentWrapperStyles = cva('flex flex-1 flex-col gap-2', {
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
    size: { sm: 'gap-2', md: 'gap-2.5', lg: 'gap-3' },
  },
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
    inverted: {
      true: '',
    },
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

export const alertDescriptionStyles = cva('leading-relaxed', {
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
    inverted: {
      true: 'text-default-inverted',
    },
  },
  compoundVariants: [
    {
      appearance: ['outline', 'dashed'],
      variant: ['default', 'primary', 'info', 'success', 'warning', 'danger'],
      className: 'text-default',
    },
    {
      appearance: ['filled', 'outline', 'dashed'],
      variant: ['primary', 'info', 'success', 'warning', 'danger'],
      inverted: true,
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
    inverted: {
      true: '',
    },
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

    /* FILLED INVERTED */
    {
      appearance: ['filled'],
      variant: ['default'],
      inverted: true,
      className: 'text-default-inverted',
    },
    {
      appearance: ['filled'],
      variant: ['primary'],
      inverted: true,
      className: 'text-primary',
    },
    {
      appearance: ['filled'],
      variant: ['info'],
      inverted: true,
      className: 'text-info',
    },
    {
      appearance: ['filled'],
      variant: ['success'],
      inverted: true,
      className: 'text-success',
    },
    {
      appearance: ['filled'],
      variant: ['warning'],
      inverted: true,
      className: 'text-warning',
    },
    {
      appearance: ['filled'],
      variant: ['danger'],
      inverted: true,
      className: 'text-danger',
    },
  ],
  defaultVariants: {
    size: 'md',
  },
});

export const alertCloseButtonStyles = cva(
  'inline-flex shrink-0 items-start justify-center rounded outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base',
  {
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
      inverted: {
        true: 'text-default',
      },
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
      /* FILLED INVERTED */
      {
        appearance: ['filled'],
        variant: ['default'],
        inverted: true,
        className: 'text-default-inverted',
      },
      {
        appearance: ['outline', 'dashed'],
        variant: ['primary', 'info', 'success', 'warning', 'danger'],
        inverted: true,
        className: 'text-default',
      },
    ],
    defaultVariants: {
      size: 'md',
    },
  },
);
