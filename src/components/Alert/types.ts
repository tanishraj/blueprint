import { type VariantProps } from 'class-variance-authority';

import type { RemoveNull } from '@/utils/types';

import { alertWrapperStyles } from './Alert.styles';

export type AlertVariants = RemoveNull<
  VariantProps<typeof alertWrapperStyles>
>['variant'];

export type AlertAppearances = RemoveNull<
  VariantProps<typeof alertWrapperStyles>
>['appearance'];

export type AlertSizes = RemoveNull<
  VariantProps<typeof alertWrapperStyles>
>['size'];
