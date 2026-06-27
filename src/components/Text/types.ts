import type { ComponentPropsWithRef, ElementType, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';

import type { RemoveNull } from '@/utils';

import { textStyles } from './Text.styles';

export type TextSize = RemoveNull<VariantProps<typeof textStyles>>['size'];
export type TextWeight = RemoveNull<VariantProps<typeof textStyles>>['weight'];
export type TextTone = RemoveNull<VariantProps<typeof textStyles>>['tone'];
export type TextAlign = RemoveNull<VariantProps<typeof textStyles>>['align'];
export type TextTransform = RemoveNull<
  VariantProps<typeof textStyles>
>['transform'];

export type TextElement = ElementType;

export interface TextOwnProps extends RemoveNull<
  VariantProps<typeof textStyles>
> {
  as?: TextElement;
  children?: ReactNode;
  className?: string;
}

export type TextProps<TElement extends TextElement = 'span'> = TextOwnProps &
  Omit<ComponentPropsWithRef<TElement>, keyof TextOwnProps>;
