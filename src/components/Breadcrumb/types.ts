import type {
  ComponentPropsWithoutRef,
  ComponentType,
  ReactNode,
  SVGProps,
} from 'react';
import { type VariantProps } from 'class-variance-authority';

import type { RemoveNull } from '@/utils/types';

import { breadcrumbStyles } from './Breadcrumb.styles';

export type BreadcrumbAppearances = RemoveNull<
  VariantProps<typeof breadcrumbStyles>
>['appearance'];

export type BreadcrumbSeparators = '/' | '>';

export interface BreadcrumbItem extends Omit<
  ComponentPropsWithoutRef<'a'>,
  'children'
> {
  id?: string;
  label: ReactNode;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  current?: boolean;
  disabled?: boolean;
}
