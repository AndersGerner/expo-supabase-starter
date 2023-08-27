import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import tw from '@/lib/tailwind';
import { View } from 'react-native';
import { Switch } from '../ui/Switch';
import Typography from '../ui/Typography';

type FormSwitchProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  errors?: string | undefined;
};

export const FormSwitch = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  errors,
}: FormSwitchProps<TFieldValues>) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <View style={tw`flex-row items-center justify-between`}>
            <Typography variant="body">{label}</Typography>
            <Switch
              value={value}
              onValueChange={(newValue) => onChange(newValue)}
            />
          </View>
        )}
      />
      {errors && (
        <Typography variant="error" style={{ marginTop: 8 }}>
          {errors}
        </Typography>
      )}
    </>
  );
};
