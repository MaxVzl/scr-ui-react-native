import { useContext, useState, useRef, useEffect } from "react";
import { TouchableOpacity, Animated } from "react-native"
import { ScrUiContext } from "../../contexts/ScrUiContext";

type SwitchProps = {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
}

export const Switch = ({value, onValueChange}: SwitchProps) => {
  const {colors} = useContext(ScrUiContext);
  const [internalValue, setInternalValue] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const colorAnim = useRef(new Animated.Value(0)).current;
  
  const currentValue = value !== undefined ? value : internalValue;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: currentValue ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(colorAnim, {
        toValue: currentValue ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      })
    ]).start();
  }, [currentValue, slideAnim, colorAnim]);

  const handleToggle = () => {
    const newValue = !currentValue;
    
    if (value === undefined) {
      setInternalValue(newValue);
    }
    
    onValueChange?.(newValue);
  };

  const circleLeft = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 22],
  });

  const backgroundColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.muted, `${colors.primary}1A`],
  });

  const circleColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.mutedText, colors.primary],
  });

  return (
    <TouchableOpacity style={{
      position: 'relative',
      width: 51,
      height: 31,
      borderRadius: 15.5,
    }} activeOpacity={0.8} onPress={handleToggle}>
      <Animated.View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 15.5,
        backgroundColor: backgroundColor,
      }} />
      <Animated.View style={{
        position: 'absolute',
        top: '50%',
        left: circleLeft,
        transform: [{translateY: '-50%'}],
        width: 25,
        height: 25,
        backgroundColor: circleColor,
        borderRadius: 12.5,
      }}></Animated.View>
    </TouchableOpacity>
  )
}