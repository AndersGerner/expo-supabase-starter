import tw from '@/lib/tailwind';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export interface IDropdownProps {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
}

export const Dropdown: React.FC<IDropdownProps> = ({
  options,
  selected,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={tw`relative`}>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        <Text style={tw`border p-2`}>{selected}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={tw`absolute top-0 left-0 mt-12`}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              <Text style={tw`border p-2`}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};
