/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react";
import { FAB, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  getFocusedRouteNameFromRoute,
  useIsFocused,
  useNavigationState,
} from "@react-navigation/native";
import color from "color";
import { observer } from "mobx-react-lite";

import { useStores } from "models";
import { overlay } from "theme/overlay";

import { PeopleStackNavigator } from "./people-stack-navigator";
import { PlacesStackNavigator } from "./places-stack-navigator";
import { TimelineStackScreen } from "./timeline-stack-navigator";

export type BottomTabParamList = {
  timelines: undefined;
  people: undefined;
  places: undefined;
};

const Tab = createMaterialBottomTabNavigator<BottomTabParamList>();

function getFabIcon(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator

  // const routeName = route.state ? getActiveRouteName(route.state) : "timelines";
  const routeName = getFocusedRouteNameFromRoute(route) ?? "timelines";

  if (routeName === "timelines") return "timeline-plus-outline";
  else if (routeName === "people") return "account-plus-outline";
  else if (routeName === "places") return "map-plus";
  else return routeName;
}

export const PrimaryTabNavigator = observer(function PrimaryTabNavigator({
  route,
  navigation,
}: any) {
  const { timelineStore } = useStores();
  const theme = useTheme();
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();

  const routeName = getFocusedRouteNameFromRoute(route) ?? "timelines";

  /**
   * Calculate when to show a global FAB.
   */
  const showFab = () => {
    if (!isFocused) return false;

    if (routeName === "timelines") {
      if (timelineStore.hasTimelines() === true) {
        return true;
      } else {
        return false;
      }
    } else if (routeName === "people") {
      return true;
    } else {
      return false;
    }
  };

  /**
   * Display different icons on each screen
   */
  const fabIcon = getFabIcon(route);

  const onFabPress = () => {
    if (routeName === "timelines") {
      navigation.navigate("addTimeline");
    }
  };

  const tabBarColor = theme.dark
    ? (overlay(6, theme.colors.surface) as string)
    : theme.colors.surface;

  return (
    <React.Fragment>
      <Tab.Navigator
        initialRouteName="timelines"
        backBehavior="initialRoute"
        shifting={true}
        activeColor={theme.colors.primary}
        inactiveColor={color(theme.colors.text).alpha(0.6).rgb().string()}
        sceneAnimationEnabled={false}
      >
        <Tab.Screen
          name="timelines"
          component={TimelineStackScreen}
          options={{
            tabBarColor,
            tabBarLabel: "Timelines",
            tabBarIcon: ({ focused, color }) => {
              const iconName = focused ? "timeline-outline" : "timeline";

              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={26}
                  color={color}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="people"
          component={PeopleStackNavigator}
          options={{
            tabBarLabel: "People",
            tabBarColor,
            tabBarIcon: ({ focused, color }) => {
              const iconName = focused
                ? "account-group-outline"
                : "account-group";

              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={26}
                  color={color}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="places"
          component={PlacesStackNavigator}
          options={{
            tabBarLabel: "Places",
            tabBarColor,
            tabBarIcon: ({ focused, color }) => {
              const iconName = focused ? "map-outline" : "map";

              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={26}
                  color={color}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
      <FAB
        visible={showFab()} // show FAB only when this screen is focused
        icon={fabIcon}
        style={{
          position: "absolute",
          bottom: insets.bottom + 65,
          right: 16,
        }}
        theme={{
          colors: {
            accent: theme.colors.primary,
          },
        }}
        onPress={() => onFabPress()}
      />
    </React.Fragment>
  );
});

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
// const exitRoutes = ["welcome"]
// export const canExit = (routeName: string) => exitRoutes.includes(routeName)
