/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { EventScreen, HomeScreen, TimelineScreen, WelcomeScreen, DemoScreen, EditTimelineScreen } from "screens"

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
export type PrimaryParamList = {
  welcome: undefined
  demo: undefined
  home: undefined
  timeline: { id: string, title }
  event: { timelineId: number; eventId: number }
  editTimeline: { id: string }
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<PrimaryParamList>()

export const PrimaryNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: true,
        gestureEnabled: true
      }}
    >
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={() => ({ headerShown: false, title: 'Timelines' })}
      />
      <Stack.Screen
        name="timeline"
        component={TimelineScreen}
        options={({ route }) => ({
          title: route.params.title
        })}
      />
      <Stack.Screen
        name="editTimeline"
        component={EditTimelineScreen}
        options={({ title: 'Edit' })}
      />
      <Stack.Screen
        name="event"
        component={EventScreen}
      />
      <Stack.Screen
        name="welcome"
        component={WelcomeScreen}
      />
      <Stack.Screen
        name="demo"
        component={DemoScreen}
      />
    </Stack.Navigator>
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
