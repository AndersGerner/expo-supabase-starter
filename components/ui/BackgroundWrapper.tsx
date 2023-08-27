import tw from '@/lib/tailwind';
import React, { useMemo } from 'react';
import { View } from 'react-native';

interface IBackgroundWrapperProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary';
}

const BackgroundWrapper: React.FC<IBackgroundWrapperProps> = ({
  children,
  variant = 'default',
}) => {
  const backgroundColor = useMemo(() => {
    switch (variant) {
      case 'default':
        return tw.color('background') ?? '#ffffff';
      case 'secondary':
        return tw.color('background-secondary') ?? '#f0f0f0';
      default:
        return '#ffffff';
    }
  }, [variant]);

  return (
    <View
      style={[tw`flex-1`, { backgroundColor }]}
      accessibilityRole="none" // purely decorative
    >
      {children}
    </View>
  );
};

export default React.memo(BackgroundWrapper);
