import { type VariantProps } from 'class-variance-authority';

import { RemoveNull } from '@/utils';

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
