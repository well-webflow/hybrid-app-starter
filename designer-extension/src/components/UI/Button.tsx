import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

type ButtonColor = 'primary' | 'secondary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: IconDefinition;
  className?: string;
  children?: React.ReactNode;
  color?: ButtonColor;
}

export default function Button({
  text,
  icon,
  color = 'secondary',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        {
          'bg-actionPrimaryBackground text-actionPrimaryText hover:text-actionPrimaryTextHover hover:bg-actionPrimaryBackgroundHover':
            color === 'primary',
          'bg-background3 box-shadow text-actionSecondaryText hover:text-actionSecondaryTextHover hover:brightness-110':
            color === 'secondary',
        },
        'px-3 py-2 text-sm rounded-sm flex flex-row gap-3 items-center shadow-sm transition',
        className
      )}
      {...props}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {children}
    </button>
  );
}
