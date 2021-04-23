import React from 'react'
import { useTheme } from 'react-native-paper'
import { HeaderButton, HeaderButtons } from 'react-navigation-header-buttons'
import { MaterialIcons } from '@expo/vector-icons'

// define IconComponent, color, sizes and OverflowIcon in one place
const MaterialHeaderButton = props => {
  const {
    colors: { text },
  } = useTheme()

  return <HeaderButton color={text} IconComponent={MaterialIcons} iconSize={23} {...props} />
}

export const MaterialHeaderButtons = ({
  left = undefined,
  ...props
}: {
  children: JSX.Element | JSX.Element[]
  left?: boolean
}) => {
  return <HeaderButtons HeaderButtonComponent={MaterialHeaderButton} left={left} {...props} />
}
export { Item } from 'react-navigation-header-buttons'
