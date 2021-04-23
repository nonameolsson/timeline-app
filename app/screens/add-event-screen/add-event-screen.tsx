import React from 'react'
import { SafeAreaView, View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import { ModalStackRouteProp } from 'navigators/modal-stack'

import { EventForm } from 'components'
import { EventFormData } from 'components/event-form/event-form.types'
import { useStores } from 'models'

import { AddEventScreenProps } from './add-event-screen.interfaces'
import { addEventScreenStyles as styles } from './add-event-screen.styles'

export const AddEventScreen = observer(function AddEventScreen({ navigation }: AddEventScreenProps) {
  const { userStore, timelineStore } = useStores()
  const { params } = useRoute<ModalStackRouteProp<'addEvent'>>()

  // Make sure all data exists
  const timeline = timelineStore.getTimeline(params.timelineId)

  if (!timeline) return null

  const handleSubmit = async ({ title, description, url, startDate, endDate }: EventFormData) => {
    const user = userStore?.user?.id.toString()
    if (!user) return

    await timeline.createEvent({
      timeline: params.timelineId,
      title,
      description,
      url,
      startDate,
      endDate,
    })
    navigation.goBack()
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <EventForm onSubmit={data => handleSubmit(data)} />
      </View>
    </SafeAreaView>
  )
})
