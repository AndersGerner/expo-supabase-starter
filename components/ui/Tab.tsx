import tw from '@/lib/tailwind';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ITabProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Tab: React.FC<ITabProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <View style={tw`flex-row`}>
      {tabs.map((tab, index) => (
        <TouchableOpacity key={index} onPress={() => onTabChange(tab)}>
          <Text
            style={[
              tw`p-2`,
              activeTab === tab ? tw`border-b-2 border-primary` : {},
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
