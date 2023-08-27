import tw from '@/lib/tailwind';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ISnackbarProps {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  duration?: number;
  onHide?: () => void;
}

export const Snackbar: React.FC<ISnackbarProps> = ({
  message,
  actionLabel,
  onAction,
  duration = 2000,
  onHide,
}) => {
  const accessibilityMessage = message;
  const accessbilityActionLabel = actionLabel ? actionLabel : '';

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (duration) {
      timer = setTimeout(() => {
        if (onHide) {
          onHide();
        }
      }, duration);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [duration, onHide]);

  return (
    <View
      style={tw`flex-row justify-between items-center bg-black p-4 rounded`}
      accessibilityLiveRegion="polite"
    >
      <Text style={tw`text-white`}>{accessibilityMessage}</Text>
      {actionLabel && (
        <TouchableOpacity
          onPress={onAction}
          accessibilityRole="button"
          accessibilityLabel={accessbilityActionLabel}
        >
          <Text style={tw`text-primary`}>{accessbilityActionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default React.memo(Snackbar);
