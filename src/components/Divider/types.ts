import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { type VariantProps } from 'class-variance-authority';

import type { RemoveNull } from '@/utils/types';

import { dividerRootStyles } from './Divider.styles';

export type DividerOrientations = RemoveNull<
  VariantProps<typeof dividerRootStyles>
>['orientation'];

export interface DividerProps extends ComponentPropsWithoutRef<'div'> {
  children?: ReactNode;
  orientation?: DividerOrientations;
}
