import { type FC } from 'react';

import { cn } from '@/utils';

import {
  dividerContentStyles,
  dividerLineStyles,
  dividerRootStyles,
} from './Divider.styles';
import type { DividerProps } from './types';

export const Divider: FC<DividerProps> = ({
  children,
  orientation = 'horizontal',
  className,
  role = 'separator',
  ...restProps
}) => {
  const hasContent = Boolean(children || children === 0);

  return (
    <div
      {...restProps}
      role={role}
      aria-orientation={orientation}
      className={cn(dividerRootStyles({ orientation, hasContent }), className)}
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
};
