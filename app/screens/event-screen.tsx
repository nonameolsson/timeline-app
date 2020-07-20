import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Button } from "react-native"
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native"
import { Screen, Text } from "components"
import { useStores } from "models"
import { color } from "theme"
import { PrimaryParamList } from "navigation"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black
}

type EventScreenRouteProp = RouteProp<PrimaryParamList, 'event'>;

export const EventScreen: Component = observer(function EventScreen() {
  // Pull in one of our MST stores
  const { timelineStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const { params: { eventId, timelineId } } = useRoute<EventScreenRouteProp>()

  const event = timelineStore.getEventFromTimeline(timelineId, eventId)

  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text={event.title} />
      <Text text={event.description} />
      <Button title="Back" onPress={() => navigation.goBack()} />
    </Screen>
  )
})
