import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useContext, useState} from "react";
import {BottomSheetView} from "@gorhom/bottom-sheet";
import {format, getHours, getMinutes} from "date-fns";
import {fr} from "date-fns/locale";
import {Button} from "./Button";
import {Calendar} from "./Calendar";
import {Picker} from '@react-native-picker/picker';
import { ScrUiContext } from "../../contexts/ScrUiContext";
import { bottomSheet } from "../BottomSheet";

interface DateTimePickerProps  {
  value?: Date,
  onChange?: (value?: Date) => void;
  placeholder?: string;
  mode?: 'date' | 'time' | 'datetime';
}

export const DateTimePicker = React.forwardRef<React.ElementRef<typeof TouchableOpacity>, DateTimePickerProps>(({
  value,
  onChange,
  placeholder,
  mode = 'datetime',
  ...props
}, ref) => {
  const {colors} = useContext(ScrUiContext);

  return (
    <TouchableOpacity
      ref={ref}
      {...props}
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          borderColor: colors.primary,
        }
      ]}
      activeOpacity={0.8}
      onPress={() => {
        bottomSheet.open({
          children: <RenderDateTimePicker mode={mode} value={value} onChange={onChange} />,
          scrollable: false
        })
      }}
    >
      <Text>{value ? format(
        value,
        mode === 'datetime' ? "EEEE dd MMMM yyyy 'à' HH:mm" : mode === 'date' ? "EEEE dd MMMM yyyy" : "HH:mm", {locale: fr}) :
        placeholder || (mode === 'datetime' ? 'Sélectionner une date et une heure' : mode === 'date' ? 'Sélectionner une date' : 'Sélectionner une heure')
      }</Text>
    </TouchableOpacity>
  );
});

const RenderDateTimePicker = ({ mode, value, onChange }: { mode: 'date' | 'time' | 'datetime', value?: Date, onChange?: (value: Date | undefined) => void }) => {
  const [localValue, setLocalValue] = useState<Date | undefined>(value);

  return (
    <BottomSheetView style={{ paddingHorizontal: 20, paddingBottom: 20, gap: 10 }}>
      {mode === 'datetime' ? (
        <>
          <Calendar value={localValue} onChange={setLocalValue}/>
          <TimePicker value={localValue} onChange={setLocalValue} />
        </>
      ) : mode === 'date' ? (
        <Calendar value={localValue} onChange={setLocalValue}/>
      ) : (
        <TimePicker value={localValue} onChange={setLocalValue} />
      )}
      <Button title={'Valider'} onPress={() => {
        onChange?.(localValue);
        bottomSheet.close();
      }} />
    </BottomSheetView>
  )
}

const TimePicker = ({ value, onChange }: { value?: Date, onChange?: (value: Date | undefined) => void }) => {
  const hours = [...Array(24).keys()].map((index) => ({
    value: index,
    label: index.toString().padStart(2, '0'),
  }));

  const minutes = [...Array(60).keys()].map((index) => ({
    value: index,
    label: index.toString().padStart(2, '0'),
  }));

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Picker
        selectedValue={value ? getHours(value) : 0}
        onValueChange={(itemValue, itemIndex) => {
          if (value) {
            const newDate = new Date(value);
            newDate.setHours(itemValue);
            onChange?.(newDate);
          } else {
            onChange?.(new Date(new Date().setHours(itemValue, 0, 0, 0)));
          }
        }}
        style={{ flex: 1 }}
      >
        {hours.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value}/>
        ))}
      </Picker>
      <Picker
        selectedValue={value ? getMinutes(value) : 0}
        onValueChange={(itemValue, itemIndex) => {
          if (value) {
            const newDate = new Date(value);
            newDate.setMinutes(itemValue);
            onChange?.(newDate);
          } else {
            onChange?.(new Date(new Date().setMinutes(itemValue, 0, 0)));
          }
        }}
        style={{ flex: 1 }}
      >
        {minutes.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value}/>
        ))}
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
  },
});