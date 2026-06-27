import type { ComponentPropsWithRef, Key, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';

import type { RemoveNull } from '@/utils/types';

import type { ButtonProps } from '../Button';
import { emptyStateRootStyles } from './EmptyState.styles';

export type EmptyStateSize = RemoveNull<
  VariantProps<typeof emptyStateRootStyles>
>['size'];

export type EmptyStateOrientation = RemoveNull<
  VariantProps<typeof emptyStateRootStyles>
>['orientation'];

export type EmptyStateAction = Readonly<
  Omit<ButtonProps, 'ref' | 'size'> & {
    actionKey?: Key;
    size?: ButtonProps['size'];
  }
>;

export interface EmptyStateProps extends Omit<
  ComponentPropsWithRef<'div'>,
  'title'
> {
  actions?: ReadonlyArray<EmptyStateAction>;
  copyClassName?: string;
  description?: ReactNode;
  icon?: ReactNode;
  orientation?: EmptyStateOrientation;
  size?: EmptyStateSize;
  title?: ReactNode;
}
