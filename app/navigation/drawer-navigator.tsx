import React from 'react'
import { Platform } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerContent } from 'components'

import { PrimaryTabNavigator } from './primary-tab-navigator'
import { ProfileScreen } from 'screens'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { AddTimelineScreen } from 'screens/add-timeline-screen'
import { Text, Button } from 'react-native-paper'

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
export type DrawerParamList = {
  app: undefined
}

const DrawerNav = createDrawerNavigator()

export const DrawerNavigator = () => {
  return (
    <DrawerNav.Navigator
      hideStatusBar={true}
      drawerContent={props => <DrawerContent {...props} />}>
      <DrawerNav.Screen
        name="app"
        component={PrimaryTabNavigator}
        options={({ route }) => {
          return {
            title: route.name
          }
        }}
      />
      <DrawerNav.Screen
        name="profile"
        component={ProfileScreen}
        options={({ route }) => {
          return {
            title: route.name
          }
        }}
      />
    </DrawerNav.Navigator>
  )
}

export type RootTimelineParamList = {
  main: DrawerParamList
  addTimeline: undefined
}
const RootTimelineStack = createStackNavigator<RootTimelineParamList>()
const transition = () => Platform.OS === 'ios' ? TransitionPresets.ModalPresentationIOS : undefined

const AddTimelineStack = createStackNavigator()

const AddTimelineStackScreen = () => (
  <AddTimelineStack.Navigator>
    <AddTimelineStack.Screen
      name="addTimeline"
      component={AddTimelineScreen}
    />
  </AddTimelineStack.Navigator>
)

export const RootTimelineStackScreen = () => (
  <RootTimelineStack.Navigator
    initialRouteName="main"
    // mode="modal"
    // screenOptions={() => {
    // return {
    // headerShown: false,
    // gestureEnabled: true,
    // cardOverlayEnabled: true,
    // ...transition()
    //   }
    // }}
  >
    <RootTimelineStack.Screen
      name="main"
      component={DrawerNavigator}
    />
    <RootTimelineStack.Screen
      name="addTimeline"
      // options={() => ({ headerBackImage: () => null, headerBackTitle: 'Cancel', headerRight: () => <Text>asdhf</Text>, headerShown: true, headerTitle: 'Add Timeline' })}
      component={AddTimelineStackScreen}
      options={{
        title: 'hsej',
        headerRight: () => (
          <Text
            onPress={() => undefined}
            color="#fff"
          >Info</Text>
        ),
      }}
    />
  </RootTimelineStack.Navigator>)
