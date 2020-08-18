import React from "react"
import { observer } from "mobx-react-lite"
import { SafeAreaView, Alert, View, StyleSheet } from "react-native"

import { AddTimelineForm } from 'components'

// TODO: Move to separate file
const styles = StyleSheet.create({
  container: {
    padding: 16
  },
})

export const AddTimelineScreen = observer(function AddTimelineScreen({ navigation }) {
  const handleSubmit = ({ title, description }) => {
    Alert.alert(title, description)
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <AddTimelineForm errorText="" onSubmit={data => handleSubmit(data)} />
      </View>
    </SafeAreaView>
  )
})
