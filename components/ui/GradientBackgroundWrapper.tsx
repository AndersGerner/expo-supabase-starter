import tw from '@/lib/tailwind';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo } from 'react';
import { View } from 'react-native';

interface IGradientBackgroundWrapperProps {
  children: React.ReactNode;
  variant?: 'default' | 'inverse';
  direction?: 'horizontal' | 'vertical';
}

export const GradientBackgroundWrapper: React.FC<
  IGradientBackgroundWrapperProps
> = ({ children, variant = 'default', direction = 'horizontal' }) => {
  const firstColor = tw.color('muted') ?? '#000000';
  const secondColor = tw.color('muted-foreground') ?? '#ffffff';

  const gradientColors = useMemo(() => {
    return variant === 'inverse'
      ? [secondColor, firstColor]
      : [firstColor, secondColor];
  }, [firstColor, secondColor, variant]);

  const start = direction === 'horizontal' ? { x: 0, y: 0 } : { x: 0, y: 1 };
  const end = direction === 'horizontal' ? { x: 1, y: 0 } : { x: 1, y: 1 };

  return (
    <View style={tw`absolute inset-0 flex-1`}>
      <LinearGradient
        colors={gradientColors}
        start={start}
        end={end}
        style={tw`flex-1`}
      >
        {children}
      </LinearGradient>
    </View>
  );
};

export default React.memo(GradientBackgroundWrapper);
