import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from './Icon';

type CalendarVariant = 'date' | 'time' | 'datetime';

export interface ICalendarProps {
  variant?: CalendarVariant;
  value: Date;
  onChange?: (date: Date) => void;
}

export const Calendar: React.FC<ICalendarProps> = ({
  variant = 'date',
  value,
  onChange,
}) => {
  const [date, setDate] = useState(value ?? new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChangeHandler = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      if (onChange) {
        onChange(selectedDate);
      }
    }
  };

  return (
    <View>
      <Text>{date.toDateString()}</Text>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <Icon name="calendar-view-day" />
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode={variant}
          display="default"
          onChange={onChangeHandler}
        />
      )}
    </View>
  );
};
