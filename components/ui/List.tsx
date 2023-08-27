import tw from '@/lib/tailwind';
import React from 'react';
import { View, ViewStyle } from 'react-native';

interface IListProps {
  children: React.ReactNode;
  spacing?: 'none' | 'small' | 'medium' | 'large';
  align?: 'left' | 'center' | 'right';
}

export const List: React.FC<IListProps> = ({
  children,
  spacing = 'none',
  align = 'left',
}) => {
  const baseStyle: ViewStyle = tw`flex-col`;

  const spacingStyle: ViewStyle = {
    none: {},
    small: tw`space-y-2`,
    medium: tw`space-y-4`,
    large: tw`space-y-8`,
  }[spacing];

  const alignStyle: ViewStyle = {
    left: tw`items-start`,
    center: tw`items-center`,
    right: tw`items-end`,
  }[align];

  return <View style={[baseStyle, spacingStyle, alignStyle]}>{children}</View>;
};
