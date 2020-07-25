import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { useNavigation, useRoute } from "@react-navigation/native"
import { StyleSheet, SafeAreaView } from "react-native"
import { Layout } from "@ui-kitten/components"

import { EditEventForm, EditEventeFormData as EditEventFormData } from "components"
import { PrimaryStackNavigationProp, PrimaryRouteProp } from "navigation"
import { useStores } from "models"

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layout: {
    flex: 1,
    padding: 16
  }
})

export const EditEventScreen: Component = observer(function EditEventScreen() {
  const navigation = useNavigation<PrimaryStackNavigationProp<"editEvent">>()
  const { params: { eventId, timelineId } } = useRoute<PrimaryRouteProp<"editEvent">>()

  const { timelineStore } = useStores()

  const timeline = timelineStore.getTimeline(timelineId)
  const event = timeline.getEvent(eventId)

  const onSubmit = async ({ title, description }: EditEventFormData) => {
    navigation.navigate('event', {
      eventId: event.id, // FIXME: This should not be required when going back
      timelineId: timelineId, // FIXME: This should not be required when going back
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
    <SafeAreaView style={styles.container}>
      <Layout style={styles.layout}>
        <EditEventForm event={event} onSubmit={onSubmit} />

      </Layout>
    </SafeAreaView>
  )
})
