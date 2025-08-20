import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ScrUiContext } from '../../contexts/ScrUiContext';
import { Color } from '../../types/Color';
import Icon from '../Icon';
import { icons } from 'lucide-react-native';

type IconButtonVariant = 'primary' | 'secondary' |'error';

type IconButtonProps = {
  icon: keyof typeof icons;
  onPress?: () => void;
  variant?: IconButtonVariant;
};

export const IconButton = ({ icon, onPress, variant = 'primary' }: IconButtonProps) => {
  const { colors } = useContext(ScrUiContext);
  
  return (
    <TouchableOpacity style={[styles(colors).button, styles(colors)[variant]]} onPress={onPress} activeOpacity={0.8}>
      <Icon name={icon} color={styles(colors)[`${variant}Text`].color} size={20} />
    </TouchableOpacity>
  );
};

const styles = (color: Color) => StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 8,
    width: 40,
    height: 40,
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
});