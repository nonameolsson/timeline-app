/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React, { useState, useEffect } from "react"
import color from 'color'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FAB, useTheme } from 'react-native-paper'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useSafeArea } from 'react-native-safe-area-context'

import { TimelineStackScreen } from './timeline-stack-navigator'
import { PeopleStackNavigator } from './people-stack-navigator'
import { PlacesStackNavigator } from './places-stack-navigator'
import { overlay } from 'theme/overlay'
import { getActiveRouteName } from './navigation-utilities'
import { useStores } from 'models'
import { observer } from 'mobx-react-lite'
import { autorun, reaction } from 'mobx'

export type BottomTabParamList = {
  timelines: undefined
  people: undefined
  places: undefined
}

const Tab = createMaterialBottomTabNavigator<BottomTabParamList>()

// FIXME: This should be used instead of putting code inside the component
/**
 * Calculate when the global FAB should be displayed
 */
// deepscan-disable-next-line
const useFab = (routeName: string, isFocused: boolean) => {
  const { timelineStore } = useStores()
  const [showFab, setShowFab] = useState(true)

  useEffect(() => {
    if (!isFocused) setShowFab(false)

    switch (routeName) {
      case 'timeline':
        timelineStore.hasTimelines() ? setShowFab(true) : setShowFab(false)
        break

      case 'people':
        setShowFab(true)
        break

      case 'places':
        setShowFab(false)
        break

      default:
        setShowFab(true)
        break
    }
  }, [isFocused, routeName, timelineStore.timelines])

  return ([showFab])
}

export const PrimaryTabNavigator = observer(function PrimaryTabNavigator({ route }: any) {
  const routeName = route.state ? getActiveRouteName(route.state) : 'timelines'
  const { timelineStore } = useStores()
  const navigation = useNavigation()
  const theme = useTheme()
  const isFocused = useIsFocused()
  const safeArea = useSafeArea()
  const [showFab, setShowFab] = useState(false)

  useEffect(() => {
    if (!isFocused) return

    if (routeName === 'timelines') {
      if (timelineStore.hasTimelines() === true) {
        setShowFab(true)
      } else {
        setShowFab(false)
      }
    } else if (routeName === 'timeline') {
      setShowFab(true)
    } else if (routeName === 'people') {
      setShowFab(true)
    } else {
      setShowFab(false)
    }
  }, [routeName, setShowFab, showFab, timelineStore])

  const icon = routeName === 'timelines'
    ? 'timeline-plus-outline'
    : routeName === 'people' ? 'account-plus-outline'
      : routeName === 'places' ? 'map-plus'
        : 'plus'

  const tabBarColor = theme.dark
    ? (overlay(6, theme.colors.surface) as string)
    : theme.colors.surface

  const onFabPress = () => {
    if (routeName === 'timelines') {
      navigation.navigate('addTimeline')
    } else if (routeName === 'people') {
      navigation.navigate('addPeople')
    } else if (routeName === 'places') {
      navigation.navigate('addPlace')
    }
  }

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
          component={TimelineStackScreen}
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
      <FAB
        visible={showFab} // show FAB only when this screen is focused
        icon={icon}
        style={{
          position: 'absolute',
          bottom: safeArea.bottom + 65,
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
  )
})

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
