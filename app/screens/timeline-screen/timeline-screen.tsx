import React, { FunctionComponent as Component, useLayoutEffect, useRef, useEffect } from "react"
import { useObserver } from "mobx-react-lite"
import { Button as HeaderButton, SafeAreaView } from "react-native"
import { useNavigation, useFocusEffect, useRoute } from "@react-navigation/native"
import { List, ListItem, Text, Layout, Card } from '@ui-kitten/components'

import { Event, useStores } from "models"
import { styles } from './timeline-screen.styles'
import { PrimaryStackNavigationProp, PrimaryRouteProp } from "navigation"
import { autorun } from "mobx"

const useTitle = (id) => {
  const { timelineStore } = useStores()
  const titleRef = useRef('')
  const navigation = useNavigation()

  useEffect(() => {
    const dispose = autorun(() => {
      const timeline = timelineStore.getTimeline(id)
      titleRef.current = timeline.title
    })
    return dispose
  }, [id])
  useFocusEffect(() => { navigation.setOptions({ title: titleRef.current }) })
}

export const TimelineScreen: Component = () => {
  // Pull in one of our MST stores
  const { timelineStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation<PrimaryStackNavigationProp<"timeline">>()
  const { params: { id } } = useRoute<PrimaryRouteProp<"timeline">>()

  const timeline = timelineStore.timelines.get(id)
  useTitle(id)

  const goToEditTimelineScreen = () => {
    navigation.navigate('editTimeline', { id: timeline.id })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton title="Edit" onPress={goToEditTimelineScreen} />
      ),
    })
  }, [navigation])

  return useObserver(() => {
    const deleteEvent = (eventId: string) => timeline.deleteEvent(eventId)

    const openEvent = (eventId: string) => {
      navigation.navigate('event', { timelineId: id, eventId, onDelete: deleteEvent })
    }

    const renderItem = ({ item, index }: { item: Event; index: number }) => <ListItem onPress={() => openEvent(item.id)} key={index} title={item.title} description={item.description} />

    return (
      <SafeAreaView style={styles.container}>
        <Layout style={styles.layout}>
          <Card>
            <Text>{timeline.description}</Text>
          </Card>
          {/* <Button onPress={() => showDeleteModal()}>Delete timeline</Button> */}

          {/* <Button onPress={() => navigation.navigate(null, { timelineId: timeline.id })}>Add new event</Button> */}

          <Text category="h4">Events - {timeline.events.length}</Text>
          <List data={timeline.events} renderItem={renderItem} />
        </Layout>
      </SafeAreaView>
    )
  })
}
