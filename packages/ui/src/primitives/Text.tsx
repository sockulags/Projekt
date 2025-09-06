import React from 'react';

// Base styling props
interface TextStyleProps {
  as?: 'p' | 'span' | 'div';
  size?: 'sm' | 'md' | 'lg';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

// Polymorphic helpers
type AsElement = NonNullable<TextStyleProps['as']>;
type ElementProps<T extends AsElement> = T extends 'span'
  ? React.HTMLAttributes<HTMLSpanElement>
  : T extends 'div'
    ? React.HTMLAttributes<HTMLDivElement>
    : React.HTMLAttributes<HTMLParagraphElement>; // default 'p'

export type TextProps<T extends AsElement = 'p'> = TextStyleProps &
  Omit<ElementProps<T>, keyof TextStyleProps | 'as'> & { as?: T };

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

export const Text = <T extends AsElement = 'p'>(props: TextProps<T>) => {
  const {
    as = 'p',
    size = 'md',
    weight = 'normal',
    className = '',
    children,
    ...rest
  } = props as TextProps<T> & {
    children?: React.ReactNode;
  };
  const Comp = as as keyof JSX.IntrinsicElements;
  const classes = [sizeMap[size], weightMap[weight], className].filter(Boolean).join(' ');
  return React.createElement(
    Comp,
    { className: classes, ...(rest as Record<string, unknown>) },
    children,
  );
};

Text.displayName = 'Text';
