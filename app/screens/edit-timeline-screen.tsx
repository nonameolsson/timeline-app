import { Layout } from '@ui-kitten/components'
import { observer } from "mobx-react-lite"
import { useNavigation, useRoute } from "@react-navigation/native"
import React, { FunctionComponent as Component } from "react"
import { SafeAreaView, StyleSheet } from "react-native"

import { PrimaryRouteProp, PrimaryStackNavigationProp } from "navigation"
import { useStores } from "models"
import { EditTimelineForm, EditTimelineFormData } from 'components/edit-timeline-form/edit-timeline-form'

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
  const { params: { id } } = useRoute<PrimaryRouteProp<"editTimeline">>()

  const { timelineStore } = useStores()
  const timeline = timelineStore.getTimeline(id)

  const onSubmit = async (formData: EditTimelineFormData) => {
    navigation.navigate('timeline', {
      id: timeline.id, // FIXME: This should not be required when going back
      title: timeline.title, // FIXME: This should not be required when going back
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
