import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { Color } from "../../types/Color";
import { ScrUiContext } from "../../contexts/ScrUiContext";
import { useContext, useEffect, useState } from "react";
import { bottomSheet } from "../BottomSheet";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Button } from "./Button";
import { SearchInput } from "./SearchInput";

type SelectProps = TouchableOpacityProps & {
  value?: string,
  onChange?: (value?: string) => void;
  placeholder?: string;
  items?: { value: string, label: string }[];
  searchable?: boolean;
}

export const Select = ({
  value: externalValue,
  onChange: externalOnChange,
  placeholder,
  items,
  searchable = false,
  ...props
}: SelectProps) => {
  const { colors } = useContext(ScrUiContext);
  const [internalValue, setInternalValue] = useState(externalValue || '');
  
  const displayValue = externalValue !== undefined ? externalValue : internalValue;
  
  const handleChange = (newValue?: string) => {
    if (externalOnChange) {
      externalOnChange(newValue);
    } else {
      setInternalValue(newValue || '');
    }
  };

  return (
    <TouchableOpacity
      style={styles(colors).container}
      onPress={async () => {
        bottomSheet.open({
          children: <RenderSelect items={items} value={displayValue} onChange={handleChange} searchable={searchable} />,
          scrollable: true,
          fulled: true
        });
      }}
    >
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10}}>
        <Text>{items && items.find(item => item.value === displayValue)?.label || placeholder}</Text>
      </View>
    </TouchableOpacity>
  )
}

type RenderSelectProps = {
  items?: { value: string, label: string }[],
  value?: string,
  onChange?: (value?: string) => void,
  searchable?: boolean
}

const RenderSelect = ({
  items,
  value,
  onChange,
  searchable
}: RenderSelectProps) => {
  const { colors } = useContext(ScrUiContext);
  const [search, setSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    setFilteredItems(items?.filter(item => item.label.toLowerCase().includes(search.toLowerCase())) || []);
  }, [search, items]);

  return (
    <>
      {searchable && <View style={styles(colors).contentContainer}>
        <SearchInput placeholder='Rechercher...' bottomSheet value={search} onChangeText={setSearch} />
      </View>}
      <BottomSheetScrollView contentContainerStyle={styles(colors).contentContainer}>
        {filteredItems && filteredItems.length > 0 ? filteredItems.map((item, index) => (
          <Button key={index} title={item.label} onPress={() => {
            bottomSheet.close();
            onChange && onChange(value === item.value ? undefined : item.value)
          }} variant='muted' size='large' spaced icon={value === item.value ? 'Check' : undefined} />
        )) : (
          <Text>Aucun résultat</Text>
        )}
      </BottomSheetScrollView>
    </>
  )
}

const styles = (colors: Color) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    height: 48,
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