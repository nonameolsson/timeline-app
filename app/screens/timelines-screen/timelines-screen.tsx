import React, { useCallback, useState } from "react"
import { ActivityIndicator, SafeAreaView, ScrollView, View } from "react-native"
import { Button, List, Text, useTheme, FAB } from "react-native-paper"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import { observer } from "mobx-react-lite"

import { EmptyState } from "components"
import { useStores } from "models"

import { styles } from "./timelines-screen.styles"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { TimelineRouteProp } from "navigators/timeline-stack-navigator"

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

export const TimelinesScreen = observer(function TimelinesScreen() {
  const { navigate } = useNavigation()
  const { params } = useRoute<TimelineRouteProp<"timelines">>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const insets = useSafeAreaInsets()
  const theme = useTheme()

  const { userStore, timelineStore } = useStores()
  const timelines = timelineStore.getTimelinesArray()

  // TODO: Adjust so new timelines are retrieved when navigating to this screen.
  useFocusEffect(
    useCallback(() => {
      if (userStore.user) {
        console.tron.log("herp!")
        timelineStore.getTimelines(userStore.user.id).then(() => setIsLoading(false))
      }
    }, [timelineStore, userStore.user]),
  )

  useFocusEffect(
    useCallback(() => {
      if (!params || !params.action) return
      const { action } = params

      const deleteTimeline = async (timelineId: number) => {
        const timeline = timelineStore.getTimeline(timelineId)
        if (!timeline) return

        await timeline.deleteAllEvents()
        await timelineStore.deleteTimeline(timelineId)
      }

      if (action.type === "DELETE_TIMELINE") {
        setIsLoading(true)
        deleteTimeline(action.meta.id)
        setIsLoading(false)
      }
    }, [params, timelineStore]),
  )

  const openTimeline = (id: number, title: string): void => {
    navigate("timeline", { id, title })
  }

  const renderList = () => {
    if (!timelines) return null

    const timelineList: JSX.Element[] = []
    timelines.forEach(({ id, title, description, ...props }) => {
      timelineList.push(
        <List.Item
          title={title}
          key={id}
          onPress={() => openTimeline(id, title)}
          description={description}
          left={(props) => <List.Icon {...props} icon="folder" />}
        />,
      )
    })

    return <ScrollView>{timelineList}</ScrollView>
  }

  const emptyState = () => {
    return (
      <View style={styles.emptyStateWrapper}>
        <EmptyState
          title="Empty in timelines"
          description="Start by creating a timeline and it will show up here"
          icon="timeline-plus-outline"
        />
        <View style={styles.emptyStateButtonWrapper}>
          <Button onPress={() => navigate("addTimeline")} mode="contained">
            Create timeline
          </Button>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        {userStore.isLoggedIn() ? (
          <>
            {isLoading ? (
              <ActivityIndicator />
            ) : timelineStore.hasTimelines() ? (
              renderList()
            ) : (
              emptyState()
            )}
          </>
        ) : (
          <Text>Logging in...</Text>
        )}
      </View>
      {timelineStore.hasTimelines() && (
        <FAB
          icon="timeline-plus-outline"
          style={{
            position: "absolute",
            bottom: insets.bottom,
            right: 16,
          }}
          theme={{
            colors: {
              accent: theme.colors.primary,
            },
          }}
          onPress={() => navigate("addTimeline")}
        />
      )}
    </SafeAreaView>
  )
})
