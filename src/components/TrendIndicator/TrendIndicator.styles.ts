import { cva } from 'class-variance-authority';

export const trendIndicatorRootStyles = cva('inline-flex items-center gap-2');

export const trendIndicatorLabelStyles = cva('text-current');

export const trendIndicatorValueStyles = cva('text-default', {
  variants: {
    tone: {
      positive: 'text-success',
      negative: 'text-danger',
      neutral: 'text-primary',
      undefined: '',
    },
  },
});

export const trendIndicatorIconStyles = cva('shrink-0', {
  variants: {
    size: {
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
    },
    tone: {
      positive: 'text-success',
      negative: 'text-danger',
      neutral: 'text-primary',
      undefined: 'text-current',
    },
    strokeWidth: {
      thin: '[&_svg]:stroke-[1.5]',
      thick: '[&_svg]:stroke-[2]',
      thicker: '[&_svg]:stroke-[2.5]',
    },
  },
  defaultVariants: {
    size: 'lg',
    strokeWidth: 'thick',
  },
});
