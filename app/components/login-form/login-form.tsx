import { Controller, useForm } from 'react-hook-form'
import { Button, Input, useStyleSheet } from '@ui-kitten/components'
import { Text } from 'react-native'
import React, { FunctionComponent } from 'react'

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

  const { control, formState, setValue, handleSubmit, errors } = useForm<FormData>({
    validationSchema: LoginSchema,
    mode: 'onChange',
    submitFocusError: true
  })

  const onSubmit = ({ email, password }): void => {
    handleLogin(email, password)
  }

  const superSubmit = () => handleLogin('zetajaz@gmail.com', 'password')

  const handleChange = (fieldName: string, value: any, validate = false): void => {
    setValue(fieldName, value, validate)
  }

  /**
   * TODO: Implement this
   * const navigateToPasswordReset = () => navigation.navigate('PasswordReset')
  */

  return (
    <>
      <Controller
        as={
          <Input
            autoCapitalize="none"
            autoCompleteType="email"
            autoCorrect={false}
            caption={errors.email && errors.email.message.toString()}
            disabled={formState.isSubmitting}
            keyboardAppearance="dark"
            keyboardType="email-address"
            placeholder="E-mail address"
            style={styles.captionTextStyle}
            textContentType="emailAddress"
          />
        }
        control={control}
        defaultValue=""
        name="email"
        onChangeText={(text: string) => handleChange('email', text, true)}
      />
      <Controller
        as={
          <Input
            autoCapitalize="none"
            caption={errors.password && errors.password.message.toString()}
            disabled={formState.isSubmitting}
            keyboardAppearance="dark"
            keyboardType="visible-password"
            placeholder="Password"
            secureTextEntry={true}
            spellCheck={false}
            style={styles.passwordInput}
            textContentType="password"
          />
        }
        control={control}
        defaultValue=""
        name="password"
        onChangeText={(text: string) => handleChange('password', text, true)}
      />
      {/* TODO: Activate this
        <View style={styles.forgotPasswordButton}>
        <TouchableOpacity onPress={navigateToPasswordReset}>
          <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
        </TouchableOpacity>
      </View> */}
      <Text style={styles.loginErrorText}>{error || ''}</Text>
      <Button
        style={styles.signInButton}
        onPress={superSubmit}
      >
        SUPER LOGIN
      </Button>
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
