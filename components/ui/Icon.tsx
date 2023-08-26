import tw from '@/lib/tailwind';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';

type MaterialIconNames = keyof typeof MaterialIcons.glyphMap;

interface IIconProps {
  name: MaterialIconNames;
  size?: number;
  color?: string;
}

export const Icon: React.FC<IIconProps> = ({
  name,
  size = 24,
  color = tw.color('foreground'),
}) => {
  return <MaterialIcons name={name} size={size} color={color} />;
};
