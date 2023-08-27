// DynamicGradientBackground.js
import tw from '@/lib/tailwind';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export const GradientBackgroundWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const firstColor = tw.color('muted') ?? '#000000';
  const secondColor = tw.color('muted-foreground') ?? '#ffffff';
  const gradientColors = [firstColor, secondColor];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {children}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  gradient: {
    flex: 1,
  },
});
