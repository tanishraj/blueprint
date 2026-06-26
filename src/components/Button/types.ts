import { type VariantProps } from 'class-variance-authority';

import type { RemoveNull } from '@/utils/types';

import { buttonStyles } from './Button.styles';

export type ButtonVariants = RemoveNull<
  VariantProps<typeof buttonStyles>
>['variant'];

export type ButtonAppearances = RemoveNull<
  VariantProps<typeof buttonStyles>
>['appearance'];

export type ButtonSizes = RemoveNull<VariantProps<typeof buttonStyles>>['size'];

export type ButtonShapes = RemoveNull<
  VariantProps<typeof buttonStyles>
>['shape'];
