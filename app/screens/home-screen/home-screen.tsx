import React, { useEffect, useState, FunctionComponent as Component, useCallback } from "react"
import { useObserver } from "mobx-react-lite"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Button, Layout, Text, List, ListItem } from "@ui-kitten/components"

import { useStores, Timeline, User } from "models"
import { styles } from "./home-screen.styles"
import { ActivityIndicator, SafeAreaView } from "react-native"
import { PrimaryStackNavigationProp, PrimaryRouteProp } from "navigation"

export const HomeScreen: Component = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Fix to get correct type
  const { userStore, timelineStore } = useStores()
  const user = useStores().userStore.user as User
  console.tron.log('HomeScreen', user)
  // Pull in navigation via hook
  const navigation = useNavigation<PrimaryStackNavigationProp<"home">>()
  const { params } = useRoute<PrimaryRouteProp<"home">>()

  // Create async getTimelines()
  useEffect(() => {
    setIsLoading(true)

    // timelineStore.getTimelines(user.id).then(() => setIsLoading(false))
  }, [])

  const deleteAllTheThings = useCallback(async (timelineId: string) => {
  // const deleteAllTheThings = useCallback(async (timelineId: string) => {
    const timeline = timelineStore.getTimeline(timelineId)
    if (timeline) {
      // const id = params.action?.meta.id as string // FIXME: Improve type

      // await timeline.deleteAllEvents()
      // await timelineStore.deleteTimeline(id)
    }
  }, [timelineStore])

  useEffect(() => {
    // if (params && params.action) {
    //   switch (params.action.type) {
    //     case 'DELETE_TIMELINE':
    //       setIsLoading(true)
    //       deleteAllTheThings(params.action.meta.id)
    //       setIsLoading(false)
    //       break

    //     default:
    //       break
    //   }
    // }
  }, [deleteAllTheThings, params, timelineStore])

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

  return useObserver(() => {
    const renderItem = ({ item, index }: { item: Timeline; index: number }) => <ListItem onPress={() => openTimeline(item.id, item.title)} key={index} title={item.title} description={item.description} />
    return (
      <SafeAreaView style={styles.container}>
        <Layout style={styles.layout}>
          {userStore.isLoggedIn() ? (
            <>
              <Text category="h2">Your timelines</Text>
              {isLoading ? <ActivityIndicator />
                : timelineStore.hasTimelines() ? (
                  <List data={timelineStore.getTimelinesArray()} renderItem={renderItem} />
                ) : (
                  renderEmptyState()
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
}
