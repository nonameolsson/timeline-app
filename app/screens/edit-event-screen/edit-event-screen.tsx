import React from "react"
import { SafeAreaView, ScrollView } from "react-native"
import { useRoute } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { ModalStackRouteProp } from "navigators/modal-stack"

import { EditEventForm } from "components"
import { EditEventFormData } from "components/edit-event-form/edit-event-form.types"
import { useStores } from "models"

import { EditEventScreenProps } from "./edit-event-screen.interfaces"
import { styles } from "./edit-event-screen.styles"
import { EventRequest } from "services/api"
import { convertValuesToTimelineDateString } from "utils/date"

export const EditEventScreen = observer(function EditEventScreen({
  navigation,
}: EditEventScreenProps) {
  const { timelineStore } = useStores()
  const { params } = useRoute<ModalStackRouteProp<"editEvent">>()

  // Make sure all data exists
  const event = timelineStore.getEventFromTimeline(params.timelineId, params.eventId)
  if (!event) return null

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
  }: EditEventFormData) => {
    const formattedStartDate = convertValuesToTimelineDateString(startYear, startMonth, startDate)
    if (!formattedStartDate) throw new Error("Not a valid year")

    const formattedEndDate = convertValuesToTimelineDateString(endYear, endMonth, endDate)

    const eventData: EventRequest = {
      title,
      timeline: params.timelineId,
      description,
      startBC,
      startDate: formattedStartDate,
      endBC,
      endDate: formattedEndDate,
      url,
    }

    await event.updateEvent(eventData, event.id).then(() => navigation.goBack())
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={styles.container}>
        <EditEventForm event={event} onSubmit={(data) => handleSubmit(data)} />
      </ScrollView>
    </SafeAreaView>
  )
})
