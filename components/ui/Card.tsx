import tw from '@/lib/tailwind';
import React, { useMemo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface ICardProps {
  headline: string;
  bodyText: string;
  bodyImage?: string;
  onPress?: () => void;
  variant?: 'default' | 'secondary';
}

const Card: React.FC<ICardProps> = ({
  headline,
  bodyText,
  bodyImage,
  onPress,
  variant = 'default',
}) => {
  const cardStyle = useMemo(() => {
    switch (variant) {
      case 'default':
        return tw`p-4 border rounded-md`;
      case 'secondary':
        return tw`p-4 border-2 border-secondary rounded-lg`;
      default:
        return tw`p-4 border rounded-md`;
    }
  }, [variant]);

  const cardContent = (
    <>
      <Text style={tw`font-bold text-lg mb-2`} accessibilityRole="header">
        {headline}
      </Text>
      {bodyImage && (
        <Image
          source={{ uri: bodyImage }}
          style={tw`w-full h-40`}
          accessibilityRole="image"
          accessible
          accessibilityLabel={`Image for ${headline}`}
        />
      )}
      <Text style={tw`text-base`} accessibilityRole="text">
        {bodyText}
      </Text>
    </>
  );

  return (
    <View style={tw`w-full md:w-1/2 p-4`}>
      {onPress ? (
        <TouchableOpacity
          onPress={onPress}
          style={cardStyle}
          accessibilityRole="button"
          accessible
          accessibilityLabel={`Card for ${headline}`}
        >
          {cardContent}
        </TouchableOpacity>
      ) : (
        <View style={cardStyle}>{cardContent}</View>
      )}
    </View>
  );
};

export default React.memo(Card);
