import { forwardRef, type CSSProperties } from 'react';
import {
  type ITooltip,
  Tooltip as RcTooltip,
  type TooltipRefProps,
} from 'react-tooltip';

import { cn } from '@/utils/classNames';

import './Tooltip.css';
import type { TooltipProps } from './types';

const tooltipVariantStyles: Record<
  NonNullable<TooltipProps['variant']>,
  CSSProperties
> = {
  primary: {
    color: 'var(--text-color-white)',
    padding: 'var(--spacing-1) var(--spacing-2) var(--spacing-1-5)',
    backgroundColor: 'var(--background-color-primary)',
    borderRadius: 'var(--radius-sm)',
    fontSize: 'var(--text-300)',
  },
  secondary: {
    color: 'var(--text-color-default)',
    padding: '0px',
    backgroundColor: 'var(--background-color-default-hovered)',
    border: '1px solid var(--border-color-default)',
    borderRadius: 'var(--radius-sm)',
    boxShadow: 'var(--shadow-xl)',
    maxWidth: '305px',
  },
};

export const Tooltip = forwardRef<TooltipRefProps, TooltipProps>(
  (
    { children, className, opacity = 1, style, variant = 'primary', ...rest },
    ref,
  ) => {
    const activeStyles = tooltipVariantStyles[variant];

    return (
      <RcTooltip
        {...(rest as Omit<ITooltip, 'variant'>)}
        opacity={opacity}
        className={cn('lqc-tooltip', className)}
        style={{ ...activeStyles, ...style }}
        ref={ref}
      >
        {children}
      </RcTooltip>
    );
  },
);

Tooltip.displayName = 'Tooltip';
