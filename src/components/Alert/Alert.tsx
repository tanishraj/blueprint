import { X } from 'lucide-react';
import { FC, ReactNode, SVGProps } from 'react';
import { type VariantProps } from 'class-variance-authority';

import { cn, RemoveNull } from '@/utils';

import {
  alertCloseButtonStyles,
  alertContentWrapperStyles,
  alertDescriptionStyles,
  alertIconStyles,
  alertTitleStyles,
  alertWrapperStyles,
} from './Alert.styles';

export interface AlertProps extends RemoveNull<
  VariantProps<typeof alertWrapperStyles>
> {
  title?: string;
  icon?: FC<SVGProps<SVGSVGElement>>;
  children?: ReactNode;
  onClose?: () => void;
}

export const Alert: FC<AlertProps> = ({
  variant,
  appearance,
  size,
  title,
  icon: Icon,
  children,
  onClose,
  ...restProps
}) => {
  const alertWrapperClassName = cn(
    alertWrapperStyles({
      variant,
      appearance,
      size,
    }),
  );
  const alertContentWrapperClassName = cn(
    alertContentWrapperStyles({
      variant,
      appearance,
      size,
    }),
  );
  const alertTitleClassName = cn(
    alertTitleStyles({
      variant,
      appearance,
      size,
    }),
  );
  const alertDescriptionClassName = cn(
    alertDescriptionStyles({
      appearance,
      variant,
      size,
    }),
  );
  const alertIconClassName = cn(alertIconStyles({ variant, appearance, size }));
  const alertCloseButtonClassName = cn(
    alertCloseButtonStyles({
      appearance,
      variant,
      size,
    }),
  );
  return (
    <div {...restProps} className={alertWrapperClassName}>
      <div>
        {Icon && <Icon className={alertIconClassName} strokeWidth={1} />}
      </div>
      <div className={alertContentWrapperClassName}>
        <div className={alertTitleClassName}>{title}</div>
        <div className={alertDescriptionClassName}>{children}</div>
      </div>
      {onClose && <X className={alertCloseButtonClassName} onClick={onClose} />}
    </div>
  );
};
