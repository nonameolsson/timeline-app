import * as React from "react"
import { KeyboardAvoidingView, Platform } from "react-native"
const ROOT = { backgroundColor: "#f0f0f0", flex: 1 }
const behavior = Platform.OS === "ios" ? "padding" : null
export const StoryScreen = (props) => (
  <KeyboardAvoidingView style={ROOT} behavior={behavior} keyboardVerticalOffset={50}>
    {props.children}
  </KeyboardAvoidingView>
)
//# sourceMappingURL=story-screen.js.map
