import { type MouseEvent, useCallback } from 'react';
import { ExternalLink } from 'lucide-react';

import { cn } from '@/utils/classNames';

import { linkIconStyles, linkLabelStyles, linkStyles } from './Link.styles';
import type { LinkProps } from './types';

const getSafeRel = (target: LinkProps['target'], rel: LinkProps['rel']) => {
  if (target !== '_blank') {
    return rel;
  }

  const relValues = new Set((rel ?? '').split(/\s+/).filter(Boolean));

  relValues.add('noreferrer');
  relValues.add('noopener');

  return Array.from(relValues).join(' ');
};

export function Link({
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
}: LinkProps) {
  const EndIcon = external ? ExternalLink : TrailingIcon;
  const safeRel = getSafeRel(target, rel);
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
      tabIndex={disabled ? -1 : restProps.tabIndex}
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
}
