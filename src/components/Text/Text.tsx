import type { ElementType } from 'react';

import { cn } from '@/utils/classNames';

import { textStyles } from './Text.styles';
import type { TextElement, TextProps } from './types';

export function Text<TElement extends TextElement = 'span'>({
  align = 'left',
  as,
  children,
  className,
  italic = false,
  ref,
  size = 'md',
  tone = 'default',
  transform = 'none',
  truncate = false,
  weight = 'regular',
  ...restProps
}: TextProps<TElement>) {
  const Component = (as ?? 'span') as ElementType;

  return (
    <Component
      {...restProps}
      ref={ref}
      className={cn(
        textStyles({
          align,
          italic,
          size,
          tone,
          transform,
          truncate,
          weight,
        }),
        className,
      )}
    >
      {children}
    </Component>
  );
}
