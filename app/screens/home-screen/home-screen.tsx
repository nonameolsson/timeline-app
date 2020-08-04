import React, { useEffect, useState, FunctionComponent as Component, useCallback } from "react"
import { Observer, useObserver } from "mobx-react-lite"
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native"
import { Button, Layout, Text, List, ListItem } from "@ui-kitten/components"

import { useStores, Timeline } from "models"
import { styles } from "./home-screen.styles"
import { ActivityIndicator, SafeAreaView } from "react-native"
import { PrimaryStackNavigationProp, PrimaryRouteProp } from "navigation"

export const HomeScreen: Component = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Fix to get correct type
  const { userStore, timelineStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation<PrimaryStackNavigationProp<"home">>()
  const { params } = useRoute<PrimaryRouteProp<"home">>()

  // TODO: Adjust so new timelines are retrieved when navigating to this screen.
  useEffect(() => {
    if (userStore.user) timelineStore.getTimelines(userStore.user.id).then(() => setIsLoading(false))

    return () => {
      // console.tron.log('USEFFECT CLEANUP -> HOMESCREEN')
    }
  }, [timelineStore, userStore.user])

  const deleteTimeline = useCallback(async (timelineId: string) => {
    const timeline = timelineStore.getTimeline(timelineId)
    if (timeline && params.action?.meta.id) {
      const id = params.action?.meta.id as string // FIXME: Improve type

      await timeline.deleteAllEvents()
      await timelineStore.deleteTimeline(id)
    }
  }, [params, timelineStore]) // FIXME: Don't listen to all params, just the ones needed

  useEffect(() => {
    if (params && params.action && params.action.type) {
      switch (params.action?.type) {
        case 'DELETE_TIMELINE':
          setIsLoading(true)
          deleteTimeline(params.action.meta.id)
          setIsLoading(false)
          break

        default:
          break
      }
    }
  }, [deleteTimeline, params])

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

  return useObserver(() => (
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
  )
}
