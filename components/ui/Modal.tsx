import { t } from '@/lib/localization';
import tw from '@/lib/tailwind';
import React, { useCallback } from 'react';
import { Modal as RNModal, Text, TouchableOpacity, View } from 'react-native';

interface IModalProps {
  isVisible: boolean;
  children: React.ReactNode;
  dismissable?: boolean;
  onClose?: () => void;
}

export const Modal: React.FC<IModalProps> = ({
  isVisible,
  children,
  dismissable = true,
  onClose,
}) => {
  const handleOutsidePress = useCallback(() => {
    if (dismissable && onClose) {
      onClose();
    }
  }, [dismissable, onClose]);

  return (
    <RNModal visible={isVisible} transparent>
      <TouchableOpacity
        style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
        onPress={handleOutsidePress}
        accessible
        accessibilityLabel={t('accessibility.modal.label')}
      >
        <View
          style={tw`bg-white p-4 rounded`}
          onStartShouldSetResponder={() => true} // To prevent outsidePress from triggering when clicking inside the modal
        >
          {children}
          {dismissable && (
            <TouchableOpacity onPress={onClose}>
              <Text style={tw`text-primary`}>
                {t('accessibility.modal.close')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </RNModal>
  );
};

export default React.memo(Modal);
