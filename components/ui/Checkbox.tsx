import { t } from '@/lib/localization';
import tw from '@/lib/tailwind';
import React, { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Typography } from './Typography';

export interface ICheckboxProps {
  isChecked: boolean;
  onToggle: () => void;
  label?: string;
  variant?: 'default' | 'secondary';
}

export const Checkbox: React.FC<ICheckboxProps> = ({
  isChecked,
  onToggle,
  label,
  variant = 'default',
}) => {
  const checkboxStyle = useMemo(() => {
    switch (variant) {
      case 'default':
        return tw`w-6 h-6 border rounded`;
      case 'secondary':
        return tw`w-6 h-6 border-2 border-secondary rounded-lg`;
      default:
        return tw`w-6 h-6 border rounded`;
    }
  }, [variant]);

  const accessibilityLabel = isChecked
    ? t('accessibility.checkbox.checked')
    : t('accessibility.checkbox.unchecked');

  return (
    <TouchableOpacity
      onPress={onToggle}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isChecked }}
      accessibilityLabel={accessibilityLabel}
    >
      <View style={tw`flex-row items-center`}>
        <View style={checkboxStyle}>
          {isChecked && <View style={tw`flex-1 bg-primary rounded`} />}
        </View>
        {label && (
          <Typography variant="body" style={tw`ml-2`}>
            {label}
          </Typography>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(Checkbox);
