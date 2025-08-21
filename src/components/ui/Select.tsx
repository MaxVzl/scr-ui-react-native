import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { Color } from "../../types/Color";
import { ScrUiContext } from "../../contexts/ScrUiContext";
import { useContext } from "react";
import { bottomSheet } from "../BottomSheet";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Button } from "./Button";
import { SearchInput } from "./SearchInput";

type SelectProps = TouchableOpacityProps & {
  value?: string,
  onChange?: (value?: string) => void;
  placeholder?: string;
  items?: { value: string, label: string }[];
}

export const Select = ({
  value,
  onChange,
  placeholder,
  items,
  ...props
}: SelectProps) => {
  const { colors } = useContext(ScrUiContext);

  return (
    <TouchableOpacity
      style={styles(colors).container}
      onPress={() => {
        bottomSheet.open({
          children: <RenderSelect items={items} value={value} onChange={onChange} />,
          scrollable: true
        })
      }}
    >
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10}}>
        {items && <Text>{items.find(item => item.value === value)?.label || placeholder}</Text>}
      </View>
    </TouchableOpacity>
  )
}

type RenderSelectProps = {
  items?: { value: string, label: string }[],
  value?: string,
  onChange?: (value?: string) => void
}

const RenderSelect = ({
  items,
  value,
  onChange
}: RenderSelectProps) => {
  const { colors } = useContext(ScrUiContext);

  return (
    <BottomSheetScrollView contentContainerStyle={styles(colors).contentContainer}>
      <SearchInput placeholder='Rechercher...' />
      {items && items.map((item, index) => (
        <Button key={index} title={item.label} onPress={() => {
          bottomSheet.close();
          onChange && onChange(item.value)
        }} variant='secondary' size='large' />
      ))}
    </BottomSheetScrollView>
  )
}

const styles = (colors: Color) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary
  },
  contentContainer: {
    paddingHorizontal: 20,
    gap: 20,
    paddingBottom: 20
  }
})