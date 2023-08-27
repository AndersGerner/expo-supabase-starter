import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import Checkbox, { ICheckboxProps } from '../ui/Checkbox';
import Typography from '../ui/Typography';

type FormCheckboxProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  errors?: string | undefined;
} & Omit<ICheckboxProps, 'isChecked' | 'onToggle'>;

export const FormCheckbox = <TFieldValues extends FieldValues>({
  control,
  name,
  errors,
  ...restProps
}: FormCheckboxProps<TFieldValues>) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Checkbox
            isChecked={value}
            onToggle={() => onChange(!value)}
            {...restProps}
          />
        )}
      />
      {errors && <Typography variant="error">{errors}</Typography>}
    </>
  );
};
