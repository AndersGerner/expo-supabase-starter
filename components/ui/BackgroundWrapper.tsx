import tw from '@/lib/tailwind';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export const BackgroundWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const backgroundColor = tw.color('background') ?? '#ffffff';

  return (
    <View style={[styles.container, { backgroundColor }]}>{children}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
