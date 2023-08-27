import tw from '@/lib/tailwind';
import React, { useState } from 'react';
import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { useAppColorScheme } from 'twrnc';
import { Icon, MaterialIconNames } from './Icon';

export interface IInputProps extends TextInputProps {
  label?: string;
  text?: string;
  errors?: string | null;
  isFocused?: boolean;
  iconLeft?: MaterialIconNames;
  iconRight?: MaterialIconNames;
  multiline?: boolean;
  characterLimit?: number;
}

export const Input: React.FC<IInputProps> = ({
  label,
  text,
  errors,
  onBlur,
  iconLeft,
  iconRight,
  multiline,
  characterLimit,
  ...props
}) => {
  const [colorScheme] = useAppColorScheme(tw);
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');

  const handleBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    onBlur && onBlur(event);
  };

  const handleChangeText = (newText: string) => {
    setValue(newText);
  };

  const baseStyle: ViewStyle = tw`flex h-10 w-full items-center rounded-md text-foreground dark:text-dark-foreground border border-input dark:border-dark-input bg-transparent px-3 py-2 text-sm leading-[0px]`;
  const focusStyle: ViewStyle = isFocused
    ? tw`border-primary dark:border-dark-primary`
    : {};
  const errorStyle: ViewStyle = errors
    ? tw`border-destructive dark:border-dark-destructive`
    : {};

  return (
    <View>
      {label && (
        <Text
          style={tw`small text-foreground dark:text-dark-foreground self-start mb-1.5`}
        >
          {label}
        </Text>
      )}
      <View style={tw`flex-row items-center`}>
        {iconLeft && <Icon name={iconLeft} />}
        <TextInput
          style={[baseStyle, focusStyle, errorStyle]}
          placeholderTextColor={
            colorScheme === 'dark'
              ? tw.color('dark-muted-foreground')
              : tw.color('muted-foreground')
          }
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          multiline={multiline}
          {...props}
        />
        {iconRight && <Icon name={iconRight} />}
      </View>
      {characterLimit && (
        <Text style={tw`text-xs text-muted`}>
          {`${value.length}/${characterLimit}`}
        </Text>
      )}
      {text && <Text style={tw`muted self-start mt-1.5`}>{text}</Text>}
      {errors && (
        <Text
          style={tw`text-sm text-destructive dark:text-dark-destructive self-start mt-1.5`}
        >
          {errors}
        </Text>
      )}
    </View>
  );
};

export default Input;
