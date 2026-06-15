import type { HTMLAttributes, ReactNode } from 'react';
import { type VariantProps } from 'class-variance-authority';

import { RemoveNull } from '@/utils';

import { dividerRootStyles } from './Divider.styles';

export type DividerOrientations = RemoveNull<
  VariantProps<typeof dividerRootStyles>
>['orientation'];

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  orientation?: DividerOrientations;
}
