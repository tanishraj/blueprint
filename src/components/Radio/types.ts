import type { ComponentPropsWithRef, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';

import type { RemoveNull } from '@/utils/types';

import { radioControlStyles } from './Radio.styles';

export type RadioSizes = RemoveNull<
  VariantProps<typeof radioControlStyles>
>['size'];

export interface RadioProps extends Omit<
  ComponentPropsWithRef<'input'>,
  'children' | 'size' | 'type'
> {
  description?: ReactNode;
  error?: ReactNode;
  label?: ReactNode;
  size?: RadioSizes;
}
