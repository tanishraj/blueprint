import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center rounded-md text-sm font-medium transition-colors ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary-hover',
        secondary:
          'border border-input bg-secondary text-secondary-foreground hover:bg-secondary-hover',
        outline:
          'border border-input hover:bg-accent hover:text-accent-foreground',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive-hover',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
        accent: 'bg-accent text-accent-foreground hover:bg-accent-hover',
        gradient:
          'bg-gradient-vibrant text-primary-foreground shadow-glow hover:brightness-95',
      },
      size: {
        sm: 'h-9 px-3 rounded-md',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);
