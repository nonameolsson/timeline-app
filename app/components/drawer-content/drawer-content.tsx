import React from "react"
import { Linking, SafeAreaView, View } from "react-native"
import {
  Avatar,
  Caption,
  Divider,
  Drawer,
  Switch,
  Text,
  Title,
  TouchableRipple,
} from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"
import { observer } from "mobx-react-lite"

import { useStores } from "models"

import { drawerContentStyles as styles } from "./drawer-content.styles"
import { useNavigation } from "@react-navigation/native"

/**
 * This is a React functional component, ready to
 *
 * Component description here for TypeScript tips.
 */

export const DrawerContent = observer(() => {
  const { userStore, uiStore } = useStores()
  const { navigate } = useNavigation()

  const openHelp = () => Linking.openURL("https://yourtimeline.app")

  const logOut = () => userStore.logOut()

  return (
    <SafeAreaView style={styles.wrapper}>
      <DrawerContentScrollView>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={styles.avatar}>
              <Avatar.Icon style={styles.avatar} size={50} icon="emoticon-poop" />
              <View style={styles.userInfo}>
                <Title style={styles.title}>{userStore.user?.username}</Title>
                <Caption style={styles.caption}>{userStore.user?.email}</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => navigate("app")}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons name="account-outline" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => navigate("profile")}
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
                  <Switch value={uiStore.theme === "dark"} onValueChange={uiStore.toggleTheme} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Divider />
      <Drawer.Section>
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="help-circle" color={color} size={size} />
          )}
          label="Help"
          onPress={openHelp}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => logOut()}
        />
      </Drawer.Section>
    </SafeAreaView>
  )
})
