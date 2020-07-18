import React, { useEffect, useState, FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableHighlight, ScrollView, Button } from "react-native"
import { Screen, Text } from "components"
import { useNavigation } from "@react-navigation/native"
import { useStores, Timeline } from "models"
import { color } from "theme"
import { styles } from "./home-screen.styles"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

export const HomeScreen: Component = observer(function HomeScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Pull in one of our MST stores
  const { userStore, timelineStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  // Create async getTimelines()
  useEffect(() => {
    setIsLoading(true)

    timelineStore.getTimelinesByUser(userStore.user.id).then(() => setIsLoading(false))
  }, [])

  const openTimeline = (timeline: Timeline): void => {
    // const params: ITimelineScreenParams = { timeline }
    // navigation.navigate("Timeline", params)
    navigation.navigate("timeline", { timelineId: timeline.id })
  }

  const renderTimelines = (): JSX.Element => {
    /** Array containing a JSX Element for the each timeline */
    const timelines = []
    timelineStore.timelines.forEach(timeline => {
      const line: JSX.Element = (
        <TouchableHighlight
          key={timeline.id}
          style={styles.events}
          onPress={(): void => openTimeline(timeline)}
        >
          <View>
            <Text>{timeline.title}</Text>
          </View>
        </TouchableHighlight>
      )

      timelines.push(line)
    })

    return <ScrollView>{timelines}</ScrollView>
  }

  const renderEmptyState = () => <Text>Please create a timeline first.</Text>

  const logOut = () => {
    try {
      userStore.logOut()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" tx="homeScreen.header" />
      {/* <View style={styles.container}> */}
      <View>
        {userStore.isLoggedIn ? (
          <>
            <Text>Your timelines</Text>
            {isLoading ? (
              <Text>Loading...</Text>
            ) : timelineStore.timelines.length > 0 ? (
              renderTimelines()
            ) : (
              renderEmptyState()
            )}
            <Button title="Create timeline" onPress={() => undefined} />
          </>
        ) : (
          <Text>Logging in...</Text>
        )}
        <Button title="Log out" onPress={(): void => logOut()} />
      </View>
    </Screen>
  )
})
