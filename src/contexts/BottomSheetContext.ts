import BottomSheet from '@gorhom/bottom-sheet';
import * as React from 'react';

export type BottomSheetContextType = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  bottomSheetRef?: React.RefObject<BottomSheet | null>;
  child?: React.ReactNode;
  setChild: (child: React.ReactNode) => void;
  scrollable: boolean;
  setScrollable: (scrollable: boolean) => void;
  open: (children: React.ReactNode, scrollable: boolean) => void;
};

export const BottomSheetContext = React.createContext<BottomSheetContextType>({} as BottomSheetContextType);

BottomSheetContext.displayName = 'BottomSheetContext';

// Référence globale pour accéder aux fonctions de la BottomSheet
let bottomSheetRef: BottomSheetContextType | null = null;

export const setBottomSheetRef = (ref: BottomSheetContextType) => {
  bottomSheetRef = ref;
};

export const getBottomSheetRef = () => bottomSheetRef;
