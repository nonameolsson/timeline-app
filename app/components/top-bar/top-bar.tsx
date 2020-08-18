import { Appbar, useTheme, Avatar } from "react-native-paper"
import { observer } from 'mobx-react-lite'
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { StackHeaderProps } from '@react-navigation/stack'
import { TouchableOpacity } from 'react-native'
import React, { FunctionComponent as Component } from "react"
import { DrawerNavigationProp } from '@react-navigation/drawer'

export interface TopBarProps extends StackHeaderProps { }

/**
 * This is a React functional component, ready to
 *
 * Component description here for TypeScript tips.
 */
export const TopBar: Component<TopBarProps> = observer(function TopBar({ scene, previous, navigation }) {
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
      {options.headerLeft && options.headerLeft({})}
      {previous ? (
        <Appbar.BackAction
          onPress={navigation.goBack}
          color={colors.primary}
        />
      ) : (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => {
            ((navigation as any) as DrawerNavigationProp<{}>).openDrawer()
          }}
        >
          <Avatar.Image
            size={40}
            source={{
              uri:
                'https://api.adorable.io/avatars/50/hey@adorable.io.png',
            }}
          />
        </TouchableOpacity>
      )}
      <Appbar.Content
        title={
          title === 'Timelines' ? (
            <MaterialCommunityIcons
              style={{ marginRight: 10 }}
              name="twitter"
              size={40}
              color={colors.primary}
            />
          ) : (
            title
          )
        }
        titleStyle={{
          fontSize: 18,
          fontWeight: 'bold',
          color: colors.primary,
        }}
      />
      {options.headerRight && options.headerRight({})}
    </Appbar.Header>
  )
})
