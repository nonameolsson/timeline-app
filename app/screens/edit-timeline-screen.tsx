import { observer } from "mobx-react-lite"
import { useNavigation, useRoute } from "@react-navigation/native"
import React, { FunctionComponent as Component } from "react"
import { SafeAreaView, StyleSheet, View } from "react-native"

import { PrimaryRouteProp, PrimaryStackNavigationProp } from "navigation"
import { useStores } from "models"
import { EditTimelineForm, EditTimelineFormData } from 'components/edit-timeline-form/edit-timeline-form'
import { useTheme } from 'react-native-paper'

// TODO: Move to separate file
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 64
  },
  screen: {
    flex: 1,
  },
})

export const EditTimelineScreen: Component = observer(function EditTimelineScreen () {
  const navigation = useNavigation<PrimaryStackNavigationProp<"editTimeline">>()
  const { timelineStore } = useStores()
  const { params } = useRoute<PrimaryRouteProp<"editTimeline">>()

  const {
    colors: { background },
  } = useTheme()

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
    <SafeAreaView style={styles.screen}>
      <View style={[styles.container, { backgroundColor: background }]}>
        <EditTimelineForm timeline={timeline} onSubmit={onSubmit} />
      </View>
    </SafeAreaView>
  )
})
