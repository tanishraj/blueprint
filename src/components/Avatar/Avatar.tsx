import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/classNames';

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
    ComponentPropsWithoutRef<'span'>,
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

export function Avatar({
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
}: AvatarProps) {
  const ariaLabel = restProps['aria-label'];
  const ariaLabelledBy = restProps['aria-labelledby'];
  const isDecorative = role === 'presentation' || role === 'none';
  const hasImage = typeof img?.src === 'string' && img.src.length > 0;
  const hasIcon = typeof Icon !== 'undefined';
  const normalizedInitials = initials?.trim();
  const resolvedInitials =
    size === 'xs' ? normalizedInitials?.slice(0, 1) : normalizedInitials;
  const showInitials = Boolean(resolvedInitials);
  const fallbackAriaLabel = hasImage
    ? img?.alt || 'User avatar'
    : hasIcon
      ? 'User avatar'
      : showInitials
        ? `${resolvedInitials} avatar`
        : 'User avatar';
  const resolvedAriaLabel =
    ariaLabelledBy || isDecorative
      ? undefined
      : (ariaLabel ?? fallbackAriaLabel);
  let content: ReactNode = null;

  if (hasImage) {
    content = (
      <img
        src={img.src}
        alt=''
        aria-hidden='true'
        className={avatarImageStyles({ shape })}
      />
    );
  } else if (hasIcon) {
    content = (
      <Icon
        className={avatarIconStyles({ size })}
        aria-hidden='true'
        focusable='false'
      />
    );
  } else if (showInitials) {
    content = (
      <span className={avatarTextStyles({ size })}>{resolvedInitials}</span>
    );
  }

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
      {content}

      {status ? (
        <span
          data-avatar-status
          className={avatarStatusStyles({
            status,
            shape,
            position: statusPosition,
            size,
          })}
        />
      ) : null}
    </span>
  );
}
