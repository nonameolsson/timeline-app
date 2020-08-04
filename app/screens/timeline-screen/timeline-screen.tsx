import React, { FunctionComponent as Component, useLayoutEffect, useRef, useEffect, useCallback } from "react"
import { Observer, useObserver } from "mobx-react-lite"
import { Button as HeaderButton, SafeAreaView, Alert } from "react-native"
import { useNavigation, useFocusEffect, useRoute } from "@react-navigation/native"
import { List, ListItem, Text, Layout, Card, Button } from '@ui-kitten/components'

import { Event, useStores, Timeline } from "models"
import { styles } from './timeline-screen.styles'
import { PrimaryStackNavigationProp, PrimaryRouteProp } from "navigation"
import { autorun } from "mobx"

// TODO: Move to utility
const useTitle = (id: string) => {
  const { timelineStore } = useStores()
  const titleRef = useRef('')
  const navigation = useNavigation()

  useEffect(() => {
    if (!id) return

    const dispose = autorun(() => {
      const timeline = timelineStore.getTimeline(id)

      if (timeline) titleRef.current = timeline.title
    })
    return dispose
  }, [id, timelineStore])

  useFocusEffect(() => { navigation.setOptions({ title: titleRef.current }) })
}

export const TimelineScreen: Component = () => {
  // Pull in one of our MST stores
  const { timelineStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation<PrimaryStackNavigationProp<"timeline">>()
  const { params } = useRoute<PrimaryRouteProp<"timeline">>()
  const timeline = timelineStore.timelines.get(params.id) as Timeline

  const deleteTimeline = () => {
    navigation.navigate('home', { action: { type: 'DELETE_TIMELINE', meta: { id: timeline.id } } })
  }

  const showDeleteAlert = () => {
    Alert.alert(
      "Delete event",
      "Do you really want to delete the timeline and all of the events?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => deleteTimeline() }
      ],
      { cancelable: false }
    )
  }

  const goToEditTimelineScreen = useCallback(() => {
    navigation.navigate('editTimeline', { id: timeline.id })
  }, [navigation, timeline])

  useTitle(params.id)

  useFocusEffect(
    React.useCallback(() => {
      console.tron.log('FOCUS TIMELINESCREEN')

      navigation.setOptions({
        headerRight: () => (
          <HeaderButton title="Edit" onPress={goToEditTimelineScreen} />
        ),
      })

      return () => {
        // isActive = false
        console.tron.log('UNFOCUS TIMELINESCREEN')
      }
    }, [goToEditTimelineScreen, navigation])
  )

  useEffect(() => {
    switch (params.action?.type) {
      case 'DELETE_EVENT':
        timeline.deleteEvent(params.action.meta.id)
        break

      case 'EDIT_TIMELINE':
        timeline.updateTimeline(params.action.payload)
        break

      default:
        break
    }
  }, [params.action, timeline])

  const openEvent = (eventId: string) => {
    navigation.navigate('event', { timelineId: timeline.id, eventId })
  }

  const renderItem = ({ item, index }: { item: Event; index: number }) => (
    <Observer>
      {() => <ListItem onPress={() => openEvent(item.id)} key={index} title={item.title} description={item.description} />}
    </Observer>
  )
  return useObserver(() => (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.layout}>
        <Card>
          <Text>{timeline.description}</Text>
        </Card>

        <Button onPress={() => showDeleteAlert()}>Delete timeline</Button>

        {/* <Button onPress={() => navigation.navigate(null, { timelineId: timeline.id })}>Add new event</Button> */}
        <Text category="h4">Events - {timeline.events.length}</Text>
        <List data={timelineStore.getTimeline(params.id)?.events} renderItem={renderItem} />
      </Layout>
    </SafeAreaView>
  )
  )
}
