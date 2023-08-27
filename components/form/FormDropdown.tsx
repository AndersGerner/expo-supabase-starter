import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Dropdown, IDropdownProps } from '../ui/Dropdown';
import Typography from '../ui/Typography';

type FormDropdownProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  errors?: string | undefined;
} & Omit<IDropdownProps, 'selected' | 'onSelect'>;

export const FormDropdown = <TFieldValues extends FieldValues>({
  control,
  name,
  errors,
  ...restProps
}: FormDropdownProps<TFieldValues>) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Dropdown
            selected={value}
            onSelect={(option) => onChange(option)}
            {...restProps}
          />
        )}
      />
      {errors && <Typography variant="error">{errors}</Typography>}
    </>
  );
};
