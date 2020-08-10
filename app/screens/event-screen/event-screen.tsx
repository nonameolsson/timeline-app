import { Alert, SafeAreaView, View } from "react-native"
import { Text, Button, useTheme, Appbar } from "react-native-paper"
import { observer } from 'mobx-react-lite'
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native"
import React, { FunctionComponent as Component, useCallback } from "react"

import { useStores } from "models"
import { PrimaryStackNavigationProp, PrimaryRouteProp } from "navigation"
import { styles } from './event-screen-styles'
import { useHeaderRight } from 'utils/hooks'

export const EventScreen: Component = observer(function EventScreen() {
  const { timelineStore } = useStores()
  const navigation = useNavigation<PrimaryStackNavigationProp<"event">>()
  const { params } = useRoute<PrimaryRouteProp<"event">>()

  const {
    colors: { background },
  } = useTheme()

  const event = timelineStore.getEventFromTimeline(params.timelineId, params.eventId)

  const headerRight = () => {
    if (!event) return undefined

    return <Appbar.Action icon="pencil" onPress={() => navigation.navigate("editEvent", { eventId: event.id, timelineId: params.timelineId })} />
  }

  useHeaderRight(headerRight())

  useFocusEffect(
    useCallback(() => {
      if (!params.action || !event) return

      if (params.action.type === 'EDIT_EVENT') {
        event.updateEvent(params.action.payload)
      }
    }, [event, params.action])
  )

  // Make sure all data exists before using it
  if (!event) return null

  const deleteEvent = () => {
    const currentEvent = timelineStore.getEventFromTimeline(params.timelineId, params.eventId)
    if (!currentEvent) return

    navigation.navigate('timeline', {
      id: params.timelineId,
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

  return (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.container, { backgroundColor: background }]}>
        <Text>{event.title}</Text>
        <Text>{event.description}</Text>
        <Button mode="contained" onPress={showDeleteAlert}>Delete</Button>
      </View>
    </SafeAreaView>
  )
})
