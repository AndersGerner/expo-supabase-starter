import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Calendar, ICalendarProps } from '../ui/Calendar';
import Typography from '../ui/Typography';

type FormCalendarProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  errors?: string | undefined;
} & ICalendarProps;

export const FormCalendar = <TFieldValues extends FieldValues>({
  control,
  name,
  errors,
  ...restProps
}: FormCalendarProps<TFieldValues>) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Calendar
            {...restProps}
            onChange={(selectedDate) => {
              onChange(selectedDate);
            }}
            value={value}
          />
        )}
      />
      {errors && <Typography variant="error">{errors}</Typography>}
    </>
  );
};
