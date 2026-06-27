import { type MouseEvent, useCallback } from 'react';
import { X } from 'lucide-react';

import { cn } from '@/utils/classNames';

import { Avatar } from '../Avatar';
import {
  chipAvatarStyles,
  chipCloseButtonStyles,
  chipCloseIconStyles,
  chipLabelStyles,
  chipStyles,
} from './Chip.styles';
import type { ChipProps, ChipSizes } from './types';

const chipAvatarSizeMap: Record<NonNullable<ChipSizes>, 'xs' | 'sm' | 'md'> = {
  sm: 'xs',
  md: 'sm',
  lg: 'md',
};

export function Chip({
  children,
  icon: Icon,
  variant = 'default',
  appearance = 'filled',
  size = 'md',
  shape = 'circle',
  inverted = false,
  disabled = false,
  onClose,
  closeLabel = 'Remove chip',
  className,
  ...restProps
}: ChipProps) {
  const hasLeadingVisual = Boolean(Icon);
  const removable = Boolean(onClose);
  const avatarInverted =
    variant !== 'default' && (appearance === 'filled' ? !inverted : inverted);
  const handleCloseClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onClose?.();
    },
    [onClose],
  );

  return (
    <span
      {...restProps}
      className={cn(
        chipStyles({
          variant,
          appearance,
          size,
          shape,
          inverted,
          disabled,
          hasLeadingVisual,
          removable,
        }),
        className,
      )}
    >
      {Icon && (
        <Avatar
          aria-hidden='true'
          className={cn(chipAvatarStyles({ size }))}
          icon={Icon}
          inverted={avatarInverted}
          role='presentation'
          shape={shape}
          size={chipAvatarSizeMap[size]}
          variant={variant}
        />
      )}
      <span className={cn(chipLabelStyles())}>{children}</span>
      {onClose && (
        <button
          type='button'
          aria-label={closeLabel}
          className={cn(chipCloseButtonStyles({ size }))}
          disabled={disabled}
          onClick={handleCloseClick}
        >
          <X aria-hidden='true' className={cn(chipCloseIconStyles({ size }))} />
        </button>
      )}
    </span>
  );
}
