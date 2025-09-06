import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  radius?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'subtle' | 'outline';
}

const shadowMap: Record<NonNullable<CardProps['shadow']>, string> = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow',
  lg: 'shadow-lg',
};

const paddingMap: Record<NonNullable<CardProps['padding']>, string> = {
  none: 'p-0',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
};

const radiusMap: Record<NonNullable<CardProps['radius']>, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
};

const variantMap: Record<NonNullable<CardProps['variant']>, string> = {
  default: 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800',
  subtle: 'bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800',
  outline: 'bg-transparent border border-neutral-300 dark:border-neutral-700',
};

export const Card: React.FC<CardProps> = ({
  shadow = 'sm',
  padding = 'md',
  radius = 'md',
  variant = 'default',
  className = '',
  children,
  ...rest
}) => {
  const classes = [
    'transition-colors',
    shadowMap[shadow],
    paddingMap[padding],
    radiusMap[radius],
    variantMap[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
