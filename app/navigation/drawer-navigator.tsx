import React from 'react'
import { Platform } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerContent, AddTimelineForm } from 'components'

import { PrimaryTabNavigator } from './primary-tab-navigator'
import { ProfileScreen } from 'screens'
import { createStackNavigator, CardStyleInterpolators, TransitionPresets } from '@react-navigation/stack'

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

export const RootTimelineStackScreen = () => {
  return (
    <RootTimelineStack.Navigator
      initialRouteName="main"
      headerMode="none"
      mode="modal"
      screenOptions={() => {
        return {
          gestureEnabled: true,
          cardOverlayEnabled: true,
          ...transition()
        }
      }}
    >
      <RootTimelineStack.Screen
        name="main"
        component={DrawerNavigator}
      />
      <RootTimelineStack.Screen
        options={{ headerShown: true }}
        name="addTimeline"
        component={AddTimelineForm}
      />
    </RootTimelineStack.Navigator>)
}
