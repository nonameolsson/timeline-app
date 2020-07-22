import { Layout } from '@ui-kitten/components'
import { observer } from "mobx-react-lite"
import { useNavigation, useRoute } from "@react-navigation/native"
import React, { FunctionComponent as Component, useState } from "react"
import { ActivityIndicator, SafeAreaView, StyleSheet } from "react-native"

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

export const EditTimelineScreen: Component = observer(() => {
  const [isLoading, setIsLoading] = useState(false)

  const navigation = useNavigation<PrimaryStackNavigationProp<"editTimeline">>()
  const { params: { id } } = useRoute<PrimaryRouteProp<"editTimeline">>()

  const { timelineStore } = useStores()
  const timeline = timelineStore.getTimeline(id)

  const onSubmit = async (data: EditTimelineFormData) => {
    setIsLoading(true)
    await timeline.updateTimeline({ ...data, id })
    setIsLoading(false)
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.layout}>
        {isLoading
          ? <ActivityIndicator style={styles.activityIndicator} />
          : <EditTimelineForm timeline={timeline} onSubmit={onSubmit} />
        }
      </Layout>
    </SafeAreaView>
  )
})
