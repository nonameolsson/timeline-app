import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { Subheading, Headline, useTheme } from 'react-native-paper'
import { View, StyleSheet } from 'react-native'

import { LoginForm } from "../../components"
import { useStores } from "../../models"
import { translate } from "../../i18n"

/** Styles */
// import { styles } from "./login-screen.styles"

const styles = StyleSheet.create({
  alignCenter: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 64
  },
  screen: {
    flex: 1,
  },
})

export const LoginScreen: Component = observer(function LoginScreen() {
  const { userStore } = useStores()
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const {
    colors: { background },
  } = useTheme()

  const onLogin = async (identifier: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const error = await userStore.login(identifier, password)

      setError(translate(`login.errors.${error?.kind}`))
      setIsLoading(false)
    } catch (err) {
      console.tron.error('login error', err)
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.screen}>
      <View style={[styles.container, { backgroundColor: background }]}>
        <Headline style={{ textAlign: 'center', fontSize: 32 }}>Hello</Headline>
        <Subheading style={{ textAlign: 'center' }}>Sign in to your account</Subheading>

        <LoginForm handleLogin={onLogin} loading={isLoading} errorText={error} />
      </View>
    </View>
  )
})
