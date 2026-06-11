import { FC, HTMLAttributes, SVGProps } from 'react';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils';

import { badgeVariants, invertedAppearanceMap } from './Badge.styles';

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  icon?: FC<SVGProps<SVGSVGElement>>;
  inverted?: boolean;
}

export const Badge: FC<BadgeProps> = ({
  variant,
  size,
  icon: Icon,
  inverted = false,
}) => {
  const baseVariantClass =
    badgeVariants({ variant })
      .split(' ')
      .find(cls => cls.startsWith('bg-')) || '';

  const innerBgClass = inverted
    ? invertedAppearanceMap[baseVariantClass] || baseVariantClass
    : baseVariantClass;

  return (
    <div className={cn(badgeVariants({ size }))}>
      {Icon ? (
        <Icon />
      ) : (
        <div
          className={cn(
            'absolute left-0 top-0 h-full w-full rounded-full',
            innerBgClass,
          )}
        />
      )}
    </div>
  );
};
