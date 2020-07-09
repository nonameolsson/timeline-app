import { StyleService } from '@ui-kitten/components'

export const themedStyles = StyleService.create({
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
  },
  loginErrorText: {
    fontSize: 14,
    color: 'text-danger-color',
    marginTop: 16,
    textAlign: 'center'
  }
})
