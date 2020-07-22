import React, { FunctionComponent as Component } from "react"
import { Layout, Text } from "@ui-kitten/components"
import { observer } from "mobx-react-lite"

import { LoginForm } from "../../components"
import { useStores } from "../../models"
import { translate } from "../../i18n"

/** Styles */
import { styles } from "./login-screen.styles"

export const LoginScreen: Component = observer(function LoginScreen() {
  const { userStore } = useStores()
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

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
    <>
      <Layout style={styles.container}>
        <Text category="h1" style={styles.titleText}>
          Hello
        </Text>

        <Text style={styles.subtitleText}>Sign in to your account</Text>

        <LoginForm handleLogin={onLogin} loading={isLoading} error={error} />
      </Layout>
    </>
  )
})
