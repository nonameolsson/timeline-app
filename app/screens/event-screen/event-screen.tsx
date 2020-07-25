import React, { FunctionComponent as Component, useLayoutEffect, useRef, useEffect } from "react"
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native"
import { Button, Layout, Text } from '@ui-kitten/components'

import { useStores } from "models"
import { PrimaryStackNavigationProp, PrimaryRouteProp } from "navigation"
import { styles } from './event-screen-styles'
import { Button as HeaderButton, Alert } from "react-native"
import { autorun } from "mobx"
import { useObserver } from 'mobx-react-lite'

// FIXME: Move to helper utility in navigation
const useTitle = (timelineId, eventId) => {
  if (timelineId && eventId) {
    const { timelineStore } = useStores()
    const titleRef = useRef('')
    const navigation = useNavigation()

    useEffect(() => {
      const dispose = autorun(() => {
        const timeline = timelineStore.getTimeline(timelineId)
        const event = timeline.getEvent(eventId)

        if (event) titleRef.current = event.title
      })

      return dispose
    }, [eventId])
    useFocusEffect(() => { navigation.setOptions({ title: titleRef.current }) })
  }
}

export const EventScreen: Component = () => {
  return useObserver(() => {
  // Pull in one of our MST stores
    const { timelineStore } = useStores()

    // Pull in navigation via hook
    const navigation = useNavigation<PrimaryStackNavigationProp<"event">>()
    const { params } = useRoute<PrimaryRouteProp<"event">>()

    // Get current timeline and event
    const timeline = timelineStore.getTimeline(params.timelineId)
    const event = timeline.getEvent(params.eventId)

    if (timeline && event) useTitle(timeline.id, params.eventId)

    React.useEffect(() => {
      if (params.action) {
        switch (params.action.type) {
          case 'EDIT_EVENT':
            event.updateEvent(params.action.payload)
            break

          default:
            break
        }
      }
    }, [params.action])

    React.useEffect(() => {
      if (!event) navigation.goBack()
    }, [event])

    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <HeaderButton title="Edit" onPress={() => navigation.navigate("editEvent", { eventId: event.id, timelineId: timeline.id })} />
        ),
      })
    }, [navigation])

    const deleteEvent = () => {
      navigation.navigate('timeline', {
        id: timeline.id, // FIXME: Shouldn't be required to pass in timelineId
        title: event.title,
        action: {
          type: 'DELETE_EVENT',
          meta: {
            id: event.id
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

    return (
      <Layout style={styles.container}>
        <Text>{event.title}</Text>
        <Text>{event.description}</Text>
        <Button onPress={showDeleteAlert}>Delete</Button>
      </Layout>
    )
  })
}
