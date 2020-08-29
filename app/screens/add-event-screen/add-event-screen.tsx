import React from "react"
import { observer } from "mobx-react-lite"
import { View, SafeAreaView } from "react-native"
import { useRoute } from '@react-navigation/native'

import { AddEventForm } from 'components'
import { useStores } from 'models'
import { addEventScreenStyles as styles } from './add-event-screen.styles'
import { AddEventScreenProps } from "./add-event-screen.interfaces"
import { ModalStackRouteProp } from 'navigation/modal-stack'

export const AddEventScreen = observer(function AddEventScreen({ navigation }: AddEventScreenProps) {
  const { userStore, timelineStore } = useStores()
  const { params } = useRoute<ModalStackRouteProp<"addEvent">>()

  // Make sure all data exists
  const timeline = timelineStore.getTimeline(params.timelineId)

  if (!timeline) return null

  const handleSubmit = async ({ title, description, url }) => {
    const user = userStore?.user?.id.toString()
    if (!user) return

    await timeline.createEvent({ timelineId: params.timelineId, title, description, url })
    navigation.goBack()
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <AddEventForm errorText="" onSubmit={data => handleSubmit(data)} />
      </View>
    </SafeAreaView>
  )
})
