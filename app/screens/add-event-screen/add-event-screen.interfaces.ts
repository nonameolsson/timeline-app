import { StackNavigationProp } from '@react-navigation/stack'
import { TimelineParamList } from 'navigators'

export type AddEventScreenNavigationProp = StackNavigationProp<TimelineParamList, 'addEvent'>
export type AddEventScreenProps = {
  navigation: AddEventScreenNavigationProp
}
