import { BottomSheetView, TouchableOpacity } from "@gorhom/bottom-sheet";
import { StyleSheet, Text, View } from "react-native";
import { bottomSheet } from "../BottomSheet";
import { ScrUiContext } from "../../contexts/ScrUiContext";
import { useContext } from "react";

type Action = {
  label: string;
  action: () => void;
  isError?: boolean;
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
  const { colors } = useContext(ScrUiContext);

  return (
    <BottomSheetView style={{ paddingHorizontal: 20, gap: 20, paddingBottom: 20 }}>
      {actions.map((action, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.container, { backgroundColor: action.isError ? "#FF00001A" : `${colors.tint}1A` }]}
          activeOpacity={0.8}
          onPress={() => {
            bottomSheet.close();
            action.action();
          }}
        >
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10}}>
            <Text style={{ color: action.isError ? "#FF0000" : colors.tint }}>{action.label}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </BottomSheetView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 5
  },
});