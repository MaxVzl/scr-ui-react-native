import * as React from 'react';
import { Color } from '../types/Color';

export const ScrUiContext = React.createContext<Color | undefined>(undefined);

ScrUiContext.displayName = 'ScrUiContext';
