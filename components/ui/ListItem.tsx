import tw from '@/lib/tailwind';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface IListItemProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
}

export const ListItem: React.FC<IListItemProps> = ({
  title,
  subtitle,
  onPress,
}) => {
  const accessibilityLabel = `${title}${subtitle ? `, ${subtitle}` : ''}`;

  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      <View style={tw`flex-row items-center p-4`}>
        <Text style={tw`text-lg`}>{title}</Text>
        {subtitle && <Text style={tw`text-sm ml-2`}>{subtitle}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ListItem);
