import type { ITooltip, TooltipRefProps } from 'react-tooltip';

export interface TooltipProps extends Omit<ITooltip, 'variant'> {
  variant?: 'primary' | 'secondary';
}

export type { TooltipRefProps };
