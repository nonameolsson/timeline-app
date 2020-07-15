import React, { useEffect, useState, FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Button, ScrollView, TouchableHighlight, Alert } from "react-native"
import { Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { styles } from './timeline-screen.styles'
const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

export const TimelineScreen: Component = observer(function TimelineScreen() {
  // Pull in one of our MST stores
  const { eventStore, timelineStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  // useEffect(() => {
  //   // Start listening to changes in Firestore
  //   eventStore.startListeningToEvents(timeline.id)
  // }, [eventStore, timeline.id])

  // FIXME: Related issue #32
  const deleteTimeline = (): void => {
    console.tron.log('deleteTimelien')
    // timelineStore.deleteTimelineFromFirebase(timeline.id)
    // goBack()
  }

  const showDeleteModal = () => {
    Alert.alert(
      'Delete timeline',
      `Do you want to delete ${timeline.name}?`,
      [
        {
          text: 'No',
          style: 'cancel'
        },
        { text: 'Yes', onPress: () => deleteTimeline() }
      ],
      { cancelable: false }
    )
  }

  const openEvent = (event: Event) => {
    // navigation.navigate('Event', { event })
  }

  const renderEvents = () => {
    const eventIds = timelineStore.getEventIdsInTimeline(timeline.id) // Get the IDs of events from a timeline
    const eventsInStore = eventIds.map(event => eventStore.byId.get(event)) // Get the Event from EventStore

    const eventsToRender = eventsInStore.map(event => {
      return (
        <TouchableHighlight key={event.id} style={styles.events} onPress={(): void => openEvent(event)}>
          <View>
            <Text>{event.name}</Text>
          </View>
        </TouchableHighlight>
      )
    })

    return <ScrollView>{eventsToRender}</ScrollView>
  }

  // FIXME: Issue #33
  const goToEditTimelineScreen = (): void => {
    console.tron.log('goToEditTimelineScreen')
    // const params: ICreateTimelineScreenParams = {
    //   action: 'edit',
    //   timeline
    // }

    // navigate('CreateTimeline', params)
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <View>
        <Text>{`ID: ${timeline.id}`}</Text>
        <Text>{`Created by: ${timeline.createdBy}`}</Text>
        <Text>{`Name: ${timeline.name}`}</Text>
        <Button title="Edit timeline" onPress={(): void => goToEditTimelineScreen()} />
        <Button title="Delete timeline" onPress={(): void => showDeleteModal()} />
        <Button title="Add new event" onPress={(): boolean => navigate('AddEvent', { timelineId: timeline.id })} />
        <Text>Events:</Text>
        {renderEvents()}
      </View>
    </Screen>
  )
})
