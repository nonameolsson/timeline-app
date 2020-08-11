/**
 * The root navigator is used to switch between major navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow (which is contained in your PrimaryNavigator) which the user
 * will use once logged in.
 */
import React from "react"
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer'
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { View, StyleSheet } from 'react-native'
import {
  Avatar,
  Caption,
  Drawer,
  Paragraph,
  Switch,
  Text,
  Title,
  TouchableRipple
} from 'react-native-paper'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'

import { PrimaryTabNavigator } from "./primary-tab-navigator"
import { AuthNavigator } from "./auth-navigator"
import { useStores } from "../models"

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
export type RootParamList = {
  primaryStack: undefined
  authStack: undefined
}

const Stack = createStackNavigator<RootParamList>()

const RootStack = observer(function RootStack() {
  const { userStore } = useStores()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      {userStore.isLoggedIn() ? (
        <Stack.Screen
          name="primaryStack"
          component={PrimaryTabNavigator}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Stack.Screen
          name="authStack"
          component={AuthNavigator}
          options={{
            headerShown: false,
            animationTypeForReplace: 'pop'
          }}
        />
      )}
    </Stack.Navigator>
  )
})

const DrawerNav = createDrawerNavigator()

const styles = StyleSheet.create({
  bottomDrawerSection: {
    borderTopWidth: 1,
    marginBottom: 15
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  drawerContent: {
    flex: 1,
  },
  drawerSection: {
    marginTop: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  section: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 3,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
})

export const DrawerContent = observer(function DrawerContent(props) {
  const { userStore } = useStores()

  const logOut = () => userStore.logOut()

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                <Title style={styles.title}>John Doe</Title>
                <Caption style={styles.caption}>@j_doe</Caption>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                <Caption style={styles.caption}>Following</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                <Caption style={styles.caption}>Followers</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="home-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Home"
              onPress={() => {}}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="account-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Profile"
              onPress={() => {}}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="bookmark-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Bookmarks"
              onPress={() => {}}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="settings-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Settings"
              onPress={() => {}}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="account-check-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Support"
              onPress={() => {}}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple onPress={() => { }}>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch />
                  {/* <Switch value={paperTheme.dark}/> */}
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon
              name="exit-to-app"
              color={color}
              size={size}
            />
          )}
          label="Sign Out"
          onPress={() => logOut() }
        />
      </Drawer.Section>
    </View>
  )
})

const DrawerNavigator = () => {
  return (
    <DrawerNav.Navigator drawerContent={() => <DrawerContent />}>
      <DrawerNav.Screen name="Home" component={RootStack} />
    </DrawerNav.Navigator>
  )
}

export const RootNavigator = React.forwardRef<
  NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  return (
    <NavigationContainer {...props} ref={ref}>
      <DrawerNavigator />
    </NavigationContainer>
  )
})

RootNavigator.displayName = "RootNavigator"
