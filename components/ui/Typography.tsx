// src/components/ui/Typography.tsx
import tw from '@/lib/tailwind';
import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

export type TypographyVariants =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'caption'
  | 'button';

interface ITypographyProps {
  variant?: TypographyVariants;
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const variantStyles: Record<TypographyVariants, TextStyle> = {
  h1: tw`text-5xl font-bold`,
  h2: tw`text-4xl font-bold`,
  h3: tw`text-3xl font-bold`,
  h4: tw`text-2xl font-semibold`,
  h5: tw`text-xl font-medium`,
  h6: tw`text-lg font-medium`,
  body: tw`text-base`,
  caption: tw`text-sm`,
  button: tw`text-base font-semibold`,
};

export const Typography: React.FC<ITypographyProps> = ({
  variant = 'body',
  children,
  style,
}) => {
  return <Text style={[variantStyles[variant], style]}>{children}</Text>;
};
