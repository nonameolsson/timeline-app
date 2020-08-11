import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerContent } from 'components'
import { PrimaryTabNavigator } from './primary-tab-navigator'

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
    <DrawerNav.Navigator hideStatusBar={true} drawerContent={props => <DrawerContent {...props} />}>
      <DrawerNav.Screen
        name="app"
        component={PrimaryTabNavigator}
        options={({ route }) => {
          console.tron.log('!@# options', { route })
          const routeName = route.state
            ? route.state.routes[route.state.index].name
            : 'Feed'
          return { headerTitle: routeName }
        }}
      />
    </DrawerNav.Navigator>
  )
}
