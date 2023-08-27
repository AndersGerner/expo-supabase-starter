import tw from '@/lib/tailwind';
import React from 'react';
import { Switch, View } from 'react-native';

interface ISwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const CustomSwitch: React.FC<ISwitchProps> = ({ value, onValueChange }) => {
  return (
    <View style={tw`flex-row items-center`}>
      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={tw.color('primary')}
        trackColor={{ false: tw.color('gray-300'), true: tw.color('primary') }}
      />
    </View>
  );
};

export { CustomSwitch as Switch };
