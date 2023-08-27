import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { IInputProps, Input } from '../ui/Input';
import Typography from '../ui/Typography';

type FormInputProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  errors?: string | undefined;
} & Omit<IInputProps, 'errors'>;

export const FormInput = <TFieldValues extends FieldValues>({
  control,
  name,
  errors,
  ...restProps
}: FormInputProps<TFieldValues>) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            {...restProps}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            errors={errors}
          />
        )}
      />
      {errors && <Typography variant="error">{errors}</Typography>}
    </>
  );
};
