import React from "react"
import { SafeAreaView, View } from "react-native"
import { useRoute } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { ModalStackRouteProp } from "navigators/modal-stack"

import { AddEventForm } from "components"
import { AddEventFormData } from "components/add-event-form/add-event-form.types"
import { useStores } from "models"

import { AddEventScreenProps } from "./add-event-screen.interfaces"
import { addEventScreenStyles as styles } from "./add-event-screen.styles"
import { EventRequest } from "services/api"
import { convertValuesToTimelineDateString } from "utils/date"

export const AddEventScreen = observer(function AddEventScreen({
  navigation,
}: AddEventScreenProps) {
  const { timelineStore } = useStores()
  const { params } = useRoute<ModalStackRouteProp<"addEvent">>()

  // Make sure all data exists
  const timeline = timelineStore.getTimeline(params.timelineId)

  if (!timeline) return null

  const handleSubmit = async ({
    description,
    endBC,
    endDate,
    endMonth,
    endYear,
    startBC,
    startDate,
    startMonth,
    startYear,
    title,
    url,
  }: AddEventFormData) => {
    const formattedStartDate = convertValuesToTimelineDateString(startYear, startMonth, startDate)
    if (!formattedStartDate) throw new Error("Not a valid year")

    const formattedEndDate = convertValuesToTimelineDateString(endYear, endMonth, endDate)

    const eventToCreate: EventRequest = {
      title,
      timeline: params.timelineId,
      description,
      startBC,
      startDate: formattedStartDate,
      endBC: !formattedEndDate ? null : endBC,
      endDate: formattedEndDate,
      url,
    }

    await timeline.createEvent(eventToCreate).then(() => {
      navigation.goBack()
    })
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <AddEventForm onSubmit={(data) => handleSubmit(data)} />
      </View>
    </SafeAreaView>
  )
})
