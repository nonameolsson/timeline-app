import { ActivityIndicator, SafeAreaView, View } from "react-native"
import { Appbar, Button, FAB, Text, List, useTheme } from "react-native-paper"
import { observer } from "mobx-react-lite"
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native"
import React, { useState, FunctionComponent as Component, useCallback } from "react"

import { useStores } from "models"
import { PrimaryStackNavigationProp, PrimaryRouteProp } from "navigation"
import { styles } from "./home-screen.styles"

export const HomeScreen: Component = observer(function HomeScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const {
    colors: { background, primary },
  } = useTheme()

  // Fix to get correct type
  const { userStore, timelineStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation<PrimaryStackNavigationProp<"home">>()
  const { params } = useRoute<PrimaryRouteProp<"home">>()

  // TODO: Adjust so new timelines are retrieved when navigating to this screen.
  useFocusEffect(
    useCallback(() => {
      if (userStore.user) {
        timelineStore.getTimelines(userStore.user.id).then(() => setIsLoading(false))
      }
    }, [timelineStore, userStore.user])
  )

  useFocusEffect(
    useCallback(() => {
      if (!params || !params.action) return
      const { action } = params

      const deleteTimeline = async (timelineId: string) => {
        const timeline = timelineStore.getTimeline(timelineId)
        if (!timeline) return

        await timeline.deleteAllEvents()
        await timelineStore.deleteTimeline(timelineId)
      }

      if (action.type === 'DELETE_TIMELINE') {
        setIsLoading(true)
        deleteTimeline(action.meta.id)
        setIsLoading(false)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params])
  )

  const openTimeline = (id: string, title: string): void => {
    navigation.navigate("timeline", { id, title })
  }

  const renderEmptyState = () => <Text>Please create a timeline first.</Text>

  const logOut = () => {
    try {
      userStore.logOut()
    } catch (error) {
      console.error(error)
    }
  }

  const renderList = () => {
    return timelineStore.getTimelinesArray().map(timeline => (
      <List.Item
        title={timeline.title}
        key={timeline.id}
        onPress={() => openTimeline(timeline.id, timeline.title)}
        description={timeline.description}
        left={props => <List.Icon {...props} icon="folder" />}
      />
    ))
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Appbar>
        <Appbar.Content title="Timeline" />
      </Appbar>
      <View style={[styles.container, { backgroundColor: background }]}>
        {userStore.isLoggedIn() ? (
          <>
            <Text>Your timelines</Text>
            {isLoading
              ? <ActivityIndicator />
              : timelineStore.hasTimelines()
                ? renderList()
                : renderEmptyState()
            }
            <FAB
              icon="plus"
              style={[styles.fab, { backgroundColor: primary }]}
              onPress={() => setIsLoading(!isLoading)}
            />
          </>
        ) : (
          <Text>Logging in...</Text>
        )}
        <Button onPress={(): void => logOut()}>Log out</Button>
      </View>
    </SafeAreaView>
  )
})
