import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { Color } from "../../types/Color";
import { useContext } from "react";
import { ScrUiContext } from "../../contexts/ScrUiContext";

type InputProps = TextInputProps & {}

export const Input = ({ ...props }: InputProps) => {
  const { colors } = useContext(ScrUiContext);
  
  return (
    <TextInput
      style={styles(colors).input}
      {...props}
    />
  )
}

const styles = (colors: Color) => StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.primary,
    color: colors.text,
    borderRadius: 8,
    padding: 10,
    height: 48
  }
})