import React, { FunctionComponent as Component, useCallback, useLayoutEffect } from "react"
import { Alert, SafeAreaView, ScrollView, View } from "react-native"
import { Card, FAB, Headline, List, Paragraph, useTheme } from "react-native-paper"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Timeline } from "navigators/types"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Item, MaterialHeaderButtons } from "components"
import { TimelineRouteProp, TimelineStackNavigationProp } from "navigators"
import { ModalStackNavigationProp } from "navigators/modal-stack"
import { useStores } from "models"
import { Timeline as TimelineType } from "models/timeline/timeline"

import { styles } from "./timeline-screen.styles"

export const TimelineScreen: Component = observer(function TimelineScreen() {
  const { timelineStore } = useStores()
  const { navigate, setOptions } = useNavigation<
    TimelineStackNavigationProp<"timeline"> & ModalStackNavigationProp<"addEvent">
  >()
  const { params } = useRoute<TimelineRouteProp<"timeline">>()

  const {
    colors: { background },
  } = useTheme()
  const insets = useSafeAreaInsets()
  const theme = useTheme()

  const timeline: TimelineType | undefined = timelineStore.getTimeline(params.id)
  const events = timeline?.getEvents()

  const goToEditTimelineScreen = useCallback(() => {
    navigate("editTimeline", { id: params.id })
  }, [navigate, params.id])

  const deleteTimeline = useCallback(() => {
    navigate("timelines", {
      action: { type: "DELETE_TIMELINE", meta: { id: params.id } },
    })
  }, [navigate, params.id])

  const showDeleteAlert = useCallback(() => {
    Alert.alert(
      "Delete timeline",
      "Do you really want to delete the timeline and all of the events?",
      [
        {
          text: "Cancel",
          onPress: () => undefined,
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteTimeline() },
      ],
      { cancelable: false },
    )
  }, [deleteTimeline])

  useLayoutEffect(() => {
    const headerRightComponent = () => {
      return (
        <MaterialHeaderButtons>
          <Item title="Delete" iconName="delete" onPress={() => showDeleteAlert()} />
          <Item title="Edit" iconName="edit" onPress={() => goToEditTimelineScreen()} />
        </MaterialHeaderButtons>
      )
    }

    setOptions({
      // in your app, extract the arrow function into a separate component
      // to avoid creating a new one every time
      headerRight: () => headerRightComponent(),
    })
  }, [goToEditTimelineScreen, setOptions, showDeleteAlert])

  useFocusEffect(
    useCallback(() => {
      if (!params.action || !timeline) return
      const { action } = params

      const deleteEvent = async (eventId: number) => {
        await timeline.deleteEvent(eventId)
      }

      const editTimeline = async (payload: Timeline) => {
        await timeline.editTimeline(payload, payload.id)
      }

      if (action.type === "DELETE_EVENT") {
        deleteEvent(action.meta.id)
      } else if (action.type === "EDIT_TIMELINE") {
        editTimeline(action.payload)
      }
    }, [params, timeline]),
  )

  // Make sure all data exists before using it
  // if (!timeline) return null

  const openEvent = (eventId: number) => {
    if (!timeline) return

    const event = timeline.getEvent(eventId)

    navigate("event", {
      title: event?.title,
      timelineId: params.id,
      eventId,
    })
  }

  const renderEventList = () => {
    if (!events) return
    const eventList: JSX.Element[] = []
    events.forEach((event) => {
      eventList.push(
        <List.Item
          key={event.id}
          onPress={() => openEvent(event.id)}
          title={event.title}
          description={event.readableStartToEndDateString}
        />,
      )
    })

    return <ScrollView>{eventList}</ScrollView>
  }

  if (!timeline) return <></>
  if (!events) return <></>

  return (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.container, { backgroundColor: background }]}>
        {events.length > 0 ? (
          <>
            <Card>
              <Card.Title title={timeline.title} />
              <Card.Content>
                <Paragraph>{timeline.description} </Paragraph>
                <Paragraph>Number of events: {timeline.events.length} </Paragraph>
              </Card.Content>
            </Card>
            <Headline style={{ marginTop: 16 }}>Events</Headline>
            {renderEventList()}
          </>
        ) : (
          <Card>
            <Card.Title title="No events" subtitle="Start by adding an event" />
          </Card>
        )}
      </View>
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
        onPress={() =>
          navigate("addEvent", {
            timelineId: timeline.id,
          })
        }
      />
    </SafeAreaView>
  )
})
