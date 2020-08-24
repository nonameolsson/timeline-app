import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { Subheading, Headline, useTheme } from 'react-native-paper'
import { View } from 'react-native'

import { LoginForm } from "components"
import { useStores } from "models"
import { translate } from "i18n"
import { loginScreenStyles as styles } from "./login-screen.styles"

export const LoginScreen: Component = observer(function LoginScreen(props) {
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
      const response = await userStore.login(identifier, password)

      setError(translate(`login.errors.${response?.kind}`))
      setIsLoading(false)
    } catch (err) {
      console.tron.error('login error', err)
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.screen}>
      <View style={[styles.container, { backgroundColor: background }]}>
        <Headline style={styles.headline}>Hello</Headline>
        <Subheading style={styles.subheading}>Sign in to your account</Subheading>

        <LoginForm handleLogin={onLogin} loading={isLoading} errorText={error} />
      </View>
    </View>
  )
})
