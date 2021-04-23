import * as React from 'react'
import { KeyboardAvoidingView, Platform, ViewStyle } from 'react-native'

const ROOT: ViewStyle = { backgroundColor: '#f0f0f0', flex: 1 }

export interface StoryScreenProps {
  children?: React.ReactNode
}

const behavior = Platform.OS === 'ios' ? 'padding' : undefined
export const StoryScreen = props => (
  <KeyboardAvoidingView behavior={behavior} keyboardVerticalOffset={50} style={ROOT}>
    {props.children}
  </KeyboardAvoidingView>
)
