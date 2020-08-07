import React, { useState, FunctionComponent as Component, useCallback } from "react"
import { Observer, observer } from "mobx-react-lite"
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native"
import { Button, Text, ListItem, Layout, List } from "@ui-kitten/components"

import { useStores, Timeline } from "models"
import { styles } from "./home-screen.styles"
import { PrimaryStackNavigationProp, PrimaryRouteProp } from "navigation"
import { SafeAreaView, ActivityIndicator } from 'react-native'

export const HomeScreen: Component = observer(function HomeScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(true)

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

  const renderItem = ({ item, index }: { item: Timeline; index: number }) => (
    <Observer>
      {() => <ListItem onPress={() => openTimeline(item.id, item.title)} key={index} title={item.title} description={item.description} />}
    </Observer>
  )

  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.layout}>
        {userStore.isLoggedIn() ? (
          <>
            <Text category="h2">Your timelines</Text>
            {isLoading
              ? <ActivityIndicator />
              : timelineStore.hasTimelines()
                ? <List data={timelineStore.getTimelinesArray()} renderItem={(renderItem)} />
                : (renderEmptyState()
                )}
            <Button onPress={() => setIsLoading(!isLoading)}>Create timeline</Button>
          </>
        ) : (
          <Text>Logging in...</Text>
        )}
        <Button onPress={(): void => logOut()}>Log out</Button>
      </Layout>
    </SafeAreaView>
  )
})
