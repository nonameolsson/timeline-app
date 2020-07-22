import React, { FunctionComponent as Component, useState } from "react"
import { observer } from "mobx-react-lite"
import { useNavigation, useRoute } from "@react-navigation/native"

import { EditEventForm } from "components"
import { PrimaryStackNavigationProp, PrimaryRouteProp } from "navigation"
import { StyleSheet, SafeAreaView, ActivityIndicator } from "react-native"
import { Layout } from "@ui-kitten/components"
import { useStores } from "models"

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  layout: {
    flex: 1,
    padding: 16
  }
})

export const EditEventScreen: Component = observer(function EditEventScreen() {
  const [isLoading, setIsLoading] = useState(false)

  const navigation = useNavigation<PrimaryStackNavigationProp<"editEvent">>()
  const { params: { eventId, timelineId } } = useRoute<PrimaryRouteProp<"editEvent">>()

  const { timelineStore } = useStores()

  const timeline = timelineStore.getTimeline(timelineId)
  const event = timeline.getEvent(eventId)

  const onSubmit = async (data: { id: string, title: string, description: string }) => {
  // const onSubmit = async (data: EditTimelineFormData) => {
    setIsLoading(true)
    await event.updateEvent(data)
    setIsLoading(false)
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.layout}>
        {isLoading
          ? <ActivityIndicator style={styles.activityIndicator} />
          : <EditEventForm event={event} onSubmit={onSubmit} />
        }
      </Layout>
    </SafeAreaView>
  )
})
