import React from "react";
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";
import { ProfileScreen } from "screens";

import { DrawerContent } from "components";

import { PrimaryTabNavigator } from "./primary-tab-navigator";

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * We recommend using MobX-State-Tree store(s) to handle state rather than navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type AppDrawerParamList = {
  app: undefined;
  profile: undefined;
};
/**
 * Utility type to make it easier to use with `useNavigation()`
 *
 * **Example usage**:
 * ```typescript
 * const navigation = useNavigation<PrimaryStackNavigationProp<"timeline">>()
 * ```
 */
export type AppDrawerNavigationProp<
  T extends keyof AppDrawerParamList
> = DrawerNavigationProp<AppDrawerParamList, T>;
/**
 * Utility type to make it easier to use with `useRoute()`
 *
 * **Example usage**:
 * ```typescript
 * const { params: { id } } = useRoute<PrimaryRouteProp<"timeline">>()
 * ```
 */
export type AppDrawerRouteProp<T extends keyof AppDrawerParamList> = RouteProp<
  AppDrawerParamList,
  T
>;

const DrawerNav = createDrawerNavigator<AppDrawerParamList>();

export const DrawerNavigator = () => {
  return (
    <DrawerNav.Navigator
      hideStatusBar={true}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <DrawerNav.Screen
        name="app"
        component={PrimaryTabNavigator}
        options={({ route }) => {
          return {
            title: route.name,
          };
        }}
      />
      <DrawerNav.Screen
        name="profile"
        component={ProfileScreen}
        options={({ route }) => {
          return {
            title: route.name,
          };
        }}
      />
    </DrawerNav.Navigator>
  );
};
