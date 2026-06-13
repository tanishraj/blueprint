import { FC, HTMLAttributes, SVGProps } from 'react';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils';

import {
  badgeIconStyles,
  badgeTextStyles,
  badgeVariants,
} from './Badge.styles';

type BadgeVariantProps = Omit<VariantProps<typeof badgeVariants>, 'appearance'>;

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, BadgeVariantProps {
  icon?: FC<SVGProps<SVGSVGElement>>;
}

export const Badge: FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  shape = 'circle',
  inverted = false,
  icon: Icon,
  children,
  role,
  className,
  ...restProps
}) => {
  const hasText = !!children || children === 0;
  const appearance = hasText ? 'text' : Icon ? 'icon' : 'dots';
  const hasIcon = Icon && appearance !== 'dots';
  const resolvedRole = hasText ? role : (role ?? 'img');
  const defaultAriaLabel =
    resolvedRole === 'img' ? `Badge, ${variant}` : undefined;
  const ariaLabel = restProps['aria-label'] ?? defaultAriaLabel;
  const hasTextIcon = hasText && Icon && appearance === 'text';

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
      aria-label={ariaLabel}
      className={cn(badgeClassName, className)}
    >
      {hasIcon && (
        <Icon
          aria-hidden='true'
          focusable='false'
          className={badgeIconClassName}
        />
      )}
      {hasText && <span className={badgeTextClassName}>{children}</span>}
    </span>
  );
};
