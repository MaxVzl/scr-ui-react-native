import React, {useContext, useEffect, useState} from "react";
import {Calendar as C, LocaleConfig} from "react-native-calendars";
import {ScrUiContext} from "../../contexts/ScrUiContext";
import {format} from "date-fns";

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui"
};

LocaleConfig.defaultLocale = 'fr';

interface CalendarProps extends React.ComponentProps<typeof C> {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
}

function Calendar({
  value,
  onChange,
  ...props
}: CalendarProps) {
  const {colors} = useContext(ScrUiContext);
  const [localValue, setLocalValue] = useState<Date | undefined>(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const selectedDateString = localValue ? format(localValue, 'yyyy-MM-dd') : undefined;

  return (
    <C
      key={colors.primary}
      markedDates={
        selectedDateString
          ? {
            [selectedDateString]: {
              selected: true,
              selectedColor: `${colors.primary}1A`,
              selectedTextColor: colors.primary,
            },
          }
          : {}
      }
      onDayPress={(day: any) => {
        const newDate = new Date(day.timestamp);
        newDate.setHours(0);
        newDate.setMinutes(0);
        newDate.setSeconds(0);
        if (localValue && newDate.toDateString() === localValue.toDateString()) {
          setLocalValue(undefined);
          onChange?.(undefined);
        } else {
          setLocalValue(newDate);
          onChange?.(newDate);
        }
      }}
      initialDate={selectedDateString ?? format(new Date(), 'yyyy-MM-dd')}
      firstDay={1}
      theme={{
        backgroundColor: colors.background,
        calendarBackground: colors.background,
        textSectionTitleColor: colors.text,
        dayTextColor: colors.text,
        monthTextColor: colors.text,
        selectedDayBackgroundColor: colors.primary,
        selectedDayTextColor: colors.primaryText,
        textDisabledColor: colors.text,
        todayBackgroundColor: colors.primary,
        todayTextColor: colors.primaryText,
        arrowColor: colors.text,
      }}
      {...props}
    />
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
