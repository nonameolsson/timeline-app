import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native"
import { Layout, Text } from '@ui-kitten/components'

import { useStores } from "models"
import { PrimaryParamList } from "navigation"
import { styles } from './event-screen-styles'

type EventScreenRouteProp = RouteProp<PrimaryParamList, 'event'>;

export const EventScreen: Component = observer(function EventScreen() {
  // Pull in one of our MST stores
  const { timelineStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const { params: { eventId, timelineId } } = useRoute<EventScreenRouteProp>()

  const event = timelineStore.getEventFromTimeline(timelineId, eventId)

  return (
    <Layout style={styles.container}>
      <Text>{event.title}</Text>
      <Text>{event.description}</Text>
    </Layout>
  )
})
