import { cn } from '@/utils/classNames';

import { Avatar } from '../Avatar';
import {
  avatarGroupCounterStyles,
  avatarGroupStyles,
} from './AvatarGroup.styles';
import type { AvatarGroupProps } from './types';

export function AvatarGroup({
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
}: AvatarGroupProps) {
  const {
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledBy,
    ...rest
  } = restProps;
  const normalizedItems = items ?? [];
  const normalizedMax = Number.isFinite(max) ? Math.max(1, Math.trunc(max)) : 1;
  const visibleItems = normalizedItems.slice(0, normalizedMax);
  const remaining = Math.max(0, normalizedItems.length - visibleItems.length);
  const memberLabel = normalizedItems.length === 1 ? 'member' : 'members';
  const resolvedAriaLabel = ariaLabelledBy
    ? undefined
    : (ariaLabel ?? `Avatar group, ${normalizedItems.length} ${memberLabel}`);

  return (
    <div
      {...rest}
      role={role}
      aria-label={resolvedAriaLabel}
      aria-labelledby={ariaLabelledBy}
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
        <span className={avatarGroupCounterStyles({ size, shape, variant })}>
          <span aria-hidden='true'>+{remaining}</span>
          <span className='sr-only'>{remaining} more members</span>
        </span>
      )}
    </div>
  );
}
