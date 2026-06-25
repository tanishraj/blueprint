import type { Ref } from 'react';
import type { ITooltip, TooltipRefProps } from 'react-tooltip';

export interface TooltipProps extends Omit<ITooltip, 'variant'> {
  variant?: 'primary' | 'secondary';
  ref?: Ref<TooltipRefProps>;
}
