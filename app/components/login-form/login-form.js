import { Controller, useForm } from "react-hook-form"
import { Button, TextInput, Text, useTheme, HelperText } from "react-native-paper"
import React from "react"
import { yupResolver } from "@hookform/resolvers"
import { LoginSchema } from "./login-form.validation"
export const LoginForm = ({ handleLogin, errorText }) => {
  const { control, formState, handleSubmit, errors } = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  })
  const onSubmit = ({ email, password }) => {
    handleLogin(email, password)
  }
  const {
    colors: { error },
  } = useTheme()
  /**
   * TODO: Implement this
   * const navigateToPasswordReset = () => navigation.navigate('PasswordReset')
   */
  return (
    <>
      <Controller
        control={control}
        name="email"
        render={({ onChange, onBlur, value }) => (
          <>
            <TextInput
              autoCapitalize="none"
              autoCompleteType="email"
              autoCorrect={false}
              label="E-mail"
              left={<TextInput.Icon name="email" />}
              // label={errors.email && errors.email.message}
              disabled={formState.isSubmitting}
              keyboardType="email-address"
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              error={!!errors.email}
              textContentType="emailAddress"
              value={value}
              style={{ marginTop: 64 }}
            />
            <HelperText type="error" visible={!!errors.email}>
              {errors.email?.message}
            </HelperText>
          </>
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ onChange, onBlur, value }) => (
          <>
            <TextInput
              autoCapitalize="none"
              // label={errors.password && errors.password.message}
              disabled={formState.isSubmitting}
              keyboardAppearance="dark"
              keyboardType="visible-password"
              onBlur={onBlur}
              left={<TextInput.Icon name="key" />}
              onChangeText={(text) => onChange(text)}
              label="Password"
              secureTextEntry={true}
              spellCheck={false}
              error={!!errors.password}
              textContentType="password"
              value={value}
              style={{ marginTop: 16 }}
            />
            <HelperText type="error" visible={!!errors.password}>
              {errors.password?.message}
            </HelperText>
          </>
        )}
      />

      <Text style={{ textAlign: "center", marginBottom: 16, color: error }}>{errorText || ""}</Text>
      <Button
        disabled={formState.isSubmitting}
        onPress={handleSubmit(onSubmit)}
        mode="contained"
        loading={formState.isSubmitting}
      >
        SIGN IN
      </Button>
    </>
  )
}
//# sourceMappingURL=login-form.js.map
