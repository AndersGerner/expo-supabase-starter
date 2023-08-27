import tw from '@/lib/tailwind';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface IAccordionProps {
  title: string;
  content: string;
}

export const Accordion: React.FC<IAccordionProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        <Text style={tw`p-2 font-bold`}>{title}</Text>
      </TouchableOpacity>
      {isOpen && <Text style={tw`p-2`}>{content}</Text>}
    </View>
  );
};
