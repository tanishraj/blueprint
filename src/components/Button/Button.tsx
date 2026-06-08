import { ComponentPropsWithRef, FC, ReactNode, SVGProps } from 'react';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';
import {
  buttonIconStyle,
  buttonSpinnerStyles,
  buttonStyles,
} from './Button.styles';

export interface ButtonProps
  extends
    ComponentPropsWithRef<'button'>,
    Omit<VariantProps<typeof buttonStyles>, 'disabled'> {
  children: ReactNode;
  leadingIcon?: FC<SVGProps<SVGSVGElement>>;
  trailingIcon?: FC<SVGProps<SVGSVGElement>>;
}

export const Button: FC<ButtonProps> = ({
  ref,
  size,
  variant,
  appearance,
  disabled,
  loading,
  children,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  ...restProps
}) => {
  return (
    <button
      ref={ref}
      className={cn(
        buttonStyles({ variant, size, appearance, disabled, loading }),
      )}
      disabled={disabled}
      {...restProps}
    >
      {loading ? (
        <span aria-hidden='true' className={buttonSpinnerStyles({ size })} />
      ) : (
        <>
          {LeadingIcon && <LeadingIcon className={buttonIconStyle({ size })} />}
          {children && <span>{children}</span>}
          {TrailingIcon && (
            <TrailingIcon className={buttonIconStyle({ size })} />
          )}
        </>
      )}
    </button>
  );
};
