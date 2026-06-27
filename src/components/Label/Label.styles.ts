import { cva } from 'class-variance-authority';

import type { LabelPosition, LabelSize, LabelVariant } from './types';

export const labelVariants: Record<LabelVariant, string> = {
  primary: 'text-caption',
  secondary: 'text-default',
  tertiary: 'text-caption',
};

export const labelWrapperVariants: Record<LabelVariant, string> = {
  primary: '',
  secondary: '',
  tertiary: '',
};

export const labelSize: Record<LabelSize, string> = {
  lg: 'text-sm leading-5',
  md: 'text-sm leading-5',
  sm: 'text-xs leading-4',
};

export const labelPosition: Record<LabelPosition, string> = {
  top: 'inline-flex flex-col gap-1',
  bottom: 'inline-flex flex-col gap-1',
  right: 'inline-flex items-center gap-2',
  left: 'inline-flex items-center gap-2',
};

export const labelAdornmentStyles = cva('inline-flex shrink-0 items-center');

export const labelRequiredStyles = cva('ml-0.5 text-danger');

export const labelStyles = cva('block', {
  variants: {
    variant: labelWrapperVariants,
    position: labelPosition,
    disabled: {
      true: 'opacity-40',
      false: '',
    },
  },
  defaultVariants: {
    position: 'top',
    disabled: false,
  },
});

export const labelTextStyles = cva('flex items-center gap-1 leading-none', {
  variants: {
    variant: labelVariants,
    size: labelSize,
  },
  defaultVariants: {
    size: 'md',
    variant: 'primary',
  },
});
