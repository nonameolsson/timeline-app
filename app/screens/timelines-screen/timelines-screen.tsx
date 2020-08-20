import React, { useState, useCallback } from "react"
import { ActivityIndicator, SafeAreaView, View, FlatList } from "react-native"
import { Text, List, Button } from "react-native-paper"
import { observer } from "mobx-react-lite"
import { useFocusEffect } from "@react-navigation/native"

import { useStores } from "models"
import { styles } from "./timelines-screen.styles"

import { EmptyState } from 'components'

// type TimelinesScreenProp = {
//   navigation: CompositeNavigationProp<
//     MaterialBottomTabNavigationProp<BottomTabParamList, "timelines">,
//     StackNavigationProp<RootTimelineParamList>>
//   route: TimelineRouteProp<"timelines">
// }

// type Props = {
//   navigation: TimelineStackNavigationProp<"timelines">
//   route: TimelineRouteProp<"timelines">
// };

export const TimelinesScreen = observer(function TimelinesScreen({ navigation, route: { params } }: any) {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Fix to get correct type
  const { userStore, timelineStore } = useStores()

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

  const renderItem = ({ item: { title, id, description } }) => (
    <List.Item
      title={title}
      key={id}
      onPress={() => openTimeline(id, title)}
      description={description}
      left={props => <List.Icon {...props} icon="folder" />}
    />
  )

  const renderList = () => {
    return <FlatList
      data={timelineStore.getTimelinesArray()}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  }

  const emptyState = () => {
    return (
      <View style={styles.emptyStateWrapper}>
        <EmptyState
          title="Empty in timelines"
          description="Start by creating a timeline and it will show up here"
          icon="timeline-plus-outline" />
        <View style={styles.emptyStateButtonWrapper}>
          <Button onPress={() => navigation.navigate('addTimeline')} mode="contained">Create timeline</Button>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        {userStore.isLoggedIn() ? (
          <>
            {isLoading
              ? <ActivityIndicator />
              : timelineStore.hasTimelines()
                ? renderList()
                : emptyState()
            }
          </>
        ) : (
          <Text>Logging in...</Text>
        )}
      </View>
    </SafeAreaView>
  )
})
