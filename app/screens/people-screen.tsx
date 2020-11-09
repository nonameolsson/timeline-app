import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { Subheading, Headline, useTheme } from "react-native-paper"

import { StyleSheet, View } from "react-native"

const styles = StyleSheet.create({
  alignCenter: {
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 64,
  },
  screen: {
    flex: 1,
  },
})
export const PeopleScreen: Component = observer(function PeopleScreen() {
  const {
    colors: { background },
  } = useTheme()

  return (
    <View style={styles.screen}>
      <View style={[styles.container, { backgroundColor: background }]}>
        <Headline style={{ textAlign: "center", fontSize: 32 }}>People</Headline>
        <Subheading style={{ textAlign: "center" }}>To be developed...</Subheading>
      </View>
    </View>
  )
})
