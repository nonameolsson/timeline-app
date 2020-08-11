import { Appbar, useTheme } from "react-native-paper"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { observer } from 'mobx-react-lite'
import { StackHeaderProps } from '@react-navigation/stack'
import { Platform } from 'react-native'
import React, { FunctionComponent as Component } from "react"

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical' // FIXME: When adding overflow icons

// export interface TopBarProps extends StackHeaderProps, DrawerScreenProps { }

/**
 * This is a React functional component, ready to
 *
 * Component description here for TypeScript tips.
 */
export const TopBar: Component<TopBarProps> = observer(function TopBar({ scene, navigation }) {
  // const navigation = useNavigation()

  const { options } = scene.descriptor
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
        ? options.title
        : scene.route.name

  const {
    colors
  } = useTheme()

  return (
    <Appbar.Header theme={{ colors: { primary: colors.surface } }}>

      {scene.route.name === 'home' ? (
        <Appbar.Action
          onPress={() => navigation.openDrawer()}
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="menu"
              color={color}
              size={size}
            />
          )}
        />
      ) : (
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          color={colors.primary}
        />
      )}
      <Appbar.Content
        title={
          title
          // previous ? title : <MaterialCommunityIcons name="save" size={40} /> // Shows custom icon on start screen, and text on others
        }
      />
      {options.headerRight && options.headerRight({})}
    </Appbar.Header>
  )
})
