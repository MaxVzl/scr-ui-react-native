import { useContext, useState } from "react";
import { Animated, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View, ViewProps } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import { ScrUiContext } from "../../contexts/ScrUiContext";
import { Color } from "../../types/Color";
import { Button } from "./Button";

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: FirstRoute,
  fourth: SecondRoute,
  fifth: FirstRoute,
  sixth: SecondRoute,
});

const routes = [
  { key: 'first', title: 'First' },
  { key: 'second', title: 'Second' },
  // { key: 'third', title: 'Third' },
  // { key: 'fourth', title: 'Fourth' },
  // { key: 'fifth', title: 'Fifth' },
  // { key: 'sixth', title: 'Sixth' },
];

type TabsProps = ViewProps & {
  scrollable?: boolean;
}

export const Tabs = ({
  scrollable = false,
}: TabsProps) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const {colors} = useContext(ScrUiContext);
  
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => {
        const inputRange = props.navigationState.routes.map((x, i) => i);

        const opacity = props.position.interpolate({
          inputRange,
          outputRange: inputRange.map((inputIndex) =>
            inputIndex === index ? 1 : 0.5
          ),
        });

        const TabView = ({children}: {children: React.ReactNode}) => {
          return scrollable ? (
            <ScrollView horizontal style={styles(colors).tabBar} contentContainerStyle={{ gap: 2 }}>
              {children}
            </ScrollView>
          ) : (
            <View style={styles(colors).tabBar}>
              {children}
            </View>
          )
        }
        
        return (
          <View>
            <TabView>
              {routes.map((route, i) => {
                return (
                  <TouchableOpacity
                    key={route.key}
                    style={[styles(colors).tabItem, {backgroundColor: route.key === routes[index].key ? colors.background : colors.muted}]}
                    onPress={() => props.jumpTo(route.key)} activeOpacity={0.8}>
                    <Animated.Text style={{ opacity, color: route.key === routes[index].key ? colors.text : colors.mutedText }}>{route.title}</Animated.Text>
                  </TouchableOpacity>
                )
              })}
            </TabView>
          </View>
        )
      }}
    />
  )
}

const styles = (color: Color) => StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    padding: 2,
    borderRadius: 8,
    gap: 2,
    backgroundColor: color.muted,
    marginBottom: 10
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 6,
    borderRadius: 8
  },
});