import { autorun, reaction } from "mobx"
import { Button as HeaderButton, SafeAreaView, Alert } from "react-native"
import { List, ListItem, Text, Layout, Card, Button } from '@ui-kitten/components'
import { Observer, useObserver, useAsObservableSource } from "mobx-react-lite"
import { useNavigation, useFocusEffect, useRoute } from "@react-navigation/native"
import React, { FunctionComponent as Component, useLayoutEffect, useRef, useEffect, useCallback } from "react"

import { PrimaryStackNavigationProp, PrimaryRouteProp } from "navigation"
import { Event, useStores } from "models"
import { useEffectWithStore } from "utils/hooks"
import { styles } from './timeline-screen.styles'

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

// useEffect(() => {
//   switch (params.action?.type) {
//     case 'DELETE_EVENT':
//       timeline.deleteEvent(params.action.meta.id)
//       break

//     case 'EDIT_TIMELINE':
//       timeline.updateTimeline(params.action.payload)
//       break

//     default:
//       break
//   }
// }, [params.action, timeline])

// const useActions = (callback, dependencyCallback) => {
//   const callbackRef = useRef<any>()
//   const dependencyCallbackRef = useRef<any>()

//   useEffect(() => {
//     callbackRef.current = callback
//   }, [callback])

//   useEffect(() => {
//     dependencyCallbackRef.current = dependencyCallback
//   }, [dependencyCallback])

//   useEffect(() => {
//     return reaction(dependencyCallbackRef.current, callbackRef.current)
//   }, [])
// }

export const TimelineScreen: Component = () => {
  // Pull in one of our MST stores
  const { timelineStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation<PrimaryStackNavigationProp<"timeline">>()
  const { params } = useRoute<PrimaryRouteProp<"timeline">>()

  useEffectWithStore(

    () => timelineStore.getTimeline(params.id),
    timeline => {
      if (!timeline) return

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
    },
    [params],
  )

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

  const goToEditTimelineScreen = useCallback(() => {
    navigation.navigate('editTimeline', { id: params.id })
  }, [navigation, params.id])

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

  const openEvent = (eventId: string) => {
    navigation.navigate('event', { timelineId: params.id, eventId })
  }

  const renderItem = ({ item, index }: { item: Event; index: number }) => (
    <Observer>
      {() => <ListItem onPress={() => openEvent(item.id)} key={index} title={item.title} description={item.description} />}
    </Observer>
  )

  return useObserver(() => {
    const timeline = timelineStore.getTimeline(params.id)

    if (!timeline) return null

    return (
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
  }
  )
}
