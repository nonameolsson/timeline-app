import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { DrawerContent } from "components"
import { PrimaryTabNavigator } from "./primary-tab-navigator"
import { ProfileScreen } from "screens"
const DrawerNav = createDrawerNavigator()
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
          }
        }}
      />
      <DrawerNav.Screen
        name="profile"
        component={ProfileScreen}
        options={({ route }) => {
          return {
            title: route.name,
          }
        }}
      />
    </DrawerNav.Navigator>
  )
}
//# sourceMappingURL=drawer-navigator.js.map
