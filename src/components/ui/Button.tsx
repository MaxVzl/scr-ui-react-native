import React, { useContext } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { ScrUiContext } from '../../contexts/ScrUiContext';
import { Color } from '../../types/Color';
import { icons } from 'lucide-react-native';
import Icon from '../Icon';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

type ButtonVariant = 'primary' | 'secondary' |'error';
type ButtonSize = 'large' | 'medium' | 'small';

type ButtonProps = TouchableOpacityProps & {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: keyof typeof icons;
  spaced?: boolean;
  loading?: boolean;
};

export const Button = ({ 
  title, 
  variant = 'primary', 
  size = 'medium', 
  icon, 
  spaced = false, 
  loading = false, 
  style,
  disabled,
  ...props 
}: ButtonProps) => {
  const { colors } = useContext(ScrUiContext);
  
  return (
    <TouchableOpacity 
      style={[
        styles(colors).button, 
        styles(colors)[variant], 
        styles(colors)[size], 
        (spaced && !loading) && styles(colors).spaced,
        (loading || disabled) && styles(colors).disabled,
        style
      ]} 
      activeOpacity={0.8} 
      disabled={loading || disabled}
      {...props}
    >
      {loading ? <ActivityIndicator size="small" color={styles(colors)[`${variant}Text`].color} /> : (
        <>
          <Text style={[styles(colors).text, styles(colors)[`${variant}Text`]]}>{title}</Text>
          {icon && <Icon name={icon} color={styles(colors)[`${variant}Text`].color} size={20} />}
        </>
      )}
    </TouchableOpacity>
  );
};

type ButtonSkeletonProps = ViewProps & {
  size?: ButtonSize;
};

export const ButtonSkeleton = ({ size = 'medium', ...props }: ButtonSkeletonProps) => {
  const { colors } = useContext(ScrUiContext);
  return (
    <View style={[styles(colors).button, styles(colors)[size], { backgroundColor: 'gray', opacity: 0.1 }]} {...props}/>
  );
};

const styles = (color: Color) => StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    gap: 10
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

  large: {
    padding: 20,
    height: 60
  },
  medium: {
    padding: 10,
    height: 48
  },
  small: {
    padding: 10,
    height: 36
  },

  spaced: {
    justifyContent: 'space-between'
  },

  disabled: {
    opacity: 0.5
  }
});