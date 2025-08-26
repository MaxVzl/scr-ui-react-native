import { StyleSheet, TextInput, TextInputProps, View, Dimensions, ActivityIndicator, TouchableOpacity } from "react-native";
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
  
  const clearIconOpacity = useSharedValue(0);
  const clearIconTranslateX = useSharedValue(20);
  
  useEffect(() => {
    if (displayValue) {
      clearIconOpacity.value = withTiming(1, { duration: 300 });
      clearIconTranslateX.value = withTiming(0, { duration: 300 });
    } else {
      clearIconOpacity.value = withTiming(0, { duration: 300 });
      clearIconTranslateX.value = withTiming(20, { duration: 300 });
    }
  }, [displayValue, clearIconOpacity, clearIconTranslateX]);
  
  const clearIconAnimatedStyle = useAnimatedStyle(() => ({
    opacity: clearIconOpacity.value,
    transform: [{ translateX: clearIconTranslateX.value }, { translateY: '-50%' }]
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
    <View>
      <View style={styles(colors).icon}>
        {loading ? <ActivityIndicator size={16} color={colors.mutedText} /> : <Icon name="Search" size={16} color={colors.mutedText} />}
      </View>
      <TextInputComponent
        style={styles(colors).input}
        value={displayValue}
        onChangeText={handleChangeText}
        {...props}
      />
      <Animated.View style={[styles(colors).clearIcon, clearIconAnimatedStyle]}>
        <TouchableOpacity onPress={handleClear} activeOpacity={0.8}>
          <Icon name="CircleX" size={16} color={colors.mutedText} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

const styles = (colors: Color) => StyleSheet.create({
  icon: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{ translateY: '-50%' }],
    zIndex: 1
  },
  clearIcon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    zIndex: 1
  },
  input: {
    backgroundColor: colors.muted,
    color: colors.text,
    borderRadius: 8,
    padding: 10,
    paddingHorizontal: 40,
    height: 36
  },
  buttonContainer: {
    width: 72,
    flexShrink: 0
  }
})