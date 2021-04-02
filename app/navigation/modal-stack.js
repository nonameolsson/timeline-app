import React from "react"
import { Platform } from "react-native"
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"
import { AddEventScreen } from "screens"
import { AddTimelineScreen } from "screens/add-timeline-screen/add-timeline-screen"
import { DrawerNavigator } from "./drawer-navigator"
const ModalStack = createStackNavigator()
const transition = () =>
  Platform.OS === "ios" ? TransitionPresets.ModalPresentationIOS : undefined
export const ModalStackScreen = () => (
  <ModalStack.Navigator
    initialRouteName="main"
    mode="modal"
    screenOptions={() => {
      return {
        headerShown: false,
        gestureEnabled: Platform.OS === "ios",
        cardOverlayEnabled: true,
        ...transition(),
      }
    }}
  >
    <ModalStack.Screen name="main" component={DrawerNavigator} />
    <ModalStack.Screen
      name="addTimeline"
      options={() => {
        return {
          headerShown: true,
          title: "New Timeline",
        }
      }}
      component={AddTimelineScreen}
    />
    <ModalStack.Screen
      name="addEvent"
      options={() => {
        return {
          headerShown: true,
          title: "New Event",
        }
      }}
      component={AddEventScreen}
    />
  </ModalStack.Navigator>
)
//# sourceMappingURL=modal-stack.js.map
