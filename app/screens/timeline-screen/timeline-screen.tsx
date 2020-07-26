import React, { FunctionComponent as Component, useLayoutEffect, useRef, useEffect, useCallback } from "react"
import { useObserver } from "mobx-react-lite"
import { Button as HeaderButton, SafeAreaView, Alert } from "react-native"
import { useNavigation, useFocusEffect, useRoute } from "@react-navigation/native"
import { List, ListItem, Text, Layout, Card, Button } from '@ui-kitten/components'

import { Event, useStores, Timeline } from "models"
import { styles } from './timeline-screen.styles'
import { PrimaryStackNavigationProp, PrimaryRouteProp } from "navigation"
import { autorun } from "mobx"

const useTitle = (id: string) => {
  const { timelineStore } = useStores()
  const titleRef = useRef('')
  const navigation = useNavigation()

  useEffect(() => {
    const dispose = autorun(() => {
      const timeline = timelineStore.getTimeline(id)
      if (timeline) {
        titleRef.current = timeline.title
      }
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

  useFocusEffect(
    React.useCallback(() => {
      console.tron.log('FOCUS TIMELINESCREEN')

      return () => {
        // isActive = false
        console.tron.log('UNFOCUS TIMELINESCREEN')
      }
    }, [])
  )

  useTitle(params.id)

  const goToEditTimelineScreen = useCallback(() => {
    navigation.navigate('editTimeline', { id: timeline.id })
  }, [navigation, timeline.id])

  const deleteTimeline = () => navigation.navigate('home', { action: { type: 'DELETE_TIMELINE', meta: { id: timeline.id } } })

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton title="Edit" onPress={goToEditTimelineScreen} />
      ),
    })
  }, [goToEditTimelineScreen, navigation, timeline.id])

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

  return useObserver(() => {
    const openEvent = (eventId: string) => {
      navigation.navigate('event', { timelineId: timeline.id, eventId })
    }

    const renderItem = ({ item, index }: { item: Event; index: number }) => <ListItem onPress={() => openEvent(item.id)} key={index} title={item.title} description={item.description} />

    return (
      <SafeAreaView style={styles.container}>
        <Layout style={styles.layout}>
          <Card>
            <Text>{timeline.description}</Text>
          </Card>
          <Button onPress={() => showDeleteAlert()}>Delete timeline</Button>

          {/* <Button onPress={() => navigation.navigate(null, { timelineId: timeline.id })}>Add new event</Button> */}

          <Text category="h4">Events - {timeline.events.length}</Text>
          <List data={timeline.events} renderItem={renderItem} />
        </Layout>
      </SafeAreaView>
    )
  })
}
