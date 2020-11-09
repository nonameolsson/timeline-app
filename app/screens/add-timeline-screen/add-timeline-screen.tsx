import React from "react"
import { observer } from "mobx-react-lite"
import { SafeAreaView, View } from "react-native"

import { AddTimelineForm } from "components"
import { useStores } from "models"
import { addTimelineScreenStyles as styles } from "./add-timeline-screen.styles"
import { AddTimelineScreenProps } from "./add-timeline-screen.interfaces"

export const AddTimelineScreen = observer(function AddTimelineScreen({
  navigation,
}: AddTimelineScreenProps) {
  const { userStore, timelineStore } = useStores()

  const handleSubmit = async ({ title, description }) => {
    const user = userStore?.user?.id.toString()
    if (!user) return

    await timelineStore.createTimeline({ user, title, description })
    navigation.goBack()
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <AddTimelineForm errorText="" onSubmit={data => handleSubmit(data)} />
      </View>
    </SafeAreaView>
  )
})
