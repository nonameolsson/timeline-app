import React from "react"
import { View } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Title, Subheading } from "react-native-paper"
import { emptyStateStyles as styles } from "./empty-state.styles"

export interface EmptyStateProps {
  title: string
  description: string
  icon?: string
}

export const EmptyState = ({ title, description, icon }: EmptyStateProps) => {
  return (
    <View style={styles.WRAPPER}>
      {icon && <MaterialCommunityIcons name={icon} size={96} />}
      <Title>{title}</Title>
      <Subheading style={styles.SUBHEADING}>{description}</Subheading>
    </View>
  )
}
