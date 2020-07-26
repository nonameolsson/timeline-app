import React, { useEffect, useState, FunctionComponent as Component, useCallback, useLayoutEffect } from "react"
import { useObserver, observer } from "mobx-react-lite"
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native"
import { Button, Layout, Text, List, ListItem } from "@ui-kitten/components"

import { useStores, Timeline, User, RootStore, useInject } from "models"
import { styles } from "./home-screen.styles"
import { ActivityIndicator, SafeAreaView } from "react-native"
import { PrimaryStackNavigationProp, PrimaryRouteProp } from "navigation"

const mapStore = (rootStore: RootStore) => ({ getTimelines: rootStore.timelineStore.getTimelines })

export const HomeScreen: Component = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Fix to get correct type
  const { userStore, timelineStore } = useStores()
  const { getTimelines } = useInject(mapStore)
  const user = useStores().userStore.user as User
  // console.tron.log('HomeScreen', user)

  // Pull in navigation via hook
  const navigation = useNavigation<PrimaryStackNavigationProp<"home">>()
  const { params } = useRoute<PrimaryRouteProp<"home">>()

  // TEST 1
  // useFocusEffect(
  //   React.useCallback(() => {
  //     console.tron.log('useFocusEffect')
  //     // Get latest timelines and events from API. Maybe this isn't the best way to do it.
  //     // NOTE: We could update this screen by updating values from TimelineScreen. When support for people and places is added, this must be changed.
  //     // Must re-render with latest props.
  //     // timelineStore.getTimelines(user.id).then(() => setIsLoading(false))
  //     console.tron.log(timelineStore)

  //     return () => {
  //       // isActive = false
  //     }
  //   }, [timelineStore, user.id])
  // )

  // TEST 2
  useEffect(() => {
    if (user) getTimelines(user.id).then(() => setIsLoading(false))
    console.tron.log('USEFFECT -> HOMESCREEN')

    return () => {
      console.tron.log('USEFFECT CLEANUP -> HOMESCREEN')
    }
  }, [getTimelines, timelineStore, user])

  const deleteTimeline = useCallback(async (timelineId: string) => {
    const timeline = timelineStore.getTimeline(timelineId)
    if (timeline && params.action?.meta.id) {
    // if (timeline && params.action && params.action.meta && params.action.meta.id) {
      const id = params.action?.meta.id as string // FIXME: Improve type

      await timeline.deleteAllEvents()
      await timelineStore.deleteTimeline(id)
    }
  }, [params, timelineStore])

  useEffect(() => {
    if (params && params.action) {
      switch (params.action.type) {
        case 'DELETE_TIMELINE':
          setIsLoading(true)
          deleteTimeline(params.action.meta.id)
          setIsLoading(false)
          break

        default:
          break
      }
    }
  }, [deleteTimeline, params, timelineStore])

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
  console.tron.log('HOMESCREEN -> BEFORE OBSERVER')

  return useObserver(() => {
    const renderItem = ({ item, index }: { item: Timeline; index: number }) => <ListItem onPress={() => openTimeline(item.id, item.title)} key={index} title={item.title} description={item.description} />

    console.tron.log('HOMESCREEN -> OBSERVER')

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
