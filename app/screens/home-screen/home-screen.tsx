import React, { useEffect, useState, FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Button, Layout, Text, List, ListItem } from "@ui-kitten/components"

import { useStores, Timeline } from "models"
import { styles } from "./home-screen.styles"
import { SafeAreaView } from "react-native"
import { PrimaryStackNavigationProp, PrimaryRouteProp } from "navigation"

export const HomeScreen: Component = observer(function HomeScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Pull in one of our MST stores
  const { userStore, timelineStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation<PrimaryStackNavigationProp<"home">>()
  const { params } = useRoute<PrimaryRouteProp<"home">>()

  // Create async getTimelines()
  useEffect(() => {
    setIsLoading(true)

    timelineStore.getTimelines(userStore.user.id).then(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    if (params?.deleteTimeline) {
      // Post updated, do something with `params.post`
      // For example, send the post to the server
      timelineStore.deleteTimeline(params?.deleteTimeline)
    }
  }, [params?.deleteTimeline])

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

  const renderItem = ({ item, index }: { item: Timeline; index: number }) => <ListItem onPress={() => openTimeline(item.id, item.title)} key={index} title={item.title} description={item.description} />

  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.layout}>
        {userStore.isLoggedIn ? (
          <>
            <Text category="h2">Your timelines</Text>
            {isLoading ? (
              <Text>Loading...</Text>
            ) : timelineStore.hasTimelines ? (
              <List data={timelineStore.getTimelinesArray()} renderItem={renderItem} />
            ) : (
              renderEmptyState()
            )}
            <Button onPress={() => undefined}>Create timeline</Button>
          </>
        ) : (
          <Text>Logging in...</Text>
        )}
        <Button onPress={(): void => logOut()}>Log out</Button>
      </Layout>
    </SafeAreaView>
  )
})
