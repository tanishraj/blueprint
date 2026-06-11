import { cva } from 'class-variance-authority';

import { InvertedAppearanceMap } from './types';

export const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border border-1 border-base relative overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-default',
        info: 'bg-info',
        success: 'bg-success',
        warning: 'bg-warning',
        danger: 'bg-danger',
      },
      size: {
        sm: 'size-1.5',
        md: 'size-2',
        lg: 'size-2.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export const invertedAppearanceMap: InvertedAppearanceMap = {
  'bg-default': 'bg-default-inverted',
  'bg-primary': 'bg-primary-inverted',
  'bg-info': 'bg-info-inverted',
  'bg-success': 'bg-success-inverted',
  'bg-warning': 'bg-warning-inverted',
  'bg-danger': 'bg-danger-inverted',
};
