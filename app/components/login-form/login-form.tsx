import React, { FunctionComponent } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { StyleService, Button, Input, useStyleSheet } from '@ui-kitten/components'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as yup from 'yup'

/** Import utilities here */
// import { useStores } from 'models/rootStore'

/** Import types here */
import { FormData } from './login-form.types'

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(6)
    .required()
})

const themedStyles = StyleService.create({
  captionTextStyle: {
    color: 'text-danger-color',
    textTransform: 'capitalize'
  },
  container: {
    flex: 1,
    paddingHorizontal: 16
  },
  forgotPasswordButton: {
    alignItems: 'flex-end',
    marginTop: 8
  },
  forgotPasswordText: {
    color: 'text-hint-color'
  },
  passwordInput: {
    marginTop: 16
  },
  signInButton: {
    marginTop: 180,
    marginVertical: 16,
    textTransform: 'uppercase',
    tintColor: 'text-basic-color',
    width: '100%'
  },
  subtitleText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 80,
    marginTop: 18,
    textAlign: 'center'
  },
  titleText: {
    fontSize: 36,
    marginTop: 80,
    textAlign: 'center'
  }
})

interface LoginFormProps {
  handleLogin: (email: string, password: string) => void
  error: any
  data: any
  loading: boolean
}

export const LoginForm: FunctionComponent<LoginFormProps> = ({ handleLogin, loading, error }) => {
  const styles = useStyleSheet(themedStyles)
  const navigation = useNavigation()

  const { control, formState, setValue, setError, handleSubmit, errors } = useForm<FormData>({
    validationSchema: LoginSchema,
    mode: 'onChange',
    submitFocusError: true
  })

  React.useEffect(() => {
    if (error?.graphQLErrors[0]?.extensions?.exception?.data?.message[0]?.messages[0]?.id === "Auth.form.error.invalid") {
      setError('email', 'notMatch', 'Wrong e-mail or password')
    }
  })

  const onSubmit = async ({ email, password }): Promise<void> => {
    await handleLogin(email, password)
    // if (code === 'auth/user-not-found') {
    //   setError('email', 'notMatch', 'No account found with that e-mail')
    // } else if (code === 'auth/wrong-password') {
    //   setError('password', 'wrongPassword', 'Wrong password')
    // }
  }

  const handleChange = (fieldName: string, value: any, validate = false): void => {
    setValue(fieldName, value, validate)
  }

  const navigateToPasswordReset = () => navigation.navigate('PasswordReset')

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
            // captionStyle={styles.captionTextStyle}
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
