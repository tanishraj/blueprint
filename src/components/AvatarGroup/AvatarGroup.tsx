import type { FC } from 'react';

import { cn } from '@/utils';

import { Avatar } from '../Avatar';
import {
  avatarGroupCounterStyles,
  avatarGroupStyles,
} from './AvatarGroup.styles';
import type { AvatarGroupProps } from './types';

export const AvatarGroup: FC<AvatarGroupProps> = ({
  items,
  size = 'md',
  variant = 'default',
  shape = 'circle',
  max = 4,
  inverted = false,
  stroke = true,
  className,
  role = 'group',
  ...restProps
}) => {
  const { ['aria-label']: ariaLabel, ...rest } = restProps;
  const normalizedItems = items ?? [];
  const normalizedMax = Math.max(1, max);
  const visibleItems = normalizedItems.slice(0, normalizedMax);
  const remaining = Math.max(0, normalizedItems.length - visibleItems.length);
  const resolvedAriaLabel = ariaLabel ?? 'Avatar group';

  return (
    <div
      {...rest}
      role={role}
      aria-label={resolvedAriaLabel}
      className={cn(avatarGroupStyles({ size }), className)}
    >
      {visibleItems.map((item, index) => (
        <Avatar
          key={item.id ?? index}
          {...item}
          variant={variant}
          size={size}
          shape={shape}
          inverted={inverted}
          stroke={stroke}
        />
      ))}
      {remaining > 0 && (
        <span
          aria-hidden='true'
          className={avatarGroupCounterStyles({ size, shape, variant })}
        >
          +{remaining}
        </span>
      )}
    </div>
  );
};
