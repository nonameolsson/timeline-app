import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { useNavigation, useRoute } from "@react-navigation/native"
import { StyleSheet, SafeAreaView } from "react-native"
import { Layout } from "@ui-kitten/components"

import { EditEventForm, EditEventFormData } from "components"
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
  const { timelineStore } = useStores()
  const { params } = useRoute<PrimaryRouteProp<"editEvent">>()

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
    <SafeAreaView style={styles.container}>
      <Layout style={styles.layout}>
        <EditEventForm event={event} onSubmit={onSubmit} />
      </Layout>
    </SafeAreaView>
  )
})
