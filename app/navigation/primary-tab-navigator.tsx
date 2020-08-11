/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"
import color from 'color'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Portal, FAB, useTheme } from 'react-native-paper'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { useIsFocused, RouteProp } from '@react-navigation/native'

import { TimelineStackNavigator } from './timeline-stack-navigator'
import { PeopleStackNavigator } from './people-stack-navigator'
import { PlacesStackNavigator } from './places-stack-navigator'
import { RootParamList } from './root-navigator'
import { useSafeArea } from 'react-native-safe-area-context'
import { overlay } from 'theme/overlay'

type Props = {
  route: RouteProp<RootParamList, 'drawerNav'>
}

const Tab = createMaterialBottomTabNavigator()

export const PrimaryTabNavigator = (props: Props) => {
  const isFocused = useIsFocused()
  const theme = useTheme()
  const safeArea = useSafeArea()

  const routeName = props.route.state
    ? props.route.state.routes[props.route.state.index].name as string
    : 'timelines'

  const icon = routeName === 'timelines'
    ? 'timeline-plus-outline'
    : routeName === 'people' ? 'account-plus-outline'
      : routeName === 'places' ? 'map-plus'
        : 'plus'

  const tabBarColor = theme.dark
    ? (overlay(6, theme.colors.surface) as string)
    : theme.colors.surface

  return (
    <React.Fragment>
      <Tab.Navigator
        initialRouteName="timelines"
        backBehavior="initialRoute"
        shifting={true}
        activeColor={theme.colors.primary}
        inactiveColor={color(theme.colors.text)
          .alpha(0.6)
          .rgb()
          .string()}
        sceneAnimationEnabled={false}
      >
        <Tab.Screen
          name="timelines"
          component={TimelineStackNavigator}
          options={{
            tabBarColor,
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
            tabBarColor,
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
            tabBarColor,
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
          icon={icon}
          style={{
            position: 'absolute',
            bottom: safeArea.bottom + 65,
            right: 16,
          }}
          color="white"
          theme={{
            colors: {
              accent: theme.colors.primary,
            },
          }}
          onPress={() => {}}
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
