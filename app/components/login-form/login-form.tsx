import React, { FunctionComponent } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button, HelperText, Text, TextInput, useTheme } from 'react-native-paper'
import { yupResolver } from '@hookform/resolvers'

/** Import types here */
import { FormData } from './login-form.types'
import { LoginSchema } from './login-form.validation'

interface LoginFormProps {
  handleLogin: (email: string, password: string) => void
  errorText: string | null
}

export const LoginForm: FunctionComponent<LoginFormProps> = ({ handleLogin, errorText }) => {
  const { control, formState, handleSubmit, errors } = useForm<FormData>({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
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
        render={({ onChange, onBlur, value }) => (
          <>
            <TextInput
              autoCapitalize="none"
              autoCompleteType="email"
              autoCorrect={false}
              disabled={formState.isSubmitting}
              error={!!errors.email}
              // label={errors.email && errors.email.message}
              keyboardType="email-address"
              label="E-mail"
              left={<TextInput.Icon name="email" />}
              style={{ marginTop: 64 }}
              textContentType="emailAddress"
              value={value}
              onBlur={onBlur}
              onChangeText={text => onChange(text)}
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
              error={!!errors.password}
              keyboardAppearance="dark"
              keyboardType="visible-password"
              label="Password"
              left={<TextInput.Icon name="key" />}
              secureTextEntry={true}
              spellCheck={false}
              style={{ marginTop: 16 }}
              textContentType="password"
              value={value}
              onBlur={onBlur}
              onChangeText={text => onChange(text)}
            />
            <HelperText type="error" visible={!!errors.password}>
              {errors.password?.message}
            </HelperText>
          </>
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
        disabled={formState.isSubmitting}
        loading={formState.isSubmitting}
        mode="contained"
        onPress={handleSubmit(onSubmit)}
      >
        SIGN IN
      </Button>
    </>
  )
}
