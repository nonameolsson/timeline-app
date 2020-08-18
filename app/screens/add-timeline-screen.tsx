import React from "react"
import { observer } from "mobx-react-lite"
import { SafeAreaView, View, StyleSheet } from "react-native"

import { AddTimelineForm } from 'components'
import { useStores } from 'models'

// TODO: Move to separate file
const styles = StyleSheet.create({
  container: {
    padding: 16
  },
})

export const AddTimelineScreen = observer(function AddTimelineScreen({ navigation }) {
  const { timelineStore } = useStores()

  const handleSubmit = async ({ title, description }) => {
    await timelineStore.createTimeline({ title, description })
    navigation.goBack()
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <AddTimelineForm errorText="" onSubmit={data => handleSubmit(data)} />
      </View>
    </SafeAreaView>
  )
})
