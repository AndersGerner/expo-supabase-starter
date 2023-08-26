import tw from '@/lib/tailwind';
import React from 'react';
import { View } from 'react-native';

interface IGridProps {
  children: React.ReactNode;
}

export const Grid: React.FC<IGridProps> = ({ children }) => {
  return <View style={tw`flex flex-wrap`}>{children}</View>;
};
