import React from "react"
import { Appbar, useTheme } from "react-native-paper"
import { DrawerNavigationProp } from "@react-navigation/drawer"
import { observer } from "mobx-react-lite"
import { StackHeaderProps } from "@react-navigation/stack"

export interface TopBarProps extends StackHeaderProps {}

/**
 * This is a React functional component, ready to
 *
 * Component description here for TypeScript tips.
 */
export const TopBar = observer(function TopBar({ scene, previous, navigation }: TopBarProps) {
  const { options } = scene.descriptor
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
        ? options.title
        : scene.route.name

  const { colors } = useTheme()

  return (
    <Appbar.Header theme={{ colors: { primary: colors.surface } }}>
      {options.headerLeft && options.headerLeft({})}
      {previous ? (
        <Appbar.BackAction onPress={navigation.goBack} />
      ) : (
        <Appbar.Action
          icon="menu"
          onPress={() => {
            ;((navigation as any) as DrawerNavigationProp<{}>).openDrawer()
          }}
        />
      )}
      <Appbar.Content title={title} />
      {options.headerRight && options.headerRight({})}
    </Appbar.Header>
  )
})
