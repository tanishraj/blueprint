import { FC, HTMLAttributes, SVGProps } from 'react';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils';

import {
  badgeIconStyles,
  badgeTextStyles,
  badgeVariants,
} from './Badge.styles';
import { BadgeSizes } from './types';

type BadgeAppearance = 'dots' | 'icon' | 'text';
type BadgeVariantProps = Omit<VariantProps<typeof badgeVariants>, 'appearance'>;

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, BadgeVariantProps {
  icon?: FC<SVGProps<SVGSVGElement>>;
  label?: string;
}

const gapBySize: Record<NonNullable<BadgeSizes>, string> = {
  sm: 'gap-1',
  md: 'gap-2',
  lg: 'gap-3',
};

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

  const resolvedAppearance: BadgeAppearance = (() => {
    if (hasText) {
      return 'text';
    }

    if (hasExplicitIcon) {
      return 'icon';
    }

    return 'dots';
  })();

  const resolvedVariant = variant;
  const resolvedSize: NonNullable<BadgeSizes> = (size ??
    'md') as NonNullable<BadgeSizes>;
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
        }),
        isTextAppearance && showIcon && gapBySize[resolvedSize],
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
