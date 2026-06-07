import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';
import { buttonStyles } from './Button.styles';

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<VariantProps<typeof buttonStyles>, 'disabled'> {
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  size,
  variant,
  appearance,
  disabled,
  loading,
  children,
}) => {
  return (
    <button
      className={cn(
        buttonStyles({ variant, size, appearance, disabled, loading }),
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
