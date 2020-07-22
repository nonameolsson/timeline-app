import React, { FunctionComponent as Component, useEffect, useState } from "react"
import { View, ViewStyle, TextStyle, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper } from "../../components"
import { color, spacing, typography } from "../../theme"
import { useStores } from "../../models/root-store/root-store-context"
import { PrimaryStackNavigationProp } from "navigation"

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
const TITLE_WRAPPER: TextStyle = {
  ...TEXT,
  textAlign: "center",
}
const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
}

const CONTENT: TextStyle = {
  ...TEXT,
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[5],
}
const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const FOOTER: ViewStyle = { backgroundColor: "#20162D" }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}

export const WelcomeScreen: Component = observer(function WelcomeScreen() {
  const navigation = useNavigation<PrimaryStackNavigationProp<"welcome">>()
  const { userStore } = useStores()
  const { timelineStore } = useStores()
  const nextScreen = () => navigation.navigate("demo")
  const [isLoading, setIsLoading] = useState(false)

  const logOut = () => {
    try {
      userStore.logOut()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    timelineStore.getTimelines(userStore.user.id)
    setIsLoading(false)
  }, [])

  const navigateToHome = () => navigation.navigate("home")

  const getTimelines = async() => timelineStore.getAllTimelines()

  return (
    <View style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header headerTx="welcomeScreen.poweredBy" style={HEADER} titleStyle={HEADER_TITLE} />
        <Text style={TITLE_WRAPPER}>
          <Text style={TITLE} text="Timelines" />
        </Text>

        {isLoading && (
          <Text style={CONTENT}>
            Loading...
          </Text>
        )}

        <Text style={TITLE_WRAPPER}>
          <Text style={TITLE} text="Events" />
        </Text>

        {isLoading && (
          <Text style={CONTENT}>
            Loading...
          </Text>
        )}
      </Screen>
      <SafeAreaView style={FOOTER}>
        <View style={FOOTER_CONTENT}>
          <Button style={CONTINUE} textStyle={CONTINUE_TEXT} onPress={getTimelines} text="Get Timelines" />
          <Button style={CONTINUE} textStyle={CONTINUE_TEXT}
            onPress={logOut}
            text="Logout"
          />
          <Button
            style={CONTINUE}
            textStyle={CONTINUE_TEXT}
            text="Home"
            onPress={navigateToHome}
          />
          <Button
            style={CONTINUE}
            textStyle={CONTINUE_TEXT}
            tx="welcomeScreen.continue"
            onPress={nextScreen}
          />
        </View>
      </SafeAreaView>
    </View>
  )
})
