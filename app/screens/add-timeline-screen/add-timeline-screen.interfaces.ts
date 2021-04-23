import { StackNavigationProp } from '@react-navigation/stack'
import { TimelineParamList } from 'navigators'

export type AddTimelineScreenNavigationProp = StackNavigationProp<TimelineParamList, 'addTimeline'>
export type AddTimelineScreenProps = {
  navigation: AddTimelineScreenNavigationProp
}
