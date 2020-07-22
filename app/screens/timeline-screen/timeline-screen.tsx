import React, { FunctionComponent as Component, useCallback, useLayoutEffect } from "react"
import { observer } from "mobx-react-lite"
import { Button as HeaderButton, SafeAreaView } from "react-native"
import { useNavigation, useFocusEffect, useRoute } from "@react-navigation/native"
import { List, ListItem, Text, Layout, Card } from '@ui-kitten/components'

import { Event, useStores } from "models"
import { styles } from './timeline-screen.styles'
import { PrimaryStackNavigationProp, PrimaryRouteProp } from "navigation"

export const TimelineScreen: Component = observer(() => {
  // Pull in one of our MST stores
  const { timelineStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation<PrimaryStackNavigationProp<"timeline">>()
  const { params: { id } } = useRoute<PrimaryRouteProp<"timeline">>()

  let timeline = timelineStore.getTimeline(id)
  const events = timeline.getEvents()

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused

      // Get the latest data from the store. This is neccessary to get the latest title after editing the timeline in EditTimelineScreen.
      timeline = timelineStore.getTimeline(id)
      navigation.setOptions({ title: timeline.title })

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      }
    }, [])
  )

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

  // FIXME: Related issue #32
  const deleteTimeline = () => {
    // timelineStore.deleteTimelineFromFirebase(timeline.id)
    // goBack()
  }

  // const showDeleteModal = () => {
  //   Alert.alert(
  //     'Delete timeline',
  //     `Do you want to delete ${timeline.title}?`,
  //     [
  //       {
  //         text: 'No',
  //         style: 'cancel'
  //       },
  //       { text: 'Yes', onPress: () => deleteTimeline() }
  //     ],
  //     { cancelable: false }
  //   )
  // }

  const openEvent = (eventId: string) => {
    navigation.navigate('event', { timelineId: id, eventId })
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

        <Text category="h4">Events</Text>
        <List data={events} renderItem={renderItem} />
      </Layout>
    </SafeAreaView>
  )
})
