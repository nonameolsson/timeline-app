/**
 * The root navigator is used to switch between major navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow (which is contained in your PrimaryNavigator) which the user
 * will use once logged in.
 */
import React from "react"
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import { observer } from "mobx-react-lite"

import { PrimaryTabNavigator } from "./primary-tab-navigator"
import { AuthNavigator } from "./auth-navigator"
import { useStores } from "../models"
import { DrawerContent } from 'components'

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
export type RootParamList = {
  primaryStack: undefined
  authStack: undefined
}

const Stack = createStackNavigator<RootParamList>()

const RootStack = observer(function RootStack() {
  const { userStore } = useStores()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      {userStore.isLoggedIn() ? (
        <Stack.Screen
          name="primaryStack"
          component={PrimaryTabNavigator}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Stack.Screen
          name="authStack"
          component={AuthNavigator}
          options={{
            headerShown: false,
            animationTypeForReplace: 'pop'
          }}
        />
      )}
    </Stack.Navigator>
  )
})

const DrawerNav = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <DrawerNav.Navigator drawerContent={() => <DrawerContent />}>
      <DrawerNav.Screen name="Home" component={RootStack} />
    </DrawerNav.Navigator>
  )
}

export const RootNavigator = React.forwardRef<
  NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  return (
    <NavigationContainer {...props} ref={ref}>
      <DrawerNavigator />
    </NavigationContainer>
  )
})

RootNavigator.displayName = "RootNavigator"
