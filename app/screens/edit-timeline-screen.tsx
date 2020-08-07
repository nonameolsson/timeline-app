import { Layout } from '@ui-kitten/components'
import { observer } from "mobx-react-lite"
import { useNavigation, useRoute } from "@react-navigation/native"
import React, { FunctionComponent as Component } from "react"
import { SafeAreaView, StyleSheet } from "react-native"

import { PrimaryRouteProp, PrimaryStackNavigationProp } from "navigation"
import { useStores, Timeline } from "models"
import { EditTimelineForm, EditTimelineFormData } from 'components/edit-timeline-form/edit-timeline-form'

// TODO: Move to separate file
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

export const EditTimelineScreen: Component = observer(function EditTimelineScreen () {
  const navigation = useNavigation<PrimaryStackNavigationProp<"editTimeline">>()
  const { timelineStore } = useStores()
  const { params } = useRoute<PrimaryRouteProp<"editTimeline">>()

  // Make sure all data exists
  const timeline = timelineStore.getTimeline(params.id)
  if (!timeline) return null

  const onSubmit = async (formData: EditTimelineFormData) => {
    navigation.navigate('timeline', {
      id: timeline.id,
      title: formData.title,
      action: {
        type: 'EDIT_TIMELINE',
        payload: {
          id: timeline.id,
          title: formData.title,
          description: formData.description,
        }
      }
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.layout}>
        <EditTimelineForm timeline={timeline} onSubmit={onSubmit} />
      </Layout>
    </SafeAreaView>
  )
})
