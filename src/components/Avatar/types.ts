import type { ComponentType, SVGProps } from 'react';
import { type VariantProps } from 'class-variance-authority';

import type { RemoveNull } from '@/utils/types';

import { avatarContainerStyles, avatarStatusStyles } from './Avatar.styles';

export type AvatarSizes = RemoveNull<
  VariantProps<typeof avatarContainerStyles>
>['size'];
export type AvatarShapes = RemoveNull<
  VariantProps<typeof avatarContainerStyles>
>['shape'];
export type AvatarVariants = RemoveNull<
  VariantProps<typeof avatarContainerStyles>
>['variant'];
export type AvatarStatus = RemoveNull<
  VariantProps<typeof avatarStatusStyles>['status']
>;
export type AvatarStatusPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export type AvatarIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type AvatarImage = {
  src: string;
  alt: string;
};
