import tw from '@/lib/tailwind';
import React from 'react';
import { Image, StyleProp, Text, View, ViewStyle } from 'react-native';

interface IAvatarProps {
  imageUri?: string;
  name?: string;
  size?: 'small' | 'medium' | 'large';
  style?: StyleProp<ViewStyle>;
}

export const Avatar: React.FC<IAvatarProps> = ({
  imageUri,
  name,
  size = 'medium',
  style,
}) => {
  let sizeStyle = tw`w-10 h-10`; // Default to medium
  if (size === 'small') {
    sizeStyle = tw`w-8 h-8`;
  } else if (size === 'large') {
    sizeStyle = tw`w-12 h-12`;
  }

  return (
    <View style={[tw`rounded-full overflow-hidden`, sizeStyle, style]}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={tw`w-full h-full`} />
      ) : (
        <View style={tw`flex-1 justify-center items-center bg-gray-300`}>
          <Text style={tw`text-white`}>{name?.charAt(0).toUpperCase()}</Text>
        </View>
      )}
    </View>
  );
};
