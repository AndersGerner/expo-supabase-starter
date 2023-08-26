import tw from '@/lib/tailwind';
import React from 'react';
import { Modal as RNModal, View } from 'react-native';

interface IModalProps {
  isVisible: boolean;
  children: React.ReactNode;
}

export const Modal: React.FC<IModalProps> = ({ isVisible, children }) => {
  return (
    <RNModal visible={isVisible} transparent>
      <View
        style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
      >
        <View style={tw`bg-white p-4 rounded`}>{children}</View>
      </View>
    </RNModal>
  );
};
