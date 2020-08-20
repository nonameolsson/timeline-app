import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { useNavigation, useRoute } from "@react-navigation/native"
import { SafeAreaView, View } from "react-native"
import { useTheme } from 'react-native-paper'

import { EditEventForm, EditEventFormData } from "components"
import { TimelineStackNavigationProp, TimelineRouteProp } from "navigation"
import { useStores } from "models"
import { editEventScreenStyles as styles } from './add-event-screen.styles'

export const EditEventScreen: Component = observer(function EditEventScreen() {
  const navigation = useNavigation<TimelineStackNavigationProp<"editEvent">>() // NOTE: Should this be a props instead?
  const { timelineStore } = useStores()
  const { params } = useRoute<TimelineRouteProp<"editEvent">>()

  const {
    colors: { background },
  } = useTheme()

  // Make sure all data exists
  const event = timelineStore.getEventFromTimeline(params.timelineId, params.eventId)
  if (!event) return null

  const onSubmit = async ({ title, description }: EditEventFormData) => {
    navigation.navigate('event', {
      eventId: params.eventId,
      timelineId: params.timelineId,
      title,
      action: {
        type: 'EDIT_EVENT',
        payload: {
          id: event.id,
          title,
          description
        }
      }
    })
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.container, { backgroundColor: background }]}>
        <EditEventForm event={event} onSubmit={onSubmit} />
      </View>
    </SafeAreaView>
  )
})
