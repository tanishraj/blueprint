import { createPortal } from 'react-dom';
import type { FC } from 'react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

import './Toaster.css';

export const Toaster: FC<ToasterProps> = props => {
  const toasterContent = (
    <Sonner
      {...props}
      position='bottom-right'
      className='toast'
      toastOptions={{
        className: 'w-full rounded-md border-none p-0 shadow-lg',
      }}
    />
  );

  if (typeof window === 'undefined') {
    return toasterContent;
  }

  return createPortal(toasterContent, document.body);
};
