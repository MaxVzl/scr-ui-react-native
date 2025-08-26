import {StyleSheet, Pressable, View, Text, useWindowDimensions} from "react-native";
import React, { useContext } from "react";
import Animated, {useAnimatedStyle, withSpring} from "react-native-reanimated";
import { ScrUiContext } from "../../contexts/ScrUiContext";

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

export function TabBar({
  state,
  descriptors,
  navigation,
}: TabBarProps) {
  const {colors} = useContext(ScrUiContext);
  const {width} = useWindowDimensions();
  const MARGIN = 0;
  const TAB_BAR_WIDTH = width - 2 * MARGIN;
  const TAB_WIDTH = TAB_BAR_WIDTH / state.routes.length;

  const translateAnimation = useAnimatedStyle(() => {
    return {
      transform: [{translateX: withSpring(TAB_WIDTH * state.index)}],
    };
  });

  return (
    <View style={[
      styles.container,
      {backgroundColor: colors.background},
    ]}>
      <View style={[
        styles.tabBarContainer,
        { width: TAB_BAR_WIDTH, backgroundColor: colors.muted, borderTopStartRadius: 8, borderTopEndRadius: 8 },
      ]}>
        <Animated.View
          style={[
            styles.slidingTabContainer,
            {width: TAB_WIDTH},
            translateAnimation,
          ]}>
          <View style={[
            styles.slidingTab,
            {backgroundColor: colors.primary}
          ]} />
        </Animated.View>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          // const descriptor = descriptors?.[route.key] ?? {};
          // const options = descriptor.options ?? {};
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, {merge: true});
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Pressable
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{flex: 1}}>
              <View style={styles.contentContainer}>
                {options.tabBarIcon &&
                  options.tabBarIcon({
                    focused: isFocused,
                    color: isFocused ? colors.primary : colors.mutedText,
                    size: 24,
                  })
                }
                {typeof label === 'string' && <Text
                  style={{
                    color: isFocused ? colors.primary : colors.mutedText,
                    fontSize: 12,
                  }}
                >{label}</Text>}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 80,
  },
  tabBarContainer: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    paddingTop: 10,
    paddingBottom: 20,
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    overflow: 'hidden',
    bottom: 0,
  },
  slidingTabContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  slidingTab: {
    width: 50,
    height: 3,
    borderRadius: 100,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
})
