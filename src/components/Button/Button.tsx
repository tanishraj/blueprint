import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import { type VariantProps } from 'class-variance-authority';

import { ThemeMode } from '@/providers/theme';

import { ThemeProvider } from '../../providers/theme/ThemeProvider';
import { cn } from '../../utils';
import { buttonVariants } from './Button.styles';
import { NewComponent } from './NewComponent';

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({ children, variant, size }) => {
  return (
    <div className='flex flex-col items-center gap-4'>
      <ThemeProvider name='custom' value={ThemeMode.LIGHT}>
        <NewComponent />
      </ThemeProvider>
      <button className={cn(buttonVariants({ variant, size }))}>
        {children}
      </button>
    </div>
  );
};
