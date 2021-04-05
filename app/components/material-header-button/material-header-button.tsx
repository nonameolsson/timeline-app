import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { HeaderButtons, HeaderButton } from 'react-navigation-header-buttons'
import { useTheme } from 'react-native-paper'

// define IconComponent, color, sizes and OverflowIcon in one place
const MaterialHeaderButton = props => {
  const {
    colors: { text },
  } = useTheme()

  return <HeaderButton IconComponent={MaterialIcons} iconSize={23} color={text} {...props} />
}

export const MaterialHeaderButtons = ({
  left = undefined,
  ...props
}: {
  children: JSX.Element | JSX.Element[]
  left?: boolean
}) => {
  return <HeaderButtons left={left} HeaderButtonComponent={MaterialHeaderButton} {...props} />
}
export { Item } from 'react-navigation-header-buttons'
