import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ScrUiContext } from '../../contexts/ScrUiContext';
import { Color } from '../../types/Color';

type Props = {
  title: string;
  onPress: () => void;
};

export const Button = ({ title, onPress }: Props) => {
  const { colors } = useContext(ScrUiContext);
  
  return (
    <TouchableOpacity style={styles(colors!).bouton} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles(colors!).text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = (color: Color) => StyleSheet.create({
  bouton: {
    backgroundColor: color.tint,
    padding: 10,
    borderRadius: 8,
  },
  text: {
    color: color.background,
    textAlign: 'center',
  },
});
