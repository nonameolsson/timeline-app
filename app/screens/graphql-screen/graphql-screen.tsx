import React, { FunctionComponent as Component } from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Screen, Text, Wallpaper, Header } from "../../components"
import { color, spacing, typography } from "../../theme"
import { GraphQL } from "../../components/graphql/graphql"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const CONTENT: TextStyle = {
  ...TEXT,
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[5],
}

export const GraphQLScreen: Component = observer(function WelcomeScreen() {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()

  return (
    <View style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header
          headerTx="demoScreen.howTo"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <GraphQL title="GraphQL1" />
        <GraphQL title="GraphQL2a" />
        <Text style={CONTENT}>
          This probably isn't what your app is going to look like. Unless your designer handed you
          this screen and, in that case, congrats! You're ready to ship.
        </Text>
      </Screen>
    </View>
  )
})
