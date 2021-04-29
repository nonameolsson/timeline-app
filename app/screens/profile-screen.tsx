import React, { FunctionComponent as Component } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { Button, Headline } from "react-native-paper";
import { observer } from "mobx-react-lite";

import { StyleSheet, ViewStyle } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  } as ViewStyle,
  emptyStateButtonWrapper: {
    flex: 1,
    width: 256,
    alignSelf: "center",
  } as ViewStyle,
  emptyStateWrapper: {
    flex: 1,
  } as ViewStyle,
  screen: {
    flex: 1,
  } as ViewStyle,
});

export const ProfileScreen: Component = observer(function ProfileScreen(props) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Headline>Your profile</Headline>
        <Button onPress={() => props.navigation.navigate("app")}>Back</Button>
      </View>
    </SafeAreaView>
  );
});
