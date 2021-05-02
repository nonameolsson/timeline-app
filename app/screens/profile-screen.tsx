import React, { FunctionComponent as Component } from "react"
import { SafeAreaView, View, StyleSheet, ViewStyle } from "react-native"
import { Avatar, TextInput } from "react-native-paper"

import { useStores } from "models"

export const styles = StyleSheet.create({
  avatar: {
    alignSelf: "center",
    marginTop: 32,
    marginBottom: 32,
  } as ViewStyle,
  container: {
    flex: 1,
  } as ViewStyle,
  screen: {
    flex: 1,
    margin: 16,
  } as ViewStyle,
  textInput: {
    marginBottom: 16,
  },
})

export const ProfileScreen: Component = function ProfileScreen() {
  const { userStore } = useStores()

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Avatar.Icon style={styles.avatar} size={96} icon="emoticon-poop" />

        <TextInput
          style={styles.textInput}
          mode="outlined"
          label="Username"
          disabled={true}
          value={userStore.user.username}
        />
        <TextInput
          mode="outlined"
          disabled={true}
          label="E-mail"
          style={styles.textInput}
          value={userStore.user.email}
        />
      </View>
    </SafeAreaView>
  )
}
