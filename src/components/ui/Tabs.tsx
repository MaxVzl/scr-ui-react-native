import { ComponentType, useContext, useState } from "react";
import { Animated, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View, ViewProps } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import { ScrUiContext } from "../../contexts/ScrUiContext";
import { Color } from "../../types/Color";
import { Button } from "./Button";

type TabsProps = ViewProps & {
  routes: { value: string; title: string, route: ComponentType<any> }[];
  scrollable?: boolean;
}

export const Tabs = ({
  routes,
  scrollable = false,
}: TabsProps) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const {colors} = useContext(ScrUiContext);

  const renderScene = SceneMap(routes.reduce((acc, route) => {
    acc[route.value] = route.route;
    return acc;
  }, {} as Record<string, ComponentType<any>>));
  
  return (
    <TabView
      navigationState={{ index, routes: routes.map(route => ({ key: route.value, title: route.title })) }}
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
                    key={route.value}
                    style={[styles(colors).tabItem, {backgroundColor: route.value === routes[index].value ? colors.background : colors.muted}]}
                    onPress={() => props.jumpTo(route.value)} activeOpacity={0.8}>
                    <Animated.Text style={{ opacity, color: route.value === routes[index].value ? colors.text : colors.mutedText }}>{route.title}</Animated.Text>
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