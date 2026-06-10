import { FC, SVGProps } from 'react';
import { type VariantProps } from 'class-variance-authority';

import { badgeContainerStyles } from './Badge.styles';

export interface BadgeProps extends VariantProps<typeof badgeContainerStyles> {
  icon?: FC<SVGProps<SVGElement>>;
}

export const Badge: FC<BadgeProps> = () => {
  return <div>Badge Component</div>;
};
