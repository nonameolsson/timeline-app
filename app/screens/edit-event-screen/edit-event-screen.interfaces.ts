import { StackNavigationProp } from "@react-navigation/stack"
import { TimelineParamList } from "navigators"

export type EditEventScreenNavigationProp = StackNavigationProp<TimelineParamList, "editEvent">
export type EditEventScreenProps = {
  navigation: EditEventScreenNavigationProp
}
