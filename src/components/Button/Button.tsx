import { ComponentPropsWithRef, FC, ReactNode, SVGProps } from 'react';
import { type VariantProps } from 'class-variance-authority';

import { cn, RemoveNull } from '../../utils';
import {
  buttonContentStyles,
  buttonIconStyle,
  buttonSpinnerOverlayStyles,
  buttonSpinnerStyles,
  buttonStyles,
} from './Button.styles';

export interface ButtonProps
  extends
    ComponentPropsWithRef<'button'>,
    RemoveNull<Omit<VariantProps<typeof buttonStyles>, 'disabled'>> {
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
  fullWidth,
  inverted,
  children,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  className,
  ...restProps
}) => {
  const isDisabled = loading || disabled;

  return (
    <button
      {...restProps}
      ref={ref}
      className={cn(
        buttonStyles({
          variant,
          size,
          appearance,
          disabled: isDisabled,
          loading,
          fullWidth,
          inverted,
        }),
        className,
      )}
      disabled={isDisabled}
    >
      <span
        data-slot='button-content'
        className={buttonContentStyles({ size, loading })}
      >
        {LeadingIcon && <LeadingIcon className={buttonIconStyle({ size })} />}
        {children && <span>{children}</span>}
        {TrailingIcon && <TrailingIcon className={buttonIconStyle({ size })} />}
      </span>
      {loading ? (
        <span data-slot='button-spinner' className={buttonSpinnerOverlayStyles}>
          <span aria-hidden='true' className={buttonSpinnerStyles({ size })} />
        </span>
      ) : null}
    </button>
  );
};
