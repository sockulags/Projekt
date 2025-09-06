import React from 'react';

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: 'p' | 'span' | 'div';
  size?: 'sm' | 'md' | 'lg';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

const sizeMap: Record<NonNullable<TextProps['size']>, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

const weightMap: Record<NonNullable<TextProps['weight']>, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

export const Text: React.FC<TextProps> = ({
  as = 'p',
  size = 'md',
  weight = 'normal',
  className = '',
  children,
  ...rest
}) => {
  const Comp = as as any;
  const classes = [sizeMap[size], weightMap[weight], className].filter(Boolean).join(' ');
  return (
    <Comp className={classes} {...rest}>
      {children}
    </Comp>
  );
};
