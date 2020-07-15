import { StyleSheet } from 'react-native'

import { color } from 'theme'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: color.background,
    flex: 1,
    justifyContent: 'center'
  },
  events: {
    alignItems: 'flex-start',
    backgroundColor: color.primary,
    borderBottomColor: color.primaryDarker,
    borderBottomWidth: 1,
    paddingBottom: 8,
    paddingTop: 8
  }
})
