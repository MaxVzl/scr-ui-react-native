import { BackHandler, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { BottomSheetContext, getBottomSheetRef } from '../contexts/BottomSheetContext';
import BS, {BottomSheetBackdrop} from "@gorhom/bottom-sheet";
import { ScrUiContext } from '../contexts/ScrUiContext';

// Fonction utilitaire séparée du composant pour éviter les dépendances circulaires
export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  
  return {
    open: (children: React.ReactNode, scrollable: boolean) => {
      context.open(children, scrollable);
    },
    close: () => {
      context.bottomSheetRef?.current?.close();
    },
    visible: context.visible,
    setVisible: context.setVisible
  };
};

// Hook personnalisé pour utiliser la BottomSheet
export const bottomSheet = {
  open: ({
    children,
    scrollable
  }: {
    children: React.ReactNode;
    scrollable: boolean;
  }) => {
    // Utilise la référence globale pour éviter les dépendances circulaires
    const bottomSheetRef = getBottomSheetRef();
    if (bottomSheetRef) {
      bottomSheetRef.open(children, scrollable);
    } else {
      console.warn('BottomSheet not initialized yet');
    }
  },
  close: () => {
    const bottomSheetRef = getBottomSheetRef();
    if (bottomSheetRef) {
      bottomSheetRef.bottomSheetRef?.current?.close();
    } else {
      console.warn('BottomSheet not initialized yet');
    }
  },
};

export const BottomSheet = () => {
  const { colors } = useContext(ScrUiContext);
  const { visible, setVisible, bottomSheetRef, child, scrollable } = useContext(BottomSheetContext);

  const screenHeight = Dimensions.get('window').height;
  const maxHeight = screenHeight * 0.9;

  useEffect(() => {
    if (!visible) return;

    const onBackPress = () => {
      setVisible(false);
      return true;
    };

    const backPressSubscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      backPressSubscription.remove();
    };
  }, [visible, setVisible]);

  if (!visible) return null;

  return (
    <BS
      ref={bottomSheetRef}
      index={0}
      enablePanDownToClose={true}
      backdropComponent={(props) => (
        <BottomSheetBackdrop 
          appearsOnIndex={0} 
          disappearsOnIndex={-1} 
          {...props} 
        />
      )}
      backgroundStyle={{backgroundColor: colors.background}}
      handleIndicatorStyle={{backgroundColor: colors.text}}
      onClose={() => setVisible(false)}
      maxDynamicContentSize={maxHeight}
      enableContentPanningGesture={scrollable}
    >
      {child}
    </BS>
  );
};