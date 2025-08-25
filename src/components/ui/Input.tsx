import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { Color } from "../../types/Color";
import { useContext } from "react";
import { ScrUiContext } from "../../contexts/ScrUiContext";
import { icons } from "lucide-react-native";
import Icon from "../Icon";

export type InputProps = TextInputProps & {
  icon?: keyof typeof icons;
}

export const Input = ({
  icon,
  style,
  ...props
}: InputProps) => {
  const { colors } = useContext(ScrUiContext);
  
  return (
    <View>
      {icon && (
        <View style={styles(colors).icon}>
          <Icon name={icon} size={16} color={colors.mutedText} />
        </View>
      )}
      <TextInput
        style={[styles(colors).input, icon && {paddingLeft: 40}, style]}
        {...props}
      />
    </View>
  )
}

const styles = (colors: Color) => StyleSheet.create({
  icon: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{ translateY: '-50%' }]
  },
  input: {
    borderWidth: 1,
    borderColor: colors.primary,
    color: colors.text,
    borderRadius: 8,
    padding: 10,
    height: 48
  }
})