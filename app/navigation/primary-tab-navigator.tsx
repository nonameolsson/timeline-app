/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Portal, FAB } from 'react-native-paper'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { useIsFocused } from '@react-navigation/native'

import { TimelineStackNavigator } from './timeline-stack-navigator'
import { PeopleStackNavigator } from './people-stack-navigator'
import { PlacesStackNavigator } from './places-stack-navigator'

const Tab = createMaterialBottomTabNavigator()

export const PrimaryTabNavigator = () => {
  const isFocused = useIsFocused()

  return (
    <React.Fragment>
      <Tab.Navigator
        initialRouteName="timelines"
        shifting={true}
      >
        <Tab.Screen
          name="timelines"
          component={TimelineStackNavigator}
          options={{
            tabBarLabel: 'Timelines',
            tabBarIcon: ({ focused, color }) => {
              const iconName = focused
                ? 'timeline-outline'
                : 'timeline'

              return <MaterialCommunityIcons name={iconName} size={26} color={color} />
            },
          }}
        />
        <Tab.Screen
          name="people"
          component={PeopleStackNavigator}
          options={{
            tabBarLabel: 'People',
            tabBarIcon: ({ focused, color }) => {
              const iconName = focused
                ? 'account-group-outline'
                : 'account-group'

              return <MaterialCommunityIcons name={iconName} size={26} color={color} />
            },
          }}
        />
        <Tab.Screen
          name="places"
          component={PlacesStackNavigator}
          options={{
            tabBarLabel: 'Places',
            tabBarIcon: ({ focused, color }) => {
              const iconName = focused
                ? 'map-outline'
                : 'map'

              return <MaterialCommunityIcons name={iconName} size={26} color={color} />
            },
          }}
        />
      </Tab.Navigator>
      <Portal>
        <FAB
          visible={isFocused} // show FAB only when this screen is focused
          icon="plus"
          style={{
            position: 'absolute',
            bottom: 100,
            right: 16,
          }}
        />
      </Portal>
    </React.Fragment>
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
