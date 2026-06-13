import { FC, HTMLAttributes, SVGProps } from 'react';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils';

import {
  badgeIconStyles,
  badgeTextStyles,
  badgeVariants,
} from './Badge.styles';
import { BadgeAppearances } from './types';

type BadgeVariantProps = Omit<VariantProps<typeof badgeVariants>, 'appearance'>;

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, BadgeVariantProps {
  icon?: FC<SVGProps<SVGSVGElement>>;
  label?: string;
}

export const Badge: FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  shape = 'circle',
  inverted = false,
  icon: Icon,
  children,
  label,
  role,
  className,
  ...restProps
}) => {
  const hasText =
    (typeof children === 'string' && children.trim() !== '') ||
    typeof children === 'number' ||
    (children !== undefined &&
      children !== null &&
      children !== false &&
      children !== true) ||
    typeof label === 'string' ||
    typeof label === 'number';

  const hasExplicitIcon = Icon !== undefined;

  const resolvedAppearance: BadgeAppearances = (() => {
    if (hasText) {
      return 'text';
    }

    if (hasExplicitIcon) {
      return 'icon';
    }

    return 'dots';
  })();

  const resolvedVariant = variant;
  const resolvedSize = size ?? 'md';
  const badgeText =
    typeof children === 'string' || typeof children === 'number'
      ? String(children)
      : typeof label === 'string'
        ? label
        : 'Badge';

  const showIcon = resolvedAppearance !== 'dots' && hasExplicitIcon;
  const isTextAppearance = resolvedAppearance === 'text';

  const resolvedRole = isTextAppearance ? role : (role ?? 'img');
  const defaultAriaLabel =
    resolvedRole === 'img' ? `Badge, ${resolvedVariant}` : undefined;
  const ariaLabel = restProps['aria-label'] ?? defaultAriaLabel;

  return (
    <span
      {...restProps}
      role={resolvedRole}
      aria-label={ariaLabel}
      className={cn(
        badgeVariants({
          variant: resolvedVariant,
          size: resolvedSize,
          shape,
          appearance: resolvedAppearance,
          inverted,
          hasIcon: isTextAppearance && showIcon,
        }),
        className,
      )}
    >
      {showIcon && Icon && (
        <Icon
          aria-hidden='true'
          focusable='false'
          className={badgeIconStyles({ size: resolvedSize })}
        />
      )}
      {isTextAppearance && (
        <span className={badgeTextStyles({ size: resolvedSize })}>
          {children ?? label ?? badgeText}
        </span>
      )}
    </span>
  );
};
