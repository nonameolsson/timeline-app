import React, { FunctionComponent as Component, useCallback, useLayoutEffect } from 'react'
import { Alert, SafeAreaView, ScrollView, View } from 'react-native'
import { Card, Headline, List, Subheading, Text, useTheme } from 'react-native-paper'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import { TimelineRouteProp, TimelineStackNavigationProp } from 'navigators'
import { Timeline } from 'navigators/types'

import { Item, MaterialHeaderButtons } from 'components'
import { useStores } from 'models'
import { formatDateYear } from 'utils/date'

import { styles } from './timeline-screen.styles'

export const TimelineScreen: Component = observer(function TimelineScreen() {
  const { timelineStore } = useStores()
  const navigation = useNavigation<TimelineStackNavigationProp<'timeline'>>()
  const { params } = useRoute<TimelineRouteProp<'timeline'>>()

  const {
    colors: { background },
  } = useTheme()

  const timeline = timelineStore.getTimeline(params.id)
  const events = timeline.getEvents()

  const goToEditTimelineScreen = useCallback(() => {
    navigation.navigate('editTimeline', { id: params.id })
  }, [navigation, params.id])

  const deleteTimeline = useCallback(() => {
    navigation.navigate('timelines', {
      action: { type: 'DELETE_TIMELINE', meta: { id: params.id } },
    })
  }, [navigation, params.id])

  const showDeleteAlert = useCallback(() => {
    Alert.alert(
      'Delete timeline',
      'Do you really want to delete the timeline and all of the events?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => deleteTimeline() },
      ],
      { cancelable: false },
    )
  }, [deleteTimeline])

  useLayoutEffect(() => {
    const headerRightComponent = () => {
      return (
        <MaterialHeaderButtons>
          <Item title="Delete" iconName="delete" onPress={() => showDeleteAlert()} />
          <Item title="Edit" iconName="edit" onPress={() => goToEditTimelineScreen()} />
        </MaterialHeaderButtons>
      )
    }

    navigation.setOptions({
      // in your app, extract the arrow function into a separate component
      // to avoid creating a new one every time
      headerRight: () => headerRightComponent(),
    })
  }, [goToEditTimelineScreen, navigation, showDeleteAlert])

  useFocusEffect(
    useCallback(() => {
      if (!params.action || !timeline) return
      const { action } = params

      const deleteEvent = async (eventId: number) => {
        await timeline.deleteEvent(eventId)
      }

      const editTimeline = async (payload: Timeline) => {
        await timeline.editTimeline(payload, payload.id)
      }

      if (action.type === 'DELETE_EVENT') {
        deleteEvent(action.meta.id)
      } else if (action.type === 'EDIT_TIMELINE') {
        editTimeline(action.payload)
      }
    }, [params, timeline]),
  )

  // Make sure all data exists before using it
  // if (!timeline) return null

  const openEvent = (eventId: number) => {
    const event = timeline.getEvent(eventId)

    navigation.navigate('event', { title: event?.title, timelineId: params.id, eventId })
  }

  const renderEventList = () => {
    const eventList = events.map(event => (
      <List.Item key={event.id} onPress={() => openEvent(event.id)} title={event.title} description={event.date} />
    ))
    return <ScrollView>{eventList}</ScrollView>
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.container, { backgroundColor: background }]}>
        {events.length > 0 ? (
          <>
            <Card style={{ padding: 16 }}>
              <Card.Title title={timeline.description} subtitle={`${events[0].date} - ${events.pop()?.date}`} />
            </Card>
            {renderEventList()}
          </>
        ) : (
          <Card style={{ padding: 16 }}>
            <Card.Title title="No events" subtitle="Start by adding an event" />
          </Card>
        )}
      </View>
    </SafeAreaView>
  )
})
