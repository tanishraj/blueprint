import { type FC, useCallback, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

import { cn } from '@/utils';

import { AnimatePresence, AnimatePresenceChild } from '../AnimatePresence';
import { Portal } from '../Portal';
import {
  modalBodyStyles,
  modalCloseButtonStyles,
  modalCloseIconStyles,
  modalDescriptionStyles,
  modalFooterStyles,
  modalHeaderContentStyles,
  modalHeaderStyles,
  modalLeadingIconStyles,
  modalOverlayStyles,
  modalPanelStyles,
  modalPortalRootStyles,
  modalPositionerStyles,
  modalTitleGroupStyles,
  modalTitleStyles,
} from './Modal.styles';
import type { ModalProps } from './types';

const MODAL_EXIT_DURATION_MS = 200;

export const Modal: FC<ModalProps> = ({
  open,
  children,
  title,
  description,
  footer,
  onClose,
  size = 'md',
  closeLabel = 'Close modal',
  closeOnEscape = true,
  closeOnOverlayClick = true,
  container,
  containerId,
  containerRef,
  disablePortal = false,
  leadingIcon: LeadingIcon,
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

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      scrollUnlockTimeoutRef.current = window.setTimeout(() => {
        document.body.style.overflow = originalOverflow;
        scrollUnlockTimeoutRef.current = null;
      }, MODAL_EXIT_DURATION_MS);
    };
  }, [disablePortal, open]);

  const animationState = open ? 'open' : 'closed';
  const hasCustomContainer = Boolean(container || containerId || containerRef);
  const shouldFillViewport = !disablePortal && !hasCustomContainer;
  const hasDescription = Boolean(description);

  return (
    <Portal
      container={container}
      containerId={containerId}
      containerRef={containerRef}
      disabled={disablePortal}
    >
      <AnimatePresence presence={open}>
        <div
          className={cn(modalPortalRootStyles({ portal: shouldFillViewport }))}
        >
          {showOverlay && (
            <AnimatePresenceChild>
              <button
                aria-label='Close modal overlay'
                className={cn(modalOverlayStyles())}
                data-state={animationState}
                onClick={handleOverlayClick}
                type='button'
              />
            </AnimatePresenceChild>
          )}
          <div className={cn(modalPositionerStyles())}>
            <AnimatePresenceChild>
              <div
                {...restProps}
                aria-modal={role === 'dialog' ? true : undefined}
                className={cn(modalPanelStyles({ size }), className)}
                data-state={animationState}
                role={role}
                tabIndex={-1}
              >
                {(title || description || LeadingIcon || showCloseButton) && (
                  <div
                    className={cn(
                      modalHeaderStyles({
                        withDescription: hasDescription,
                      }),
                    )}
                  >
                    <div
                      className={cn(
                        modalHeaderContentStyles({
                          withDescription: hasDescription,
                        }),
                      )}
                    >
                      {LeadingIcon && (
                        <LeadingIcon
                          aria-hidden='true'
                          className={cn(
                            modalLeadingIconStyles({
                              withDescription: hasDescription,
                            }),
                          )}
                        />
                      )}
                      <div className={cn(modalTitleGroupStyles())}>
                        {title && (
                          <div className={cn(modalTitleStyles())}>{title}</div>
                        )}
                        {description && (
                          <div className={cn(modalDescriptionStyles())}>
                            {description}
                          </div>
                        )}
                      </div>
                    </div>
                    {showCloseButton && (
                      <button
                        aria-label={closeLabel}
                        className={cn(modalCloseButtonStyles())}
                        onClick={onClose}
                        type='button'
                      >
                        <X
                          aria-hidden='true'
                          className={cn(modalCloseIconStyles())}
                        />
                      </button>
                    )}
                  </div>
                )}
                <div className={cn(modalBodyStyles())}>{children}</div>
                {footer && (
                  <div className={cn(modalFooterStyles())}>{footer}</div>
                )}
              </div>
            </AnimatePresenceChild>
          </div>
        </div>
      </AnimatePresence>
    </Portal>
  );
};
