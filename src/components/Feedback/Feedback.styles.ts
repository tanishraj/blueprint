import { cva } from 'class-variance-authority';

export const feedbackRootStyles = cva('inline-flex w-fit items-center gap-2', {
  variants: {
    disabled: {
      true: 'cursor-not-allowed opacity-40',
      false: '',
    },
    readOnly: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    { disabled: false, readOnly: false, className: 'cursor-pointer' },
  ],
  defaultVariants: {
    disabled: false,
    readOnly: false,
  },
});

export const feedbackOptionStyles = cva(
  'relative inline-flex shrink-0 items-center justify-center',
  {
    variants: {
      size: {
        sm: 'size-[14px]',
        md: 'size-[18px]',
        lg: 'size-6',
      },
      variant: {
        face: '',
        emoji: '',
      },
    },
    compoundVariants: [
      { size: 'sm', variant: 'emoji', className: 'size-6' },
      { size: 'md', variant: 'emoji', className: 'size-9' },
      { size: 'lg', variant: 'emoji', className: 'size-12' },
    ],
    defaultVariants: {
      size: 'md',
      variant: 'face',
    },
  },
);

export const feedbackInputStyles = cva('sr-only peer');

export const feedbackLabelStyles = cva(
  'inline-flex items-center justify-center outline-none transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-base',
  {
    variants: {
      interactive: {
        true: 'cursor-pointer',
        false: 'cursor-default',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
      variant: {
        face: '',
        emoji: '',
      },
    },
    compoundVariants: [
      { variant: 'face', size: 'sm', className: 'size-[14px] rounded-full' },
      { variant: 'face', size: 'md', className: 'size-[18px] rounded-full' },
      { variant: 'face', size: 'lg', className: 'size-6 rounded-full' },
      { variant: 'emoji', size: 'sm', className: 'size-6 rounded-md' },
      { variant: 'emoji', size: 'md', className: 'size-9 rounded-lg' },
      { variant: 'emoji', size: 'lg', className: 'size-12 rounded-xl' },
      {
        variant: 'emoji',
        className: 'text-default peer-checked:bg-primary-100 hover:bg-primary-50',
      },
      {
        variant: 'face',
        className: 'text-gray-500',
      },
    ],
    defaultVariants: {
      interactive: true,
      size: 'md',
      variant: 'face',
    },
  },
);

export const feedbackFaceStyles = cva('block', {
  variants: {
    size: {
      sm: 'size-[14px]',
      md: 'size-[18px]',
      lg: 'size-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const feedbackEmojiStyles = cva(
  'select-none leading-none transition-transform',
  {
    variants: {
      size: {
        sm: 'text-base',
        md: 'text-2xl',
        lg: 'text-[2rem]',
      },
      interactive: {
        true: 'group-hover:scale-105',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      interactive: true,
    },
  },
);
