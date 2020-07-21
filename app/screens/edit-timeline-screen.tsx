import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextInput, Button } from "react-native"
import { Screen, Text } from "components"
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native"
import { useStores } from "models"
import { color } from "theme"
import { PrimaryParamList } from "navigation"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.angry,
}

type TimelineScreenRouteProp = RouteProp<PrimaryParamList, 'editTimeline'>;

export const EditTimelineScreen: Component = observer(function EditTimelineScreen() {
  // Pull in one of our MST stores
  const { timelineStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const { params: { timeline } } = useRoute<TimelineScreenRouteProp>()

  const save = () => {
    timelineStore.updateTimeline({ ...timeline, description: 'herp derp' })
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" tx="editEventScreen.header" />
      <TextInput value={timeline.title} />
      <TextInput value={timeline.description} />
      <Button title="Save" onPress={() => save()} />
      <Button title="Back" onPress={() => navigation.goBack()} />
    </Screen>
  )
})
