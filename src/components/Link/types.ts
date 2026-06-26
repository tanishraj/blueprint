import type {
  ComponentPropsWithRef,
  ComponentType,
  ReactNode,
  SVGProps,
} from 'react';
import { type VariantProps } from 'class-variance-authority';

import { RemoveNull } from '@/utils';

import { linkStyles } from './Link.styles';

export type LinkSizes = RemoveNull<VariantProps<typeof linkStyles>>['size'];
export type LinkVariants = RemoveNull<
  VariantProps<typeof linkStyles>
>['variant'];
export type LinkUnderline = RemoveNull<
  VariantProps<typeof linkStyles>
>['underline'];
export type LinkIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface LinkProps
  extends
    Omit<ComponentPropsWithRef<'a'>, 'children'>,
    RemoveNull<Omit<VariantProps<typeof linkStyles>, 'disabled' | 'truncate'>> {
  children: ReactNode;
  leadingIcon?: LinkIcon;
  trailingIcon?: LinkIcon;
  external?: boolean;
  disabled?: boolean;
  truncate?: boolean;
}
