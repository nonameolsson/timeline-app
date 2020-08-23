import { Alert, SafeAreaView, View } from "react-native"
import { Text, useTheme } from "react-native-paper"
import { observer } from 'mobx-react-lite'
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native"
import React, { FunctionComponent as Component, useCallback } from "react"

import { useStores } from "models"
import { TimelineStackNavigationProp, TimelineRouteProp } from "navigation"
import { styles } from './event-screen.styles'
import { MaterialHeaderButtons, Item } from 'components'

export const EventScreen: Component = observer(function EventScreen() {
  const { timelineStore } = useStores()
  const navigation = useNavigation<TimelineStackNavigationProp<"event">>()
  const { params } = useRoute<TimelineRouteProp<"event">>()

  const {
    colors: { background },
  } = useTheme()

  const event = timelineStore.getEventFromTimeline(params.timelineId, params.eventId)

  useFocusEffect(
    useCallback(() => {
      if (!params.action || !event) return

      if (params.action.type === 'EDIT_EVENT') {
        event.updateEvent(params.action.payload)
      }
    }, [event, params.action])
  )

  const deleteEvent = useCallback(() => {
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
  }, [navigation, params.eventId, params.timelineId, timelineStore])

  const showDeleteAlert = useCallback(function showDeleteAlert() {
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
  }, [deleteEvent])

  React.useLayoutEffect(function HeaderButtons () {
    if (event) {
      navigation.setOptions({
      // in your app, extract the arrow function into a separate component
      // to avoid creating a new one every time
        headerRight: () => (
          <MaterialHeaderButtons>
            <Item title="Delete" iconName="delete" onPress={showDeleteAlert} />
            <Item title="Edit" iconName="edit" onPress={() => navigation.navigate("editEvent", { eventId: event.id, timelineId: params.timelineId })} />
          </MaterialHeaderButtons>
        ),
      })
    }
  }, [event, event?.id, navigation, params.timelineId, showDeleteAlert])

  if (!event) return null

  return (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.container, { backgroundColor: background }]}>
        <Text>{event.title}</Text>
        <Text>{event.description}</Text>
      </View>
    </SafeAreaView>
  )
})
