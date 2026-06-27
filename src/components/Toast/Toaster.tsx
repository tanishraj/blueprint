import { createPortal } from 'react-dom';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

import { cn } from '@/utils/classNames';

import './Toaster.css';

const defaultToastClassName = 'w-full rounded-md border-none p-0 shadow-lg';

export function Toaster({
  className,
  position = 'bottom-right',
  toastOptions,
  ...restProps
}: ToasterProps) {
  const toasterContent = (
    <Sonner
      {...restProps}
      position={position}
      className={cn('toast', className)}
      toastOptions={{
        ...toastOptions,
        className: cn(defaultToastClassName, toastOptions?.className),
      }}
    />
  );

  if (typeof window === 'undefined') {
    return toasterContent;
  }

  return createPortal(toasterContent, document.body);
}
