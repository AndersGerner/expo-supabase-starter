import tw from '@/lib/tailwind';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

interface ISpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  overlay?: boolean;
}

export const Spinner: React.FC<ISpinnerProps> = ({
  size = 'large',
  color = tw.color('primary'),
  overlay = false,
}) => {
  const spinner = (
    <ActivityIndicator
      size={size}
      color={color}
      accessibilityLabel="Loading..."
      accessibilityRole="progressbar"
    />
  );

  return overlay ? (
    <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
      {spinner}
    </View>
  ) : (
    spinner
  );
};

export default React.memo(Spinner);
