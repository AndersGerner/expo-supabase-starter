import tw from '@/lib/tailwind';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export interface IRadioButtonProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

export const RadioButton: React.FC<IRadioButtonProps> = ({
  options,
  selectedOption,
  onSelect,
}) => {
  return (
    <View>
      {options.map((option, index) => (
        <TouchableOpacity key={index} onPress={() => onSelect(option)}>
          <View style={tw`flex-row items-center`}>
            <View style={tw`w-6 h-6 border rounded-full`}>
              {selectedOption === option && (
                <View style={tw`flex-1 bg-primary rounded-full`} />
              )}
            </View>
            <Text style={tw`ml-2`}>{option}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
