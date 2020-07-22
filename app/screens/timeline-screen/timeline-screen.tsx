import React, { FunctionComponent as Component, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { Alert, SafeAreaView } from "react-native"
import { useNavigation, RouteProp, useFocusEffect, useRoute } from "@react-navigation/native"
import { Button, List, ListItem, Text, Layout, Card } from '@ui-kitten/components'

import { Event, useStores } from "models"
import { styles } from './timeline-screen.styles'
import { PrimaryParamList } from "navigation"

type TimelineScreenRouteProp = RouteProp<PrimaryParamList, 'timeline'>;

export const TimelineScreen: Component = observer(function TimelineScreen() {
  // Pull in one of our MST stores
  const { timelineStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const { params: { id } } = useRoute<TimelineScreenRouteProp>()

  let timeline = timelineStore.getTimeline(id)

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused

      // Get the latest data from the store. This is neccessary to get the latest title after editing the timeline in EditTimelineScreen.
      timeline = timelineStore.getTimeline(id)
      navigation.setOptions({ title: timeline.title })

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        timeline = timelineStore.getTimeline(id)
      }
    }, [])
  )

  // FIXME: Related issue #32
  const deleteTimeline = () => {
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
    navigation.navigate('event', { timelineId: id, eventId })
  }

  const renderItem = ({ item, index }: { item: Event; index: number }) => <ListItem onPress={() => openEvent(item.id)} key={index} title={item.title} description={item.description} />

  const goToEditTimelineScreen = () => {
    navigation.navigate('editTimeline', { id: timeline.id })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.layout}>
        <Card>
          <Text>{`Description: ${timeline.description}`}</Text>
        </Card>
        <Button onPress={() => goToEditTimelineScreen()}>Edit timeline</Button>
        <Button onPress={() => showDeleteModal()}>Delete timeline</Button>

        <Button onPress={() => navigation.navigate('AddEvent', { timelineId: timeline.id })}>Add new event</Button>

        <Text category="h4">Events</Text>
        <List data={timeline.events} renderItem={renderItem} />
      </Layout>
    </SafeAreaView>
  )
})
