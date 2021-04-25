import React, { FunctionComponent as Component, useState } from "react";
import { View } from "react-native";
import { Headline, Subheading, useTheme } from "react-native-paper";
import { observer } from "mobx-react-lite";

import { LoginForm } from "components";
import { translate } from "i18n";
import { useStores } from "models";

import { loginScreenStyles as styles } from "./login-screen.styles";

export const LoginScreen: Component = observer(function LoginScreen() {
  const { userStore } = useStores();
  const [isLoading, setIsLoading] = useState(false); // TODO: Add loading to render
  const [error, setError] = useState<string | null>(null);

  const {
    colors: { background },
  } = useTheme();

  const onLogin = async (identifier: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await userStore.login(identifier, password);

      setError(translate(`login.errors.${response?.kind}`));
      setIsLoading(false);
    } catch (err) {
      console.tron.error("login error", err);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={[styles.container, { backgroundColor: background }]}>
        <Headline style={styles.headline}>Hello</Headline>
        <Subheading style={styles.subheading}>
          Sign in to your account
        </Subheading>

        <LoginForm handleLogin={onLogin} errorText={error} />
      </View>
    </View>
  );
});
