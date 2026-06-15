import { type FC, type MouseEvent, useCallback } from 'react';
import { ExternalLink } from 'lucide-react';

import { cn } from '@/utils';

import { linkIconStyles, linkLabelStyles, linkStyles } from './Link.styles';
import type { LinkProps } from './types';

export const Link: FC<LinkProps> = ({
  ref,
  children,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  external = false,
  variant = 'primary',
  size = 'md',
  underline = 'hover',
  inverted = false,
  disabled = false,
  truncate = false,
  target,
  rel,
  href,
  className,
  onClick,
  ...restProps
}) => {
  const EndIcon = external ? ExternalLink : TrailingIcon;
  const safeRel = target === '_blank' && !rel ? 'noreferrer noopener' : rel;
  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }

      onClick?.(event);
    },
    [disabled, onClick],
  );

  return (
    <a
      {...restProps}
      ref={ref}
      aria-disabled={disabled || undefined}
      className={cn(
        linkStyles({ variant, size, underline, inverted, disabled, truncate }),
        className,
      )}
      href={disabled ? undefined : href}
      onClick={handleClick}
      rel={safeRel}
      target={target}
    >
      {LeadingIcon && (
        <LeadingIcon
          aria-hidden='true'
          className={cn(linkIconStyles({ size }))}
          focusable='false'
        />
      )}
      <span className={cn(linkLabelStyles({ truncate }))}>{children}</span>
      {EndIcon && (
        <EndIcon
          aria-hidden='true'
          className={cn(linkIconStyles({ size }))}
          focusable='false'
        />
      )}
    </a>
  );
};
