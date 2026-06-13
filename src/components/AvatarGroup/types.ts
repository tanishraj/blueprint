import type { HTMLAttributes } from 'react';
import { type VariantProps } from 'class-variance-authority';

import { RemoveNull } from '@/utils';

import type { AvatarProps, AvatarVariants } from '../Avatar';
import { avatarContainerStyles } from '../Avatar/Avatar.styles';

export type AvatarGroupSizes = RemoveNull<
  VariantProps<typeof avatarContainerStyles>
>['size'];
export type AvatarGroupShapes = RemoveNull<
  VariantProps<typeof avatarContainerStyles>
>['shape'];

export type AvatarGroupItem = Omit<
  AvatarProps,
  'size' | 'shape' | 'inverted' | 'stroke' | 'className'
>;

export interface AvatarGroupProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> {
  items?: AvatarGroupItem[];
  size?: AvatarGroupSizes;
  variant?: AvatarVariants;
  shape?: AvatarGroupShapes;
  max?: number;
  inverted?: boolean;
  stroke?: boolean;
}
