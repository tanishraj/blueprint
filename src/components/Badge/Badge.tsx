import type { ComponentPropsWithoutRef, ComponentType, SVGProps } from 'react';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/classNames';

import {
  badgeIconStyles,
  badgeTextStyles,
  badgeVariants,
} from './Badge.styles';
export interface BadgeProps
  extends
    ComponentPropsWithoutRef<'span'>,
    Omit<VariantProps<typeof badgeVariants>, 'appearance'> {
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
}

export function Badge({
  variant = 'default',
  size = 'md',
  shape = 'circle',
  inverted = false,
  icon: Icon,
  children,
  role,
  className,
  ...restProps
}: BadgeProps) {
  const ariaLabel = restProps['aria-label'];
  const ariaLabelledBy = restProps['aria-labelledby'];
  const hasText = !!children || children === 0;
  const hasIcon = typeof Icon !== 'undefined';
  const appearance = hasText ? 'text' : hasIcon ? 'icon' : 'dots';
  const showsIcon = hasIcon && appearance !== 'dots';
  const resolvedRole = hasText ? role : (role ?? 'img');
  const isDecorative =
    resolvedRole === 'presentation' || resolvedRole === 'none';
  const defaultAriaLabel =
    resolvedRole === 'img'
      ? appearance === 'icon'
        ? `${variant} badge icon`
        : `${variant} badge indicator`
      : undefined;
  const resolvedAriaLabel =
    ariaLabelledBy || isDecorative
      ? undefined
      : (ariaLabel ?? defaultAriaLabel);
  const hasTextIcon = hasText && hasIcon && appearance === 'text';

  const badgeClassName = cn(
    badgeVariants({
      variant,
      size,
      shape,
      appearance,
      inverted,
      hasIcon: hasTextIcon,
    }),
  );
  const badgeIconClassName = cn(badgeIconStyles({ size }));
  const badgeTextClassName = cn(badgeTextStyles({ size }));

  return (
    <span
      {...restProps}
      role={resolvedRole}
      aria-label={resolvedAriaLabel}
      className={cn(badgeClassName, className)}
    >
      {showsIcon && (
        <Icon
          aria-hidden='true'
          focusable='false'
          className={badgeIconClassName}
        />
      )}
      {hasText && <span className={badgeTextClassName}>{children}</span>}
    </span>
  );
}
