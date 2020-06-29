import React, { FunctionComponent as Component } from "react"
import { useMutation } from "@apollo/react-hooks"
import { Button, Layout, Text } from "@ui-kitten/components"
import * as storage from "utils/storage"

import { LoginForm } from "../../components"

/** Styles */
import { styles } from "./login-screen.styles"

/** Utilities */
import { LOGIN } from "queries"

// export const LoginScreen: NavigationStackScreenComponent<null, null> = () => {
export const LoginScreen: Component = () => {
  const [login, { loading, error, data }] = useMutation(LOGIN)
  const [jwt, setJwt] = React.useState(undefined)

  const onLogin = async (identifier: string, password: string) => {
    try {
      const res = await login({ variables: { user: { identifier, password } } })
      // save("jwt", res.data.login.jwt)
      console.tron.log("logging in")
      console.tron.log(res)
    } catch (err) {
      // TOOD: Handle error
      // If the error message contains email or password we'll assume that's the error.
      // if (/email/i.test(e.message)) {
      //   this.setState({ emailError: true });
      // }
      // if (/password/i.test(e.message)) {
      //   this.setState({ passwordError: true });
      // }
      console.tron.log("cath err")
      console.tron.log(err)
    }
  }

  const save = () => storage.saveString('jwt', 'jfasdkl3asdfha93whafe08uahfp389a939f8ah3i')

  const load = async () => {
    const data = await storage.loadString('jwt')
    setJwt(data)
  }

  const remove = () => {
    try {
      storage.remove('jwt')
      // deleteUserId()
      setJwt(undefined)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {/* TODO: Remove this if no icons are used in nthe file <IconRegistry icons={EvaIconsPack} />  */}
      <Layout style={styles.container}>
        <Text category="h1" style={styles.titleText}>
          Hello
        </Text>
        <Button onPress={remove}>Remove</Button>
        <Button onPress={load}>Load</Button>
        <Button onPress={save}>Save</Button>
        <Text style={styles.subtitleText}>{jwt}</Text>
        <Text style={styles.subtitleText}>Sign in to your account</Text>
        <LoginForm handleLogin={onLogin} error={error} data={data} loading={loading} />
      </Layout>
    </>
  )
}
