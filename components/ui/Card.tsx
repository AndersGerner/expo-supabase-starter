import tw from '@/lib/tailwind';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface ICardProps {
  headline: string;
  bodyText: string;
  bodyImage?: string;
  onPress?: () => void;
}

export const Card: React.FC<ICardProps> = ({
  headline,
  bodyText,
  bodyImage,
  onPress,
}) => {
  const cardContent = (
    <>
      <Text style={tw`font-bold text-lg mb-2`}>{headline}</Text>
      {bodyImage && (
        <Image source={{ uri: bodyImage }} style={tw`w-full h-40`} />
      )}
      <Text style={tw`text-base`}>{bodyText}</Text>
    </>
  );

  return (
    <View style={tw`w-full md:w-1/2 p-4`}>
      {onPress ? (
        <TouchableOpacity onPress={onPress} style={tw`p-4 border rounded-md`}>
          {cardContent}
        </TouchableOpacity>
      ) : (
        <View style={tw`p-4 border rounded-md`}>{cardContent}</View>
      )}
    </View>
  );
};
