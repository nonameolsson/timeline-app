import { SafeAreaView, Alert, ScrollView, View } from "react-native"
import { Card, Text, List, useTheme, Headline } from "react-native-paper"
import { observer } from "mobx-react-lite"
import { useNavigation, useFocusEffect, useRoute } from "@react-navigation/native"
import React, { FunctionComponent as Component, useCallback } from "react"

import { TimelineStackNavigationProp, TimelineRouteProp } from "navigation"
import { Timeline } from "navigation/types"
import { useStores } from "models"
import { styles } from "./timeline-screen.styles"
import { MaterialHeaderButtons, Item } from "components"

export const TimelineScreen: Component = observer(function TimelineScreen() {
  const { timelineStore } = useStores()
  const navigation = useNavigation<TimelineStackNavigationProp<"timeline">>()
  const { params } = useRoute<TimelineRouteProp<"timeline">>()

  const {
    colors: { background },
  } = useTheme()

  const timeline = timelineStore.getTimeline(params.id)

  const goToEditTimelineScreen = useCallback(() => {
    navigation.navigate("editTimeline", { id: params.id })
  }, [navigation, params.id])

  const deleteTimeline = useCallback(() => {
    navigation.navigate("timelines", {
      action: { type: "DELETE_TIMELINE", meta: { id: params.id } },
    })
  }, [navigation, params.id])

  const showDeleteAlert = useCallback(() => {
    Alert.alert(
      "Delete timeline",
      "Do you really want to delete the timeline and all of the events?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteTimeline() },
      ],
      { cancelable: false },
    )
  }, [deleteTimeline])

  React.useLayoutEffect(() => {
    navigation.setOptions({
      // in your app, extract the arrow function into a separate component
      // to avoid creating a new one every time
      headerRight: () => (
        <MaterialHeaderButtons>
          <Item title="Delete" iconName="delete" onPress={() => showDeleteAlert()} />
          <Item title="Edit" iconName="edit" onPress={() => goToEditTimelineScreen()} />
        </MaterialHeaderButtons>
      ),
    })
  }, [goToEditTimelineScreen, navigation, showDeleteAlert])

  useFocusEffect(
    useCallback(() => {
      if (!params.action || !timeline) return
      const { action } = params

      const deleteEvent = async (eventId: string) => {
        await timeline.deleteEvent(eventId)
      }

      const editTimeline = async (payload: Timeline) => {
        await timeline.editTimeline(payload)
      }

      if (action.type === "DELETE_EVENT") {
        deleteEvent(action.meta.id)
      } else if (action.type === "EDIT_TIMELINE") {
        editTimeline(action.payload)
      }
    }, [params, timeline]),
  )

  // Make sure all data exists before using it
  if (!timeline) return null

  const openEvent = (eventId: string) => {
    const event = timeline.getEvent(eventId)

    navigation.navigate("event", { title: event?.title, timelineId: params.id, eventId })
  }

  const renderEventList = () => {
    const events = timeline.events.map(event => (
      <List.Item
        key={event.id}
        onPress={() => openEvent(event.id)}
        title={event.title}
        description={event.description}
      />
    ))

    return <ScrollView>{events}</ScrollView>
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.container, { backgroundColor: background }]}>
        <Card style={{ padding: 16 }}>
          <Text>{timeline.description}</Text>
        </Card>

        {/* <Button onPress={() => navigation.navigate(null, { timelineId: timeline.id })}>Add new event</Button> */}
        <Headline>Events - {timeline.events.length}</Headline>

        {renderEventList()}
      </View>
    </SafeAreaView>
  )
})
