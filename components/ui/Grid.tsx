import tw from '@/lib/tailwind';
import React from 'react';
import { View, ViewStyle } from 'react-native';

interface IGridProps {
  children: React.ReactNode;
  variant?: 'default' | 'spaced';
  columns?: 1 | 2 | 3 | 4;
}

export const Grid: React.FC<IGridProps> = ({
  children,
  variant = 'default',
  columns = 1,
}) => {
  const gridStyle: ViewStyle = {
    ...tw`flex flex-wrap`,
  };

  if (variant === 'spaced') {
    gridStyle.marginHorizontal = 16;
    gridStyle.marginVertical = 16;
  }

  switch (columns) {
    case 2:
      gridStyle.width = '50%';
      break;
    case 3:
      gridStyle.width = '33.33%';
      break;
    case 4:
      gridStyle.width = '25%';
      break;
    default:
      break;
  }

  return <View style={gridStyle}>{children}</View>;
};

export default Grid;
