import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { IRadioButtonProps, RadioButton } from '../ui/RadioButton';
import Typography from '../ui/Typography';

type FormRadioButtonsProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  errors?: string | undefined;
} & Omit<IRadioButtonProps, 'selectedOption' | 'onSelect'>;

export const FormRadioButtons = <TFieldValues extends FieldValues>({
  control,
  name,
  errors,
  options,
}: FormRadioButtonsProps<TFieldValues>) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <RadioButton
            options={options}
            selectedOption={value}
            onSelect={(selectedOption) => {
              onChange(selectedOption);
            }}
          />
        )}
      />
      {errors && <Typography variant="error">{errors}</Typography>}
    </>
  );
};
