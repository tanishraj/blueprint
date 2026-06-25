import { forwardRef, useMemo } from 'react';
import {
  type ITooltip,
  Tooltip as RcTooltip,
  type TooltipRefProps,
} from 'react-tooltip';

import './Tooltip.css';
import type { TooltipProps } from './types';

export const Tooltip = forwardRef<TooltipRefProps, TooltipProps>(
  ({ children, variant = 'primary', opacity = 1, ...rest }, ref) => {
    const styles = useMemo(
      () => ({
        primary: {
          ...rest.style,
          color: 'var(--text-color-white)',
          padding: 'var(--spacing-1) var(--spacing-2) var(--spacing-1-5)',
          backgroundColor: 'var(--background-color-primary)',
          borderRadius: 'var(--radius-sm)',
          fontSize: 'var(--text-300)',
        },
        secondary: {
          ...rest.style,
          color: 'var(--text-color-default)',
          padding: '0px',
          backgroundColor: 'var(--base-white)',
          borderRadius: 'var(--radius-sm)',
          boxShadow: 'var(--shadow-xl)',
          maxWidth: '305px',
        },
      }),
      [rest.style],
    );

    const activeStyles = useMemo(() => styles[variant], [styles, variant]);

    return (
      <RcTooltip
        {...(rest as Omit<ITooltip, 'variant'>)}
        opacity={opacity}
        style={{ ...activeStyles, ...rest.style }}
        className={`lqc-tooltip${rest.className ? ` ${rest.className}` : ''}`}
        ref={ref}
      >
        {children}
      </RcTooltip>
    );
  },
);

Tooltip.displayName = 'Tooltip';
