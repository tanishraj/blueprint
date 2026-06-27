import { cva } from 'class-variance-authority';

export const sliderRootStyles = cva('inline-flex flex-col gap-2', {
  variants: {
    fullWidth: {
      true: 'w-full',
      false: 'w-[min(26rem,100%)]',
    },
  },
  defaultVariants: {
    fullWidth: true,
  },
});

export const sliderHeaderStyles = cva(
  'flex w-full items-center justify-start text-left',
);

export const sliderLabelStyles = cva(
  'block text-left font-medium text-default',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-sm',
      },
      disabled: {
        true: 'text-disabled',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      disabled: false,
    },
  },
);

export const sliderTrackWrapStyles = cva('relative w-full py-2');

export const sliderTrackStyles = cva(
  'relative h-2 w-full rounded-full bg-default-hovered',
  {
    variants: {
      size: {
        sm: 'h-1.5',
        md: 'h-2',
        lg: 'h-2',
      },
      disabled: {
        true: 'bg-disabled',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      disabled: false,
    },
  },
);

export const sliderActiveTrackStyles = cva(
  'absolute top-0 rounded-full bg-primary',
  {
    variants: {
      size: {
        sm: 'h-1.5',
        md: 'h-2',
        lg: 'h-2',
      },
      disabled: {
        true: 'bg-disabled',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      disabled: false,
    },
  },
);

export const sliderThumbButtonStyles = cva(
  'absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full outline-none',
  {
    variants: {
      size: {
        sm: 'size-4',
        md: 'size-[18px]',
        lg: 'size-5',
      },
      active: {
        true: 'z-30',
        false: 'z-20',
      },
    },
    defaultVariants: {
      size: 'md',
      active: false,
    },
  },
);

export const sliderThumbStyles = cva(
  'border-0 bg-primary shadow-none transition-transform duration-150 ease-out active:scale-105 focus-visible:shadow-[0_0_0_2px_var(--base-white),0_0_0_4px_var(--primary-800)]',
  {
    variants: {
      size: {
        sm: '',
        md: '',
        lg: '',
      },
      disabled: {
        true: 'cursor-not-allowed bg-disabled',
        false: 'cursor-pointer',
      },
    },
    defaultVariants: {
      size: 'md',
      disabled: false,
    },
  },
);

export const sliderValuesRowStyles = cva('relative min-h-5 w-full');

export const sliderValueStyles = cva(
  'absolute -translate-x-1/2 text-center font-medium tabular-nums text-caption',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-sm',
      },
      disabled: {
        true: 'text-disabled',
        false: '',
      },
      anchor: {
        start: 'left-0 translate-x-0',
        center: '',
        end: 'right-0 translate-x-0',
      },
    },
    defaultVariants: {
      anchor: 'center',
      disabled: false,
      size: 'md',
    },
  },
);

export const sliderCaptionStyles = cva('text-caption', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-xs',
      lg: 'text-sm',
    },
    disabled: {
      true: 'text-disabled',
      false: '',
    },
    invalid: {
      true: 'text-danger',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    disabled: false,
    invalid: false,
  },
});
