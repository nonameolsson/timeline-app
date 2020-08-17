import React from "react"
import { observer } from "mobx-react-lite"
import { SafeAreaView } from "react-native"
import { Appbar, Text } from 'react-native-paper'
import { AddTimelineForm } from 'components'
import { useHeaderRight } from 'utils/hooks'

export const AddTimelineScreen = observer(function AddTimelineScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  // const headerRight = () => <Appbar.Action icon="check" onPress={() => undefined} />

  // useHeaderRight(headerRight())

  return (
    <SafeAreaView>
      <AddTimelineForm errorText="" onCreate={() => undefined} />
    </SafeAreaView>
  )
})
