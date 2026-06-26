import { Children } from 'react';

import { cn } from '@/utils/classNames';

import {
  dividerContentStyles,
  dividerLineStyles,
  dividerRootStyles,
} from './Divider.styles';
import type { DividerProps } from './types';

export function Divider({
  children,
  orientation = 'horizontal',
  className,
  role = 'separator',
  ...restProps
}: DividerProps) {
  const hasContent = Children.toArray(children).length > 0;
  const orientationProps =
    role === 'separator' ? { 'aria-orientation': orientation } : {};

  return (
    <div
      {...restProps}
      {...orientationProps}
      className={cn(dividerRootStyles({ orientation, hasContent }), className)}
      role={role}
    >
      {hasContent && (
        <>
          <span
            aria-hidden='true'
            className={cn(dividerLineStyles({ orientation }))}
          />
          <span className={cn(dividerContentStyles({ orientation }))}>
            {children}
          </span>
          <span
            aria-hidden='true'
            className={cn(dividerLineStyles({ orientation }))}
          />
        </>
      )}
    </div>
  );
}
