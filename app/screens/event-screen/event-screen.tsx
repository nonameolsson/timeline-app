import React, { FunctionComponent as Component, useLayoutEffect, useRef, useEffect } from "react"
import { useObserver } from "mobx-react-lite"
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native"
import { Button, Layout, Text } from '@ui-kitten/components'

import { useStores } from "models"
import { PrimaryStackNavigationProp, PrimaryRouteProp } from "navigation"
import { styles } from './event-screen-styles'
import { Button as HeaderButton, Alert } from "react-native"
import { autorun } from "mobx"

const useTitle = (timelineId, eventId) => {
  const { timelineStore } = useStores()
  const titleRef = useRef('')
  const navigation = useNavigation()

  useEffect(() => {
    const dispose = autorun(() => {
      const timeline = timelineStore.getTimeline(timelineId)
      const event = timeline.getEvent(eventId)
      titleRef.current = event.title
    })
    return dispose
  }, [eventId])
  useFocusEffect(() => { navigation.setOptions({ title: titleRef.current }) })
}

export const EventScreen: Component = () => {
  // Pull in one of our MST stores
  const { timelineStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation<PrimaryStackNavigationProp<"event">>()
  const { params: { eventId, timelineId, onDelete } } = useRoute<PrimaryRouteProp<"event">>()

  // Get current timeline and event
  const timeline = timelineStore.getTimeline(timelineId)
  const event = timeline.getEvent(eventId)

  useTitle(timeline.id, eventId)

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // Do something when the screen is focused

  //     // Get the latest data from the store. This is neccessary to get the latest title after editing the timeline in EditTimelineScreen.
  //     event = timeline.getEvent(eventId)
  //     navigation.setOptions({ title: event.title })

  //     return () => {
  //       // Do something when the screen is unfocused
  //       // Useful for cleanup functions
  //     }
  //   }, [])
  // )

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton title="Edit" onPress={() => navigation.navigate("editEvent", { eventId: event.id, timelineId: timeline.id })} />
      ),
    })
  }, [navigation])

  const deleteEvent = async () => {
    navigation.navigate('timeline')
    onDelete(event.id)
    // await timeline.deleteEvent(event.id)
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

  return useObserver(() => ((
    <Layout style={styles.container}>
      <Text>{event.title}</Text>
      <Text>{event.description}</Text>
      <Button onPress={showDeleteAlert}>Delete</Button>
    </Layout>
  ))
  )
}
