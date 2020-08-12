import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { View } from "react-native"

export const ProfileScreen: Component = observer(function ProfileScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <View>

    </View>
  )
})
