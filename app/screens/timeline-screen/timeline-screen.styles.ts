import { StyleSheet } from 'react-native'

import { color } from 'theme'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: color.palette.white,
    flex: 1,
    justifyContent: 'center'
  },
  events: {
    alignItems: 'flex-start',
    backgroundColor: color.background,
    borderBottomColor: color.palette.black,
    borderBottomWidth: 1,
    paddingBottom: 8,
    paddingTop: 8
  }
})
