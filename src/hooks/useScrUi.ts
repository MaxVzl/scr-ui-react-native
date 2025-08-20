import { useContext } from "react";
import { ScrUiContext } from "../contexts/ScrUiContext";

export function useScrUi() {
  return useContext(ScrUiContext);
}