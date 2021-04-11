/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from 'react'
import { RouteProp } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
import { PeopleScreen } from 'screens'

import { TopBar } from 'components'

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type PeopleParamList = {
  people: undefined
}

/**
 * Utility type to make it easier to use with `useNavigation()`
 *
 * **Example usage**:
 * ```typescript
 * const navigation = useNavigation<PrimaryStackNavigationProp<"timeline">>()
 * ```
 */
export type PeopleStackNavigationProp<T extends keyof PeopleParamList> = StackNavigationProp<PeopleParamList, T>
/**
 * Utility type to make it easier to use with `useRoute()`
 *
 * **Example usage**:
 * ```typescript
 * const { params: { id } } = useRoute<PrimaryRouteProp<"timeline">>()
 * ```
 */
export type PeopleRouteProp<T extends keyof PeopleParamList> = RouteProp<PeopleParamList, T>

const PeopleStack = createStackNavigator<PeopleParamList>()

export const PeopleStackNavigator = () => {
  return (
    <PeopleStack.Navigator
      initialRouteName="people"
      headerMode="screen"
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        header: ({ scene, previous, navigation, ...props }) => (
          <TopBar scene={scene} previous={previous} navigation={navigation} {...props} />
        ),
      }}
    >
      <PeopleStack.Screen
        name="people"
        component={PeopleScreen}
        options={() => ({ headerShown: true, headerTitle: 'People' })}
      />
    </PeopleStack.Navigator>
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
