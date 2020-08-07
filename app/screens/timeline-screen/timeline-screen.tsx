import { Button as HeaderButton, SafeAreaView, Alert } from "react-native"
import { List, ListItem, Text, Layout, Card, Button } from '@ui-kitten/components'
import { Observer, observer } from "mobx-react-lite"
import { useNavigation, useFocusEffect, useRoute } from "@react-navigation/native"
import React, { FunctionComponent as Component, useLayoutEffect, useCallback } from "react"

import { PrimaryStackNavigationProp, PrimaryRouteProp } from "navigation"
import { Event, useStores } from "models"
import { styles } from './timeline-screen.styles'
import { Timeline } from 'navigation/types'

export const TimelineScreen: Component = observer(function TimelineScreen() {
  const { timelineStore } = useStores()
  const navigation = useNavigation<PrimaryStackNavigationProp<"timeline">>()
  const { params } = useRoute<PrimaryRouteProp<"timeline">>()

  const timeline = timelineStore.getTimeline(params.id)

  useFocusEffect(
    useCallback(() => {
      if (!params.action || !timeline) return
      const { action } = params

      const deleteEvent = async (eventId: string) => {
        await timeline.deleteEvent(eventId)
      }

      const editTimeline = async (payload: Timeline) => {
        await timeline.editTimeline(payload)
      }

      if (action.type === 'DELETE_EVENT') {
        deleteEvent(action.meta.id)
      } else if (action.type === 'EDIT_TIMELINE') {
        editTimeline(action.payload)
      }
    }, [params, timeline])
  )

  const goToEditTimelineScreen = useCallback(() => {
    navigation.navigate('editTimeline', { id: params.id })
  }, [navigation, params.id])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton title="Edit" onPress={goToEditTimelineScreen} />
      )
    })
  }, [goToEditTimelineScreen, navigation])

  // Make sure all data exists before using it
  if (!timeline) return null

  const deleteTimeline = () => {
    navigation.navigate('home', { action: { type: 'DELETE_TIMELINE', meta: { id: params.id } } })
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

  const openEvent = (eventId: string) => {
    const event = timeline.getEvent(eventId)

    navigation.navigate('event', { title: event?.title, timelineId: params.id, eventId })
  }

  const renderItem = ({ item, index }: { item: Event; index: number }) => (
    <Observer>
      {() => <ListItem onPress={() => openEvent(item.id)} key={index} title={item.title} description={item.description} />}
    </Observer>
  )

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
