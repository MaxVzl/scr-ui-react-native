import * as React from 'react';

import { ScrUiContext } from '../contexts/ScrUiContext';
import { Color } from '../types/Color';

type Props = {
  value?: Color;
  children: React.ReactNode;
};

export function ScrUiProvider({ value, children }: Props) {
  return (
    <ScrUiContext.Provider value={value}>{children}</ScrUiContext.Provider>
  );
}