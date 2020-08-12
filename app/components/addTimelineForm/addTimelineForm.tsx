import React, { FunctionComponent as Component } from "react"
import { View } from "react-native"
import { Button, Text } from "react-native-paper"
import { useObserver } from 'mobx-react-lite'

import { addTimelineFormStyles as styles } from "./addTimelineForm.styles"

export interface AddTimelineFormProps {
  onClose?: any
}

/**
 * This is a React functional component, ready to
 *
 * Component description here for TypeScript tips.
 */
export const AddTimelineForm: Component<AddTimelineFormProps> = props => {
  // Note: if you want your componeobservernt to refresh when data is updated in the store,
  // wrap this component in `` like so:
  // `export const AddTimelineForm = observer(function AddTimelineForm { ... })`

  // Enable this line to retrieve data from the rootStore (or other store)
  // const rootStore = useStores()
  // or
  // const { otherStore, userStore } = useStores()

  return useObserver(() => (
    <View>
      <Text>Hi Func</Text>
      <Button onPress={props.onClose}>Clfose</Button>
    </View>
  ))
}
