import { BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import { StyleSheet } from "react-native";
import { bottomSheet } from "../BottomSheet";
import { Button } from "./Button";
import { icons } from "lucide-react-native";

type Action = {
  label: string;
  action: () => void;
  isError?: boolean;
  spaced?: boolean;
  icon?: keyof typeof icons;
}

export const dropdownMenu = {
  open: (actions: Action[]) => {
    bottomSheet.open({
      children: <DropdownMenu actions={actions} />,
      scrollable: true
    });
  },
}

const DropdownMenu = ({ actions }: { actions: Action[] }) => {
  return (
    <BottomSheetView style={styles.container}>
      {actions.map((action, index) => (
        <Button key={index} title={action.label} variant={action.isError ? 'error' : 'muted'} size="large" onPress={() => {
          bottomSheet.close();
          action.action();
        }} spaced={action.spaced} icon={action.icon} />
      ))}
    </BottomSheetView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 20,
    paddingBottom: 20
  },
});