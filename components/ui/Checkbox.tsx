import tw from '@/lib/tailwind';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface ICheckboxProps {
  isChecked: boolean;
  onToggle: () => void;
}

export const Checkbox: React.FC<ICheckboxProps> = ({ isChecked, onToggle }) => {
  return (
    <TouchableOpacity onPress={onToggle}>
      <View style={tw`w-6 h-6 border rounded`}>
        {isChecked && <View style={tw`flex-1 bg-primary rounded`} />}
      </View>
    </TouchableOpacity>
  );
};
