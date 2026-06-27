import { cva } from 'class-variance-authority';

export const textStyles = cva('m-0 min-w-0', {
  variants: {
    size: {
      xs: 'text-xs leading-4',
      sm: 'text-sm leading-5',
      md: 'text-base leading-6',
      lg: 'text-lg leading-7',
      xl: 'text-xl leading-7',
      '2xl': 'text-2xl leading-8',
      '3xl': 'text-3xl leading-9',
      '4xl': 'text-4xl leading-10',
      '5xl': 'text-5xl leading-none',
      '6xl': 'text-6xl leading-none',
      '7xl': 'text-7xl leading-none',
      '8xl': 'text-8xl leading-none',
      '9xl': 'text-9xl leading-none',
    },
    weight: {
      regular: 'font-regular',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    tone: {
      default: 'text-default',
      caption: 'text-caption',
      placeholder: 'text-placeholder',
      primary: 'text-primary',
      info: 'text-info',
      success: 'text-success',
      warning: 'text-warning',
      danger: 'text-danger',
      inverted: 'text-default-inverted',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    transform: {
      none: 'normal-case',
      uppercase: 'uppercase',
      lowercase: 'lowercase',
      capitalize: 'capitalize',
    },
    italic: {
      true: 'italic',
      false: '',
    },
    truncate: {
      true: 'block truncate',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    weight: 'regular',
    tone: 'default',
    align: 'left',
    transform: 'none',
    italic: false,
    truncate: false,
  },
});
