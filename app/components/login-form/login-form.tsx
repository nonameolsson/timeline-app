import { Controller, useForm } from 'react-hook-form'
import { Button, Input, useStyleSheet } from '@ui-kitten/components'
import { Text } from 'react-native'
import React, { FunctionComponent } from 'react'
import { yupResolver } from '@hookform/resolvers'

/** Import types here */
import { FormData } from './login-form.types'

import { themedStyles } from './login-form.styles'
import { LoginSchema } from './login-form.validation'

interface LoginFormProps {
  handleLogin: (email: string, password: string) => void
  error?: string
  loading: boolean
}

export const LoginForm: FunctionComponent<LoginFormProps> = ({ handleLogin, error, loading }) => {
  const styles = useStyleSheet(themedStyles)

  const { control, formState, handleSubmit, errors } = useForm<FormData>({
    resolver: yupResolver(LoginSchema),
    mode: 'onBlur'
  })

  const onSubmit = ({ email, password }): void => {
    handleLogin(email, password)
  }

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
          <Input
            autoCapitalize="none"
            autoCompleteType="email"
            autoCorrect={false}
            caption={errors.email && errors.email.message}
            disabled={formState.isSubmitting}
            keyboardType="email-address"
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            placeholder="E-mail address"
            status={errors.email ? 'danger' : 'basic'}
            style={styles.captionTextStyle}
            textContentType="emailAddress"
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ onChange, onBlur, value }) => (
          <Input
            autoCapitalize="none"
            caption={errors.password && errors.password.message}
            disabled={formState.isSubmitting}
            keyboardAppearance="dark"
            keyboardType="visible-password"
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            placeholder="Password"
            secureTextEntry={true}
            spellCheck={false}
            status={errors.password ? 'danger' : 'basic'}
            style={styles.passwordInput}
            textContentType="password"
            value={value}
          />
        )}
      />
      {/* TODO: Activate this
        <View style={styles.forgotPasswordButton}>
        <TouchableOpacity onPress={navigateToPasswordReset}>
          <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
        </TouchableOpacity>
      </View> */}
      <Text style={styles.loginErrorText}>{error || ''}</Text>
      <Button
        disabled={!formState.isValid || formState.isSubmitting}
        style={styles.signInButton}
        onPress={handleSubmit(onSubmit)}
      >
        {formState.isSubmitting ? 'LOADING...' : 'SIGN IN'}
      </Button>
    </>
  )
}

// TODO: Change to hooks instead
// export const LoginForm = withNavigation(InnerLoginForm)
