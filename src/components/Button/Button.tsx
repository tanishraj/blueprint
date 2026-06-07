import { ButtonHTMLAttributes, FC, ReactNode, SVGProps } from 'react';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';
import {
  buttonIconStyle,
  buttonSpinnerStyles,
  buttonStyles,
} from './Button.styles';

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<VariantProps<typeof buttonStyles>, 'disabled'> {
  children: ReactNode;
  icon?: FC<SVGProps<SVGSVGElement>>;
  leadingIcon?: FC<SVGProps<SVGSVGElement>>;
  trailingIcon?: FC<SVGProps<SVGSVGElement>>;
}

export const Button: FC<ButtonProps> = ({
  size,
  variant,
  appearance,
  disabled,
  loading,
  children,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
}) => {
  return (
    <button
      className={cn(
        buttonStyles({ variant, size, appearance, disabled, loading }),
      )}
      disabled={disabled}
    >
      {loading ? (
        <span aria-hidden='true' className={buttonSpinnerStyles({ size })} />
      ) : (
        <>
          {LeadingIcon && (
            <div className={buttonIconStyle({ size })}>
              <LeadingIcon className={buttonIconStyle({ size })} role='img' />
            </div>
          )}
          {children && <span>{children}</span>}
          {TrailingIcon && (
            <div className={buttonIconStyle({ size })}>
              <TrailingIcon className={buttonIconStyle({ size })} role='img' />
            </div>
          )}
        </>
      )}
    </button>
  );
};
