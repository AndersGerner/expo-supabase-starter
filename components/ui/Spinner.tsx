import tw from '@/lib/tailwind';
import React from 'react';
import { ActivityIndicator } from 'react-native';

export const Spinner: React.FC = () => {
  return <ActivityIndicator size="large" color={tw.color('primary')} />;
};
