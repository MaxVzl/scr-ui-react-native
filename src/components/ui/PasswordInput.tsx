import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Color } from "../../types/Color";
import { useContext, useState } from "react";
import { ScrUiContext } from "../../contexts/ScrUiContext";
import { Input, InputProps } from "./Input";
import Icon from "../Icon";

type PasswordInputProps = InputProps & {
  
}

export const PasswordInput = ({
  style,
  ...props
}: PasswordInputProps) => {
  const { colors } = useContext(ScrUiContext);
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <View>
      <Input
        secureTextEntry={!showPassword}
        style={[{ paddingRight: 40 }, style]}
        {...props}
      />
      <TouchableOpacity style={styles(colors).button} onPress={() => setShowPassword(!showPassword)} activeOpacity={0.8}>
        <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} color={colors.mutedText} />
      </TouchableOpacity>
    </View>
  )
}

const styles = (colors: Color) => StyleSheet.create({
  button: {
    position: 'absolute',
    top: '50%',
    right: 10,
    transform: [{ translateY: '-50%' }],
  }
})