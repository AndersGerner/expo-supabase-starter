import { t } from '@/lib/localization';
import tw from '@/lib/tailwind';
import { MaterialIcons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { AccessibilityProps } from 'react-native';

export type MaterialIconNames = keyof typeof MaterialIcons.glyphMap;

interface IIconProps extends AccessibilityProps {
  name: MaterialIconNames;
  size?: number;
  color?: string;
}

export const Icon: React.FC<IIconProps> = memo(
  ({
    name,
    size = 24,
    color = tw.color('foreground'),

    accessibilityLabel,
  }) => {
    const actualAccessibilityLabel =
      accessibilityLabel || t(`accessibility.icon`);

    return (
      <MaterialIcons
        name={name}
        size={size}
        color={color}
        accessibilityRole="imagebutton"
        accessibilityLabel={actualAccessibilityLabel}
      />
    );
  },
);

export default Icon;
