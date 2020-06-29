import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  captionTextStyle: {
    textTransform: 'capitalize'
  },
  container: {
    flex: 1,
    paddingHorizontal: 16
  },
  socialMediaIcons: { flexDirection: 'row', justifyContent: 'space-between' },
  socialMediaText: { marginBottom: 16, marginTop: 16, textAlign: 'center' },
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
