import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { View } from "react-native"
import { Text } from 'react-native-paper'

export const AddEventScreen: Component = observer(function AddEventScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <View>
      <Text>Add event</Text>
    </View>
  )
})
