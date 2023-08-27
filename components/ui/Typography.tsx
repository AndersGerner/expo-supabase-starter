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
  | 'button'
  | 'error';

interface ITypographyProps {
  variant?: TypographyVariants;
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  color?: string;
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize';
  accessibilityLabel?: string;
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
  error: tw`text-base text-red-600`,
};

export const Typography: React.FC<ITypographyProps> = ({
  variant = 'body',
  children,
  style,
  color,
  textTransform,
  accessibilityLabel,
}) => {
  const textStyle: TextStyle = {
    ...variantStyles[variant],
    color,
    textTransform,
  };

  return (
    <Text
      style={[textStyle, style]}
      accessibilityRole="text"
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </Text>
  );
};

export default React.memo(Typography);
