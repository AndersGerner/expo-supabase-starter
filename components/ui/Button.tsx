import tw from '@/lib/tailwind';
import * as React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

export type ButtonVariantTypes =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link';

export interface IButtonProps
  extends React.ComponentProps<typeof TouchableOpacity> {
  variant?: ButtonVariantTypes;
  size?: 'default' | 'sm' | 'lg';
  label?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<IButtonProps> = ({
  variant = 'default',
  size = 'default',
  label = 'Button',
  isLoading = false,
  disabled = false,
  ...props
}) => {
  // useMemo to avoid unnecessary re-renders
  const buttonStyles = React.useMemo(() => {
    return [
      tw`items-center justify-center rounded-md`,
      variant === 'default' && tw`bg-primary dark:bg-dark-primary`,
      variant === 'destructive' && tw`bg-destructive dark:bg-dark-destructive`,
      variant === 'outline' && tw`border border-input`,
      variant === 'secondary' && tw`bg-secondary dark:bg-dark-secondary`,
      variant === 'ghost' && tw``,
      variant === 'link' && tw``,
      size === 'default' && tw`h-10 px-4 py-2`,
      size === 'sm' && tw`h-9 px-3 rounded-md`,
      size === 'lg' && tw`h-11 px-8 rounded-md`,
    ];
  }, [variant, size]);

  const textStyles = React.useMemo(() => {
    return [
      variant === 'default' &&
        tw`text-primary-foreground dark:text-dark-primary-foreground`,
      variant === 'destructive' &&
        tw`text-destructive-foreground dark:text-dark-destructive-foreground`,
      variant === 'secondary' &&
        tw`text-secondary-foreground dark:text-dark-secondary-foreground`,
      variant === 'outline' && tw`text-input`,
      variant === 'ghost' &&
        tw`text-primary-foreground dark:text-dark-primary-foreground`,
      variant === 'link' && tw`text-primary dark:text-dark-primary`,
    ];
  }, [variant]);

  return (
    <TouchableOpacity
      style={buttonStyles}
      disabled={isLoading || disabled}
      accessibilityLabel={label}
      accessibilityRole="button"
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator size={'small'} />
      ) : (
        <Text style={textStyles}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};
