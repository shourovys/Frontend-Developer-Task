import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import LoadingTextWithSvg from './LoadingTextWithSvg';

export type TButtonSize = 'sm' | 'default' | 'lg' | 'icon';
export type TButtonColor = 'primary' | 'outline';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: TButtonSize;
  color?: TButtonColor;
  isLoading?: boolean;
  link?: string;
}

function Button({
  type = 'button',
  size = 'default',
  color = 'primary',
  isLoading,
  disabled,
  link,
  onClick,
  className,
  children,
  style,
}: IProps) {
  const buttonClassNames = cn(
    'inline-flex gap-1.5 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    size === 'default' &&
      'h-8 md:h-10 px-2 md:px-4 py-1 md:py-2 text-sm md:text-[15px]',
    size === 'sm' && 'h-7 md:h-9 rounded-md px-1.5 md:px-3',
    size === 'lg' && 'h-9 md:h-11 rounded-md px-4 md:px-8',
    size === 'icon' && 'h-8 md:h-10 w-8 md:w-10',

    color === 'primary' &&
      `border border-primary bg-primary text-btnPrimaryText hover:bg-primary/90 ${
        !disabled && 'hover:bg-btnPrimaryText hover:text-primary'
      }`,

    color === 'outline' &&
      `border border-buttonBorder bg-btnOutlineBg text-btnOutlineText ${
        !disabled && 'hover:bg-btnOutlineText hover:text-btnOutlineBg'
      }`,

    isLoading ? 'cursor-wait' : disabled ? 'cursor-auto' : 'cursor-pointer',
    disabled ? 'opacity-50 cursor-auto' : 'hover:shadow-all-side',
    className
  );

  if (disabled) {
    return (
      <button className={buttonClassNames} type={type} style={style}>
        {isLoading ? <LoadingTextWithSvg size={size} /> : children}
      </button>
    );
  }

  if (link) {
    return (
      <Link href={link} className={buttonClassNames} style={style}>
        {isLoading ? <LoadingTextWithSvg size={size} /> : children}
      </Link>
    );
  }
  return (
    <button
      className={buttonClassNames}
      type={type}
      onClick={onClick}
      style={style}
    >
      {isLoading ? <LoadingTextWithSvg size={size} /> : children}
    </button>
  );
}

export default Button;
