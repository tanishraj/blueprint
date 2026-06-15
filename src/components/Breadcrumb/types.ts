import { AnchorHTMLAttributes, FC, ReactNode, SVGProps } from 'react';
import { type VariantProps } from 'class-variance-authority';

import { RemoveNull } from '@/utils';

import { breadcrumbStyles } from './Breadcrumb.styles';

export type BreadcrumbAppearances = RemoveNull<
  VariantProps<typeof breadcrumbStyles>
>['appearance'];

export type BreadcrumbSeparators = '/' | '>';

export interface BreadcrumbItem extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'children'
> {
  id?: string;
  label: ReactNode;
  icon?: FC<SVGProps<SVGSVGElement>>;
  current?: boolean;
  disabled?: boolean;
}
