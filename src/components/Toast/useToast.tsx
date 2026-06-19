import { toast, type ToasterProps } from 'sonner';

import { Alert, type AlertProps } from '../Alert';

export interface ToastProps extends AlertProps {
  duration?: number;
  position?: ToasterProps['position'];
  dismissable?: boolean;
}

export const useToast = () => {
  const showToast = (props: ToastProps) => {
    const {
      duration = 5000,
      position,
      dismissable,
      children,
      ...alertProps
    } = props;
    const toastOptions = position ? { duration, position } : { duration };

    return toast.custom((toastId: string | number) => {
      const closeProps = dismissable
        ? { onClose: () => toast.dismiss(toastId) }
        : {};

      return (
        <Alert {...alertProps} {...closeProps}>
          {children}
        </Alert>
      );
    }, toastOptions);
  };

  return {
    toast: showToast,
    default: (props: Omit<ToastProps, 'variant'>) =>
      showToast({ ...props, variant: 'default' }),
    primary: (props: Omit<ToastProps, 'variant'>) =>
      showToast({ ...props, variant: 'primary' }),
    info: (props: Omit<ToastProps, 'variant'>) =>
      showToast({ ...props, variant: 'info' }),
    success: (props: Omit<ToastProps, 'variant'>) =>
      showToast({ ...props, variant: 'success' }),
    warning: (props: Omit<ToastProps, 'variant'>) =>
      showToast({ ...props, variant: 'warning' }),
    danger: (props: Omit<ToastProps, 'variant'>) =>
      showToast({ ...props, variant: 'danger' }),
    error: (props: Omit<ToastProps, 'variant'>) =>
      showToast({ ...props, variant: 'danger' }),
    dismiss: toast.dismiss,
  };
};
