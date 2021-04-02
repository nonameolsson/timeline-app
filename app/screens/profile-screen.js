import React from "react"
import { observer } from "mobx-react-lite"
import { View } from "react-native"
import { Button, Headline } from "react-native-paper"
export const ProfileScreen = observer(function ProfileScreen(props) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <View style={{ flex: 1 }}>
      <Headline>Hey</Headline>
      <Button onPress={() => props.navigation.navigate("app")}>Back</Button>
    </View>
  )
})
//# sourceMappingURL=profile-screen.js.map
