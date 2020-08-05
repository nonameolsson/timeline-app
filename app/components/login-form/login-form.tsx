import { Controller, useForm } from 'react-hook-form'
import { Button, Card, TextInput, Text, DarkTheme, useTheme, HelperText } from 'react-native-paper'
import React, { FunctionComponent } from 'react'
import { yupResolver } from '@hookform/resolvers'

/** Import types here */
import { FormData } from './login-form.types'

import { themedStyles } from './login-form.styles'
import { LoginSchema } from './login-form.validation'
import { View } from 'react-native'
import { color } from 'theme/'

interface LoginFormProps {
  handleLogin: (email: string, password: string) => void
  errorText?: string
  loading: boolean
}

export const LoginForm: FunctionComponent<LoginFormProps> = ({ handleLogin, errorText, loading }) => {
  const { control, formState, handleSubmit, errors } = useForm<FormData>({
    resolver: yupResolver(LoginSchema),
    mode: 'onBlur'
  })

  const onSubmit = ({ email, password }): void => {
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
        render={({ onChange, onBlur, value }) => (<>
          <TextInput
            autoCapitalize="none"
            autoCompleteType="email"
            autoCorrect={false}
            label="E-mail"
            left={
              <TextInput.Icon
                name="email"
              />
            }
            // label={errors.email && errors.email.message}
            disabled={formState.isSubmitting}
            keyboardType="email-address"
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            error={!!errors.email}
            textContentType="emailAddress"
            value={value}
            style={{ marginTop: 64 }}
          />
          <HelperText type="error" visible={!!errors.email}>
            {errors.email?.message}
          </HelperText></>
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ onChange, onBlur, value }) => (<>
          <TextInput
            autoCapitalize="none"
            // label={errors.password && errors.password.message}
            disabled={formState.isSubmitting}
            keyboardAppearance="dark"
            keyboardType="visible-password"
            onBlur={onBlur}
            left={
              <TextInput.Icon
                name="key"
              />
            }
            onChangeText={value => onChange(value)}
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
          </HelperText></>
        )}
      />
      {/* TODO: Activate this
        <View style={styles.forgotPasswordButton}>
        <TouchableOpacity onPress={navigateToPasswordReset}>
          <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
        </TouchableOpacity>
      </View> */}

      <Text style={{ textAlign: 'center', marginBottom: 16, color: error }}>{errorText || ''}</Text>
      <Button
        disabled={!formState.isValid || formState.isSubmitting}
        onPress={handleSubmit(onSubmit)}
        mode="outlined"
        loading={formState.isSubmitting}
      >
        SIGN IN
      </Button>
    </>
  )
}

// TODO: Change to hooks instead
// export const LoginForm = withNavigation(InnerLoginForm)
