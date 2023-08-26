import tw from '@/lib/tailwind';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ISnackbarProps {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const Snackbar: React.FC<ISnackbarProps> = ({
  message,
  actionLabel,
  onAction,
}) => {
  return (
    <View
      style={tw`flex-row justify-between items-center bg-black p-4 rounded`}
    >
      <Text style={tw`text-white`}>{message}</Text>
      {actionLabel && (
        <TouchableOpacity onPress={onAction}>
          <Text style={tw`text-primary`}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
