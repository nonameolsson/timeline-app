import React, { FunctionComponent as Component } from "react"
import { View } from "react-native"
import { useObserver } from 'mobx-react-lite'
import { Drawer, TouchableRipple, Switch, Avatar, Title, Caption, Text } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { drawerContentStyles as styles } from "./drawer-content.styles"
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'

import { useStores } from 'models'

export interface DrawerContentProps {}

/**
 * This is a React functional component, ready to
 *
 * Component description here for TypeScript tips.
 */
export const DrawerContent: Component<DrawerContentProps> = props => {
  const { userStore, uiStore } = useStores()

  const logOut = () => userStore.logOut()

  return useObserver(() => (
    <View style={styles.wrapper}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={styles.avatar}>
              <Avatar.Image
                source={{
                  uri: 'https://api.adorable.io/avatars/50/hey@adorable.io.png'
                }}
                size={50}
              />
              <View style={styles.userInfo}>
                <Title style={styles.title}>{userStore.user?.username}</Title>
                <Caption style={styles.caption}>{userStore.user?.email}</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="home-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Home"
              onPress={() => props.navigation.navigate('app')}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="account-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Profile"
              onPress={() => props.navigation.navigate('profile')}
            />
            {/* <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="settings-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Settings"
              onPress={() => {}}
            /> */}
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View>
                  <Switch value={uiStore.theme === 'dark'} onValueChange={uiStore.toggleTheme} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons
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
  ))
}
