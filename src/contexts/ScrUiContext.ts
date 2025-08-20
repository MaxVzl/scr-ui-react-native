import * as React from 'react';
import { Color } from '../types/Color';

export type ScrUiContextType = {
  colors: Color;
};

export const ScrUiContext = React.createContext<ScrUiContextType>({} as ScrUiContextType);

ScrUiContext.displayName = 'ScrUiContext';
