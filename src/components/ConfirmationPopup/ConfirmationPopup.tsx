import {
  cloneElement,
  type FC,
  isValidElement,
  type MouseEvent,
  type ReactElement,
  useCallback,
  useRef,
  useState,
} from 'react';
import {
  arrow,
  autoUpdate,
  FloatingArrow,
  FloatingPortal,
  flip,
  offset,
  type Placement,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from 'lucide-react';

import { cn } from '@/utils';

import { Button } from '../Button';
import type { ButtonSizes } from '../Button';
import {
  confirmationPopupArrowStyles,
  confirmationPopupBodyStyles,
  confirmationPopupCloseButtonStyles,
  confirmationPopupCloseIconStyles,
  confirmationPopupDescriptionStyles,
  confirmationPopupFooterStyles,
  confirmationPopupHeaderStyles,
  confirmationPopupIconStyles,
  confirmationPopupPanelStyles,
  confirmationPopupRootStyles,
  confirmationPopupTitleStyles,
  confirmationPopupTitleWrapperStyles,
  confirmationPopupTriggerStyles,
} from './ConfirmationPopup.styles';
import type {
  ConfirmationPopupProps,
  ConfirmationPopupSizes,
  ConfirmationPopupVariants,
} from './types';

interface ConfirmationPopupTriggerElementProps {
  'aria-expanded'?: boolean;
  className?: string;
  onClick?: (event: MouseEvent<Element>) => void;
  ref?: (node: HTMLElement | null) => void;
}

const variantIconMap = {
  default: Info,
  primary: Info,
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  danger: CircleAlert,
} satisfies Record<NonNullable<ConfirmationPopupVariants>, typeof Info>;

const defaultButtonSizeByPopupSize: Record<
  NonNullable<ConfirmationPopupSizes>,
  ButtonSizes
> = {
  sm: 'sm',
  md: 'sm',
  lg: 'md',
};

export const ConfirmationPopup: FC<ConfirmationPopupProps> = ({
  trigger,
  title,
  description,
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  onClose,
  onCancel,
  onAction,
  placement = 'bottom',
  align = 'center',
  size = 'md',
  variant = 'default',
  closeLabel = 'Close confirmation popup',
  cancelLabel = 'Cancel',
  actionLabel = 'Action',
  closeOnEscape = true,
  closeOnOutsideClick = true,
  closeOnCancel = true,
  closeOnAction = true,
  showArrow = true,
  showCloseButton = true,
  showCancelButton = true,
  showActionButton = true,
  leadingIcon,
  className,
  contentClassName,
  triggerClassName,
  bodyClassName,
  footerClassName,
  actionButtonProps,
  cancelButtonProps,
  ...restProps
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const arrowRef = useRef<SVGSVGElement | null>(null);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : uncontrolledOpen;
  const Icon = leadingIcon ?? variantIconMap[variant];
  const floatingPlacement = (
    align === 'center' ? placement : `${placement}-${align}`
  ) as Placement;

  const setPopupOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }

      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  const handleDismiss = useCallback(() => {
    setPopupOpen(false);
    onClose?.();
  }, [onClose, setPopupOpen]);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: nextOpen => {
      if (nextOpen) {
        setPopupOpen(true);
        return;
      }

      handleDismiss();
    },
    placement: floatingPlacement,
    transform: false,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(10),
      flip(),
      shift({ padding: 8 }),
      // eslint-disable-next-line react-hooks/refs -- Floating UI arrow middleware accepts the ref object directly.
      arrow({ element: arrowRef }),
    ],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context, {
    escapeKey: closeOnEscape,
    outsidePress: closeOnOutsideClick,
  });
  const role = useRole(context, { role: 'dialog' });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const handleCloseClick = useCallback(() => {
    handleDismiss();
  }, [handleDismiss]);

  const handleCancelClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      cancelButtonProps?.onClick?.(event);
      onCancel?.(event);

      if (closeOnCancel) {
        handleDismiss();
      }
    },
    [cancelButtonProps, closeOnCancel, handleDismiss, onCancel],
  );

  const handleActionClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      actionButtonProps?.onClick?.(event);
      onAction?.(event);

      if (closeOnAction) {
        handleDismiss();
      }
    },
    [actionButtonProps, closeOnAction, handleDismiss, onAction],
  );

  const renderTrigger = () => {
    if (!trigger) {
      return null;
    }

    if (isValidElement<ConfirmationPopupTriggerElementProps>(trigger)) {
      const triggerElement =
        trigger as ReactElement<ConfirmationPopupTriggerElementProps>;

      return cloneElement(
        triggerElement,
        getReferenceProps({
          ref: refs.setReference,
          'aria-expanded': isOpen,
          className: cn(triggerElement.props.className, triggerClassName),
          onClick: event => {
            triggerElement.props.onClick?.(event);
          },
        }),
      );
    }

    return (
      <Button
        {...getReferenceProps({
          ref: refs.setReference,
          'aria-expanded': isOpen,
          className: cn(confirmationPopupTriggerStyles(), triggerClassName),
        })}
        type='button'
      >
        {trigger}
      </Button>
    );
  };

  return (
    <div className={cn(confirmationPopupRootStyles(), className)}>
      {renderTrigger()}
      {isOpen && (
        <FloatingPortal>
          <div
            {...getFloatingProps({
              ...restProps,
              ref: refs.setFloating,
              className: cn(
                confirmationPopupPanelStyles({ size }),
                contentClassName,
              ),
              style: {
                ...floatingStyles,
                ...restProps.style,
              },
            })}
          >
            {showArrow && (
              <FloatingArrow
                ref={arrowRef}
                className={cn(confirmationPopupArrowStyles())}
                context={context}
                data-confirmation-popup-arrow=''
                height={7}
                stroke='currentColor'
                strokeWidth={0.5}
                width={14}
              />
            )}
            <div className={cn(confirmationPopupHeaderStyles({ size }))}>
              <div
                className={cn(confirmationPopupTitleWrapperStyles({ size }))}
              >
                <Icon
                  aria-hidden='true'
                  className={cn(confirmationPopupIconStyles({ size, variant }))}
                  data-confirmation-popup-title-icon=''
                />
                {title ? (
                  <div className={cn(confirmationPopupTitleStyles({ size }))}>
                    {title}
                  </div>
                ) : null}
              </div>
              {showCloseButton ? (
                <button
                  aria-label={closeLabel}
                  className={cn(confirmationPopupCloseButtonStyles({ size }))}
                  onClick={handleCloseClick}
                  type='button'
                >
                  <X
                    aria-hidden='true'
                    className={cn(confirmationPopupCloseIconStyles({ size }))}
                  />
                </button>
              ) : null}
            </div>
            <div
              className={cn(
                confirmationPopupBodyStyles({ size }),
                bodyClassName,
              )}
            >
              {description ? (
                <p className={cn(confirmationPopupDescriptionStyles({ size }))}>
                  {description}
                </p>
              ) : null}
              {children}
            </div>
            {(showCancelButton || showActionButton) && (
              <div
                className={cn(
                  confirmationPopupFooterStyles({ size }),
                  footerClassName,
                )}
              >
                {showCancelButton ? (
                  <Button
                    {...cancelButtonProps}
                    appearance={cancelButtonProps?.appearance ?? 'ghost'}
                    onClick={handleCancelClick}
                    shape={cancelButtonProps?.shape ?? 'squared'}
                    size={
                      cancelButtonProps?.size ??
                      defaultButtonSizeByPopupSize[size]
                    }
                    type={cancelButtonProps?.type ?? 'button'}
                    variant={cancelButtonProps?.variant ?? 'default'}
                  >
                    {cancelButtonProps?.children ?? cancelLabel}
                  </Button>
                ) : null}
                {showActionButton ? (
                  <Button
                    {...actionButtonProps}
                    appearance={actionButtonProps?.appearance ?? 'filled'}
                    onClick={handleActionClick}
                    shape={actionButtonProps?.shape ?? 'squared'}
                    size={
                      actionButtonProps?.size ??
                      defaultButtonSizeByPopupSize[size]
                    }
                    type={actionButtonProps?.type ?? 'button'}
                    variant={actionButtonProps?.variant ?? variant}
                  >
                    {actionButtonProps?.children ?? actionLabel}
                  </Button>
                ) : null}
              </div>
            )}
          </div>
        </FloatingPortal>
      )}
    </div>
  );
};
