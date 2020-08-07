import React, { FunctionComponent as Component, useLayoutEffect, useRef, useEffect, useCallback } from "react"
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native"
import { Button, Layout, Text } from '@ui-kitten/components'

import { useStores } from "models"
import { PrimaryStackNavigationProp, PrimaryRouteProp } from "navigation"
import { styles } from './event-screen-styles'
import { Button as HeaderButton, Alert } from "react-native"
import { autorun } from "mobx"
import { observer } from 'mobx-react-lite'

// FIXME: Move to helper utility in navigation
const useTitle = (timelineId: string, eventId: string) => {
  const { timelineStore } = useStores()
  const titleRef = useRef('')
  const navigation = useNavigation()

  useEffect(() => {
    const dispose = autorun(() => {
      const timeline = timelineStore.getTimeline(timelineId)

      // If something happens in MST and the timeline has been removed, navigate back to avoid a crash.
      // FIXME: This doesn't feel as the correct way to avoid a crash.
      if (!timeline) {
        navigation.goBack()
        return
      }

      const event = timeline.getEvent(eventId)

      if (event) titleRef.current = event.title
    })

    return dispose
  }, [eventId, navigation, timelineId, timelineStore])
  useFocusEffect(() => { navigation.setOptions({ title: titleRef.current }) })
}

const useHeaderRight = (timelineId: string, eventId: string) => {
  const { timelineStore } = useStores()
  const navigation = useNavigation()
  const event = timelineStore.getEventFromTimeline(timelineId, eventId)

  useLayoutEffect(() => {
    if (!event) return
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton title="Edit" onPress={() => navigation.navigate("editEvent", { eventId: event.id, timelineId })} />
      ),
    })
  }, [event, navigation, timelineId])
}

export const EventScreen: Component = observer(function EventScreen() {
  const { timelineStore } = useStores()
  const navigation = useNavigation<PrimaryStackNavigationProp<"event">>()
  const { params } = useRoute<PrimaryRouteProp<"event">>()

  const event = timelineStore.getEventFromTimeline(params.timelineId, params.eventId)

  // TODO: Migrate to separate utility function
  useTitle(params.timelineId, params.eventId)

  // TODO: Migrate to separate utility function
  useHeaderRight(params.timelineId, params.eventId)

  useFocusEffect(
    useCallback(() => {
      if (!params.action || !event) return

      if (params.action.type === 'EDIT_EVENT') {
        event.updateEvent(params.action.payload)
      }
    }, [event, params.action])
  )

  const deleteEvent = () => {
    const currentEvent = timelineStore.getEventFromTimeline(params.timelineId, params.eventId)
    if (!currentEvent) return

    navigation.navigate('timeline', {
      id: params.timelineId,
      title: currentEvent.title,
      action: {
        type: 'DELETE_EVENT',
        meta: {
          id: currentEvent.id
        }
      }
    })
  }

  const showDeleteAlert = () => {
    Alert.alert(
      "Delete event",
      "Do you really want to delete it?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => deleteEvent() }
      ],
      { cancelable: false }
    )
  }

  // Make sure all data exists before using it
  if (!event) return null

  return (
    <Layout style={styles.container}>
      <Text>{event.title}</Text>
      <Text>{event.description}</Text>
      <Button onPress={showDeleteAlert}>Delete</Button>
    </Layout>
  )
})
