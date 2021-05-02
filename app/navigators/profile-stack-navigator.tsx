/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React, { useCallback } from "react"
import { createStackNavigator, StackHeaderProps } from "@react-navigation/stack"
import { ProfileScreen } from "screens"

import { TopBar } from "components"

const ProfileStack = createStackNavigator()

export const ProfileStackScreen = () => {
  const header = useCallback(
    ({ scene, previous, navigation, ...props }: StackHeaderProps) => (
      <TopBar scene={scene} previous={previous} navigation={navigation} {...props} />
    ),
    [],
  )

  return (
    <ProfileStack.Navigator
      headerMode="screen"
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        header: (props) => header(props),
      }}
    >
      <ProfileStack.Screen
        name="profile"
        component={ProfileScreen}
        options={() => ({ headerShown: true, headerTitle: "Profile" })}
      />
    </ProfileStack.Navigator>
  )
}

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
