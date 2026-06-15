import { type FC } from 'react';
import { X } from 'lucide-react';

import { cn } from '@/utils';

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

export const Chip: FC<ChipProps> = ({
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
}) => {
  const hasLeadingVisual = Boolean(Icon);
  const removable = Boolean(onClose);
  const avatarInverted =
    variant !== 'default' && (appearance === 'filled' ? !inverted : inverted);

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
          aria-label='Chip icon'
          className={cn(chipAvatarStyles({ size }))}
          icon={Icon}
          inverted={avatarInverted}
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
          onClick={onClose}
        >
          <X aria-hidden='true' className={cn(chipCloseIconStyles({ size }))} />
        </button>
      )}
    </span>
  );
};
