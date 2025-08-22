import * as React from 'react';

import { BottomSheetContext, setBottomSheetRef } from '../contexts/BottomSheetContext';
import { BottomSheet } from '../components/BottomSheet';
import BS from '@gorhom/bottom-sheet';

type Props = {
  children: React.ReactNode;
};

export function BottomSheetProvider({ children }: Props) {
  const [visible, setVisible] = React.useState(false);
  const [scrollable, setScrollable] = React.useState(false);
  const [fulled, setFulled] = React.useState(false);
  const bottomSheetRef = React.useRef<BS>(null);
  const [child, setChild] = React.useState<React.ReactNode>(null);

  // Fonction utilitaire pour ouvrir la BottomSheet
  const open = (children: React.ReactNode, scrollable: boolean, fulled: boolean) => {
    setVisible(true);
    setChild(children);
    setScrollable(scrollable);
    setFulled(fulled);
  };

  const contextValue = { 
    visible, 
    setVisible, 
    bottomSheetRef, 
    child, 
    setChild, 
    scrollable, 
    setScrollable,
    fulled,
    setFulled,
    open
  };

  // Enregistrer la référence globale
  React.useEffect(() => {
    setBottomSheetRef(contextValue);
  }, [contextValue]);

  return (
    <BottomSheetContext.Provider value={contextValue}>
      {children}
      <BottomSheet />
    </BottomSheetContext.Provider>
  );
}