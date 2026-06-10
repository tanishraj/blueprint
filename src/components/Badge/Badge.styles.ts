import { cva } from 'class-variance-authority';

export const badgeContainerStyles = cva('', {
  variants: {
    apperance: {
      rounded: '',
      squared: '',
    },
    variant: {
      default: '',
      primary: '',
      info: '',
      success: '',
      warning: '',
      danger: '',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  compoundVariants: [],
  defaultVariants: {},
});
