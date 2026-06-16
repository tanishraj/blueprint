import { type FC, useCallback, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

import { cn } from '@/utils';

import { AnimatePresence, AnimatePresenceChild } from '../AnimatePresence';
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

const DRAWER_EXIT_DURATION_MS = 300;

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
  const scrollUnlockTimeoutRef = useRef<ReturnType<
    typeof window.setTimeout
  > | null>(null);

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

    if (scrollUnlockTimeoutRef.current) {
      window.clearTimeout(scrollUnlockTimeoutRef.current);
      scrollUnlockTimeoutRef.current = null;
    }

    const bodyStyle = document.body.style;
    const originalOverflow = bodyStyle.overflow;
    bodyStyle.overflow = 'hidden';

    return () => {
      scrollUnlockTimeoutRef.current = window.setTimeout(() => {
        bodyStyle.overflow = originalOverflow;
        scrollUnlockTimeoutRef.current = null;
      }, DRAWER_EXIT_DURATION_MS);
    };
  }, [disablePortal, open]);

  const animationState = open ? 'open' : 'closed';
  const hasCustomContainer = Boolean(container || containerId || containerRef);
  const shouldFillViewport = !disablePortal && !hasCustomContainer;

  return (
    <Portal
      container={container}
      containerId={containerId}
      containerRef={containerRef}
      disabled={disablePortal}
    >
      <AnimatePresence presence={open}>
        <div
          className={cn(drawerPortalRootStyles({ portal: shouldFillViewport }))}
        >
          {showOverlay && (
            <AnimatePresenceChild>
              <button
                aria-label='Close drawer overlay'
                className={cn(drawerOverlayStyles())}
                data-state={animationState}
                onClick={handleOverlayClick}
                type='button'
              />
            </AnimatePresenceChild>
          )}
          <AnimatePresenceChild>
            <div
              {...restProps}
              aria-modal={role === 'dialog' ? true : undefined}
              className={cn(drawerPanelStyles({ placement, size }), className)}
              data-state={animationState}
              role={role}
              tabIndex={-1}
            >
              {(title || description || showCloseButton) && (
                <div
                  className={cn(
                    drawerHeaderStyles({
                      withDescription: Boolean(description),
                    }),
                  )}
                >
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
              {footer && (
                <div className={cn(drawerFooterStyles())}>{footer}</div>
              )}
            </div>
          </AnimatePresenceChild>
        </div>
      </AnimatePresence>
    </Portal>
  );
};
