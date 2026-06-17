import type { VariantProps } from 'class-variance-authority';

import type { RemoveNull } from '@/utils';

import { radioControlStyles } from './Radio.styles';

export type RadioSizes = RemoveNull<
  VariantProps<typeof radioControlStyles>
>['size'];
