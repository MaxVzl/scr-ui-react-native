import * as React from 'react';

import { ScrUiContext } from '../contexts/ScrUiContext';
import { BottomSheetProvider } from './BottomSheetProvider';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {StyleSheet, useColorScheme} from "react-native";
import { Color } from '../types/Color';

type Props = {
  value: {
    colors: {
      light: Color;
      dark: Color;
    };
  };
  children: React.ReactNode;
};

export function ScrUiProvider({ value, children }: Props) {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? value.colors.dark : value.colors.light;

  return (
    <ScrUiContext.Provider value={{ colors }}>
      <GestureHandlerRootView style={styles.container}>
        <BottomSheetProvider>{children}</BottomSheetProvider>
      </GestureHandlerRootView>
    </ScrUiContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});