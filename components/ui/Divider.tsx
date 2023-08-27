import tw from '@/lib/tailwind';
import React from 'react';
import { View } from 'react-native';

export const Separator: React.FC = () => {
  return <View style={tw`h-1 bg-gray-300`} />;
};
