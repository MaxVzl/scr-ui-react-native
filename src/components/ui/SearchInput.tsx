import { StyleSheet, TextInput, TextInputProps, View, Dimensions, ActivityIndicator } from "react-native";
import { Color } from "../../types/Color";
import { useContext, useState, useEffect } from "react";
import { ScrUiContext } from "../../contexts/ScrUiContext";
import { Button } from "./Button";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import Icon from "../Icon";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

type SearchInputProps = TextInputProps & {
  bottomSheet?: boolean
  loading?: boolean
}

export const SearchInput = ({
  value: externalValue,
  onChangeText: externalOnChangeText,
  bottomSheet,
  loading,
  ...props
}: SearchInputProps) => {
  const { colors } = useContext(ScrUiContext);
  const [internalValue, setInternalValue] = useState(externalValue || '');
  
  const displayValue = externalValue !== undefined ? externalValue : internalValue;
  
  const translateXValue = useSharedValue(displayValue ? 0 : 100);
  const inputWidthValue = useSharedValue(displayValue ? 0.78 : 1);
  
  useEffect(() => {
    translateXValue.value = withTiming(displayValue ? 0 : 100, { duration: 300 });
    inputWidthValue.value = withTiming(displayValue ? 0.78 : 1, { duration: 300 });
  }, [displayValue, translateXValue, inputWidthValue]);
  
  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateXValue.value }],
  }));
  
  const inputAnimatedStyle = useAnimatedStyle(() => ({
    width: `${inputWidthValue.value * 100}%`,
    position: 'relative'
  }));
  
  const handleChangeText = (text: string) => {
    if (externalOnChangeText) {
      externalOnChangeText(text);
    } else {
      setInternalValue(text);
    }
  };
  
  const handleClear = () => {
    handleChangeText('');
  };

  const TextInputComponent = bottomSheet ? BottomSheetTextInput : TextInput;
  
  return (
    <View style={styles(colors).container}>
      <Animated.View style={inputAnimatedStyle}>
        <View style={styles(colors).icon}>
          <Icon name="Search" size={16} color={colors.primary} />
        </View>
        <TextInputComponent
          style={styles(colors).input}
          value={displayValue}
          onChangeText={handleChangeText}
          {...props}
        />
        {loading && <View style={styles(colors).loading}>
          <ActivityIndicator size="small" color={colors.primary} />
        </View>}
      </Animated.View>
      <Animated.View style={[styles(colors).buttonContainer, buttonAnimatedStyle]}>
        <Button title="Annuler" variant="secondary" size="small" onPress={handleClear} />
      </Animated.View>
    </View>
  )
}

const styles = (colors: Color) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{ translateY: '-50%' }],
  },
  loading: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: '-50%' }],
  },
  input: {
    backgroundColor: `${colors.primary}1A`,
    color: colors.primary,
    borderRadius: 8,
    padding: 10,
    paddingHorizontal: 40,
    height: 36
  },
  buttonContainer: {
    position: 'absolute',
    right: 0,
  }
})