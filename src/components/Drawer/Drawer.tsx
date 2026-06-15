import { type FC, useCallback, useEffect } from 'react';
import { X } from 'lucide-react';

import { cn } from '@/utils';

import { Portal } from '../Portal';
import {
  drawerBodyStyles,
  drawerCloseButtonStyles,
  drawerCloseIconStyles,
  drawerDescriptionStyles,
  drawerFooterStyles,
  drawerHeaderContentStyles,
  drawerHeaderStyles,
  drawerOverlayStyles,
  drawerPanelStyles,
  drawerPortalRootStyles,
  drawerTitleStyles,
} from './Drawer.styles';
import type { DrawerProps } from './types';

export const Drawer: FC<DrawerProps> = ({
  open,
  children,
  title,
  description,
  footer,
  onClose,
  placement = 'right',
  size = 'md',
  closeLabel = 'Close drawer',
  closeOnEscape = true,
  closeOnOverlayClick = true,
  container,
  containerId,
  containerRef,
  disablePortal = false,
  showCloseButton = true,
  showOverlay = true,
  role = 'dialog',
  className,
  ...restProps
}) => {
  const handleOverlayClick = useCallback(() => {
    if (closeOnOverlayClick) {
      onClose?.();
    }
  }, [closeOnOverlayClick, onClose]);

  useEffect(() => {
    if (!open || !closeOnEscape) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeOnEscape, onClose, open]);

  useEffect(() => {
    if (!open || disablePortal || typeof document === 'undefined') {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [disablePortal, open]);

  if (!open) {
    return null;
  }

  return (
    <Portal
      container={container}
      containerId={containerId}
      containerRef={containerRef}
      disabled={disablePortal}
    >
      <div className={cn(drawerPortalRootStyles({ portal: !disablePortal }))}>
        {showOverlay && (
          <button
            aria-label='Close drawer overlay'
            className={cn(drawerOverlayStyles())}
            onClick={handleOverlayClick}
            type='button'
          />
        )}
        <div
          {...restProps}
          aria-modal={role === 'dialog' ? true : undefined}
          className={cn(drawerPanelStyles({ placement, size }), className)}
          role={role}
          tabIndex={-1}
        >
          {(title || description || showCloseButton) && (
            <div className={cn(drawerHeaderStyles())}>
              <div className={cn(drawerHeaderContentStyles())}>
                {title && (
                  <div className={cn(drawerTitleStyles())}>{title}</div>
                )}
                {description && (
                  <div className={cn(drawerDescriptionStyles())}>
                    {description}
                  </div>
                )}
              </div>
              {showCloseButton && (
                <button
                  aria-label={closeLabel}
                  className={cn(drawerCloseButtonStyles())}
                  onClick={onClose}
                  type='button'
                >
                  <X
                    aria-hidden='true'
                    className={cn(drawerCloseIconStyles())}
                  />
                </button>
              )}
            </div>
          )}
          <div className={cn(drawerBodyStyles())}>{children}</div>
          {footer && <div className={cn(drawerFooterStyles())}>{footer}</div>}
        </div>
      </div>
    </Portal>
  );
};
