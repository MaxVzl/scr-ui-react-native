import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
};

export const Button = ({ title, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.bouton} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bouton: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 8,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
});
