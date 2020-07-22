import React, { FunctionComponent as Component, useLayoutEffect } from "react"
import { observer } from "mobx-react-lite"
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native"
import { Layout, Text } from '@ui-kitten/components'

import { useStores } from "models"
import { PrimaryStackNavigationProp, PrimaryRouteProp } from "navigation"
import { styles } from './event-screen-styles'
import { Button } from "react-native"

export const EventScreen: Component = observer(function EventScreen() {
  // Pull in one of our MST stores
  const { timelineStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation<PrimaryStackNavigationProp<"event">>()
  const { params: { eventId, timelineId } } = useRoute<PrimaryRouteProp<"event">>()

  // Get current timeline and event
  const timeline = timelineStore.getTimeline(timelineId)
  let event = timeline.getEvent(eventId)

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused

      // Get the latest data from the store. This is neccessary to get the latest title after editing the timeline in EditTimelineScreen.
      event = timeline.getEvent(eventId)
      navigation.setOptions({ title: event.title })

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      }
    }, [])
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Edit" onPress={() => navigation.navigate("editEvent", { eventId: event.id, timelineId: timeline.id })} />
      ),
    })
  }, [navigation])

  return (
    <Layout style={styles.container}>
      <Text>{event.title}</Text>
      <Text>{event.description}</Text>
    </Layout>
  )
})
