import type { FC, HTMLAttributes } from 'react';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils';

import {
  avatarContainerStyles,
  avatarIconStyles,
  avatarImageStyles,
  avatarStatusStyles,
  avatarTextStyles,
} from './Avatar.styles';
import type {
  AvatarIcon,
  AvatarImage,
  AvatarSizes,
  AvatarShapes,
  AvatarVariants,
  AvatarStatus,
  AvatarStatusPosition,
} from './types';

export interface AvatarProps
  extends
    HTMLAttributes<HTMLSpanElement>,
    Omit<VariantProps<typeof avatarContainerStyles>, 'stroke'> {
  icon?: AvatarIcon;
  img?: AvatarImage;
  initials?: string;
  status?: AvatarStatus;
  statusPosition?: AvatarStatusPosition;
  size?: AvatarSizes;
  shape?: AvatarShapes;
  variant?: AvatarVariants;
  inverted?: boolean;
  stroke?: boolean;
}

export const Avatar: FC<AvatarProps> = ({
  icon: Icon,
  img,
  initials,
  status,
  statusPosition = 'top-right',
  size = 'md',
  shape = 'circle',
  variant = 'default',
  inverted = false,
  stroke = false,
  className,
  role = 'img',
  ...restProps
}) => {
  const hasImage = typeof img?.src === 'string' && img.src.length > 0;
  const hasIcon = typeof Icon !== 'undefined';
  const normalizedInitials = initials?.trim();
  const resolvedInitials =
    size === 'xs' ? normalizedInitials?.slice(0, 1) : normalizedInitials;
  const showInitials = Boolean(resolvedInitials);
  const resolvedAriaLabel =
    restProps['aria-label'] ??
    (hasImage
      ? img?.alt || 'User avatar'
      : hasIcon
        ? 'User avatar'
        : showInitials
          ? `${resolvedInitials} avatar`
          : 'User avatar');

  return (
    <span
      {...restProps}
      role={role}
      aria-label={resolvedAriaLabel}
      className={cn(
        avatarContainerStyles({
          size,
          shape,
          variant,
          inverted,
          stroke,
        }),
        className,
      )}
    >
      {hasImage ? (
        <img
          src={img.src}
          alt={img.alt}
          className={avatarImageStyles({ shape })}
        />
      ) : hasIcon ? (
        <Icon
          className={avatarIconStyles({ size })}
          aria-hidden='true'
          focusable='false'
        />
      ) : showInitials ? (
        <span className={avatarTextStyles({ size })}>{resolvedInitials}</span>
      ) : null}

      {status && (
        <span
          data-avatar-status
          className={avatarStatusStyles({
            status,
            shape,
            position: statusPosition,
            size,
          })}
        />
      )}
    </span>
  );
};
