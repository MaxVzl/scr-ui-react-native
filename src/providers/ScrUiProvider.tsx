import * as React from 'react';

import { ScrUiContext, ScrUiContextType } from '../contexts/ScrUiContext';
import { BottomSheetProvider } from './BottomSheetProvider';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {StyleSheet} from "react-native";

type Props = {
  value?: ScrUiContextType;
  children: React.ReactNode;
};

export function ScrUiProvider({ value, children }: Props) {
  return (
    <ScrUiContext.Provider value={value!}>
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