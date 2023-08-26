import tw from '@/lib/tailwind';
import React from 'react';
import { View } from 'react-native';

interface IListProps {
  children: React.ReactNode;
  columns?: 1 | 2;
}

export const List: React.FC<IListProps> = ({ children, columns = 1 }) => {
  const listStyle = columns === 2 ? tw`flex-row flex-wrap` : tw`flex-col`;

  return <View style={listStyle}>{children}</View>;
};
