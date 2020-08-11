/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native"

import { EventScreen, EditEventScreen, TimelinesScreen, TimelineScreen, EditTimelineScreen } from "screens"
import { TopBar } from 'components'
import { DeleteTimelineAction, DeleteEventAction, EditTimelineAction, EditEventAction } from './types'

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
export type TimelineParamList = {
  home: {
    action?: DeleteTimelineAction
  }
  // NOTE: Timeline interfaces should only be optional when goint BACK to TimelineScreen from EventScreen. Fix this.
  timeline: {
    id: string
    title?: string
    action?: DeleteEventAction | EditTimelineAction
  }
  editTimeline: { id: string }
  event: { title?: string, timelineId: string; eventId: string, action?: EditEventAction }
  editEvent: { timelineId: string, eventId: string }
}

/**
 * Utility type to make it easier to use with `useNavigation()`
 *
 * **Example usage**:
 * ```typescript
 * const navigation = useNavigation<PrimaryStackNavigationProp<"timeline">>()
 * ```
 */
export type TimelineStackNavigationProp<T extends keyof TimelineParamList> = StackNavigationProp<TimelineParamList, T>
/**
 * Utility type to make it easier to use with `useRoute()`
 *
 * **Example usage**:
 * ```typescript
 * const { params: { id } } = useRoute<PrimaryRouteProp<"timeline">>()
 * ```
 */
export type TimelineRouteProp<T extends keyof TimelineParamList> = RouteProp<TimelineParamList, T>

const TimelineStack = createStackNavigator<TimelineParamList>()

export const TimelineStackNavigator = () => {
  return (
    <TimelineStack.Navigator
      initialRouteName="home"
      headerMode="screen"
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        header: ({ scene, previous, navigation, ...props }) => (
          <TopBar scene={scene} previous={previous} navigation={navigation} {...props} />
        ),
      }}
    >
      <TimelineStack.Screen
        name="home"
        component={TimelinesScreen}
        options={() => ({ headerShown: true, headerTitle: 'Timeline' })}
      />
      <TimelineStack.Screen
        name="timeline"
        component={TimelineScreen}
        options={({ route }) => ({
          headerTitle: route.params.title || 'Timeline'
        })}
      />
      <TimelineStack.Screen
        name="editTimeline"
        component={EditTimelineScreen}
        options={({ headerTitle: 'Edit' })}
      />
      <TimelineStack.Screen
        name="event"
        component={EventScreen}
        options={({ route }) => ({
          headerTitle: route.params.title || 'Event'
        })}
      />
      <TimelineStack.Screen
        name="editEvent"
        component={EditEventScreen}
        options={({ headerTitle: 'Edit' })}
      />
    </TimelineStack.Navigator>
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
