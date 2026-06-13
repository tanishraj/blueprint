import { type VariantProps } from 'class-variance-authority';

import { RemoveNull } from '@/utils';

import { badgeVariants } from './Badge.styles';

export type BadgeVariants = RemoveNull<
  VariantProps<typeof badgeVariants>
>['variant'];

export type BadgeAppearances = RemoveNull<
  VariantProps<typeof badgeVariants>
>['appearance'];
export type BadgeSizes = RemoveNull<VariantProps<typeof badgeVariants>>['size'];
export type BadgeShapes = RemoveNull<
  VariantProps<typeof badgeVariants>
>['shape'];
