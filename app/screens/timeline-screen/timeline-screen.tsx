import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Button, ScrollView, TouchableHighlight, Alert } from "react-native"
import { Screen, Text } from "components"
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native"
import { useStores } from "models"
import { color } from "theme"
import { styles } from './timeline-screen.styles'
import { PrimaryParamList } from "navigation"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

type TimelineScreenRouteProp = RouteProp<PrimaryParamList, 'timeline'>;

export const TimelineScreen: Component = observer(function TimelineScreen() {
  // Pull in one of our MST stores
  const { timelineStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const { params: { timelineId } } = useRoute<TimelineScreenRouteProp>()

  const timeline = timelineStore.getTimeline(timelineId)

  // useEffect(() => {
  //   // Start listening to changes in Firestore
  //   timelineStore.getTimeline(timelineId)
  // }, [])

  // FIXME: Related issue #32
  const deleteTimeline = () => {
    console.tron.log('deleteTimelien')
    // timelineStore.deleteTimelineFromFirebase(timeline.id)
    // goBack()
  }

  const showDeleteModal = () => {
    Alert.alert(
      'Delete timeline',
      `Do you want to delete ${timeline.title}?`,
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

  const openEvent = (eventId: number) => {
    navigation.navigate('event', { timelineId, eventId })
  }

  const renderEvents = () => {
    const eventsToRender = timeline.events.map(event => {
      return (
        <TouchableHighlight key={event.id} style={styles.events} onPress={(): void => openEvent(event.id)}>
          <View style={{ backgroundColor: 'green', color: 'white' }}>
            <Text>{event.title}</Text>
          </View>
        </TouchableHighlight>
      )
    })

    return <ScrollView>{eventsToRender}</ScrollView>
  }

  const goToEditTimelineScreen = () => {
    navigation.navigate('editTimeline', { timeline })
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <View>
        <Text>{`ID: ${timeline.id}`}</Text>
        {/* <Text>{`Created by: ${timeline.createdBy}`}</Text> */}
        <Text>{`Name: ${timeline.title}`}</Text>
        <Button title="Edit timeline" onPress={() => goToEditTimelineScreen()} />
        <Button title="Delete timeline" onPress={() => showDeleteModal()} />
        <Button title="Add new event" onPress={() => navigation.navigate('AddEvent', { timelineId: timeline.id })} />
        <Button title="Back" onPress={() => navigation.goBack()} />

        <Text>Events:</Text>
        {renderEvents()}
      </View>
    </Screen>
  )
})
