import React, { useContext } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { ScrUiContext } from '../../contexts/ScrUiContext';
import { Color } from '../../types/Color';
import Icon from '../Icon';
import { icons } from 'lucide-react-native';

type IconButtonVariant = 'primary' | 'secondary' |'error' | 'muted';
type IconButtonSize = 'large' | 'medium' | 'small';

type IconButtonProps = TouchableOpacityProps & {
  icon: keyof typeof icons;
  onPress?: () => void;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  loading?: boolean;
};

export const IconButton = ({
  icon,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  style,
  disabled,
  ...props
}: IconButtonProps) => {
  const { colors } = useContext(ScrUiContext);
  
  return (
    <TouchableOpacity
      style={[
        styles(colors).button, 
        styles(colors)[variant], 
        styles(colors)[size], 
        (loading || disabled) && styles(colors).disabled,
        style
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? <ActivityIndicator size="small" color={styles(colors)[`${variant}Text`].color} /> : (
        <Icon name={icon} color={styles(colors)[`${variant}Text`].color} size={20} />
      )}
    </TouchableOpacity>
  );
};

const styles = (color: Color) => StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },

  primary: {
    backgroundColor: color.primary,
  },
  primaryText: {
    color: color.primaryText,
  },

  secondary: {
    backgroundColor: `${color.primary}1A`,
  },
  secondaryText: {
    color: color.primary,
  },

  error: {
    backgroundColor: `${color.error}1A`,
  },
  errorText: {
    color: color.error,
  },

  muted: {
    backgroundColor: color.muted,
  },
  mutedText: {
    color: color.mutedText,
  },

  large: {
    padding: 20,
    width: 60,
    height: 60
  },
  medium: {
    padding: 10,
    width: 48,
    height: 48
  },
  small: {
    padding: 8,
    width: 36,
    height: 36
  },

  disabled: {
    opacity: 0.5
  }
});