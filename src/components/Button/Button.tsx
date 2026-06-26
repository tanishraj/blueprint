import type {
  ComponentPropsWithRef,
  ComponentType,
  ReactNode,
  SVGProps,
} from 'react';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils/classNames';
import type { RemoveNull } from '../../utils/types';
import {
  buttonContentStyles,
  buttonIconStyle,
  buttonSpinnerOverlayStyles,
  buttonSpinnerStyles,
  buttonStyles,
} from './Button.styles';

type ButtonIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface ButtonProps
  extends
    ComponentPropsWithRef<'button'>,
    RemoveNull<Omit<VariantProps<typeof buttonStyles>, 'disabled'>> {
  children?: ReactNode;
  leadingIcon?: ButtonIcon;
  trailingIcon?: ButtonIcon;
}

export function Button({
  ref,
  size,
  variant,
  appearance,
  shape,
  disabled,
  loading,
  fullWidth,
  inverted,
  children,
  type = 'button',
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  className,
  ...restProps
}: ButtonProps) {
  const isDisabled = loading || disabled;
  const hasChildren = children !== null && children !== undefined;
  const hasLeadingIcon = Boolean(LeadingIcon);
  const hasTrailingIcon = Boolean(TrailingIcon);
  const isIconOnly =
    !hasChildren && Number(hasLeadingIcon) + Number(hasTrailingIcon) === 1;

  return (
    <button
      {...restProps}
      ref={ref}
      type={type}
      aria-busy={loading || undefined}
      className={cn(
        buttonStyles({
          variant,
          size,
          appearance,
          shape,
          disabled: isDisabled,
          loading,
          fullWidth,
          iconOnly: isIconOnly,
          inverted,
        }),
        className,
      )}
      disabled={isDisabled}
    >
      <span
        data-slot='button-content'
        className={buttonContentStyles({ size, loading, iconOnly: isIconOnly })}
      >
        {LeadingIcon ? (
          <LeadingIcon
            aria-hidden='true'
            focusable='false'
            className={buttonIconStyle({ size })}
          />
        ) : null}
        {hasChildren ? <span data-slot='button-label'>{children}</span> : null}
        {TrailingIcon ? (
          <TrailingIcon
            aria-hidden='true'
            focusable='false'
            className={buttonIconStyle({ size })}
          />
        ) : null}
      </span>
      {loading ? (
        <span data-slot='button-spinner' className={buttonSpinnerOverlayStyles}>
          <span aria-hidden='true' className={buttonSpinnerStyles({ size })} />
        </span>
      ) : null}
    </button>
  );
}
