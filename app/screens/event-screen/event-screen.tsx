import React, { FunctionComponent as Component, useCallback, useLayoutEffect } from "react"
import { Alert, SafeAreaView, View } from "react-native"
import { Card, Paragraph, List, Subheading, Text, useTheme } from "react-native-paper"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import * as WebBrowser from "expo-web-browser"
import { observer } from "mobx-react-lite"

import { TimelineRouteProp, TimelineStackNavigationProp } from "navigators"

import { Item, MaterialHeaderButtons } from "components"
import { useStores } from "models"

import { styles } from "./event-screen.styles"

export const EventScreen: Component = observer(function EventScreen(): JSX.Element {
  const { timelineStore } = useStores()
  const navigation = useNavigation<TimelineStackNavigationProp<"event">>()
  const { params } = useRoute<TimelineRouteProp<"event">>()

  const {
    colors: { background },
  } = useTheme()

  const event = timelineStore.getEventFromTimeline(params.timelineId, params.eventId)

  useFocusEffect(
    useCallback(() => {
      if (!params.action || !event) return
      if (params.action.type === "EDIT_EVENT") {
        event.updateEvent(params.action.payload, params.action.payload.id)
      }
    }, [event, params.action]),
  )

  const deleteEvent = useCallback(() => {
    const currentEvent = timelineStore.getEventFromTimeline(params.timelineId, params.eventId)
    if (!currentEvent) return

    navigation.navigate("timeline", {
      id: params.timelineId,
      action: {
        type: "DELETE_EVENT",
        meta: {
          id: currentEvent.id,
        },
      },
    })
  }, [navigation, params.eventId, params.timelineId, timelineStore])

  const showDeleteAlert = useCallback(
    function showDeleteAlert() {
      Alert.alert(
        "Delete event",
        "Do you really want to delete it?",
        [
          {
            text: "Cancel",
            onPress: () => console.tron.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => deleteEvent() },
        ],
        { cancelable: false },
      )
    },
    [deleteEvent],
  )

  const headerRight = useCallback(() => {
    if (event === undefined) return undefined

    return (
      <MaterialHeaderButtons>
        <Item title="Delete" iconName="delete" onPress={showDeleteAlert} />
        <Item
          title="Edit"
          iconName="edit"
          onPress={() =>
            navigation.navigate("editEvent", {
              eventId: event?.id,
              timelineId: params.timelineId,
            })
          }
        />
      </MaterialHeaderButtons>
    )
  }, [event, navigation, params.timelineId, showDeleteAlert])

  useLayoutEffect(
    function HeaderButtons() {
      if (event) {
        navigation.setOptions({
          // in your app, extract the arrow function into a separate component
          // to avoid creating a new one every time
          headerRight: () => headerRight(),
        })
      }
    },
    [event, event?.id, headerRight, navigation, params.timelineId, showDeleteAlert],
  )

  if (!event) return <></>

  const openBrowser = async () => {
    if (!event?.url) return
    try {
      const res = await WebBrowser.openBrowserAsync(event.url, {
        enableBarCollapsing: true,
        enableDefaultShareMenuItem: true,
      })
      console.log("res", res)
    } catch (error) {
      console.error(error)
    }
  }

  const renderUrlList = () => {
    if (event?.url) {
      return (
        <List.Item
          left={(props) => <List.Icon {...props} icon="open-in-app" />}
          title={event.url}
          onPress={openBrowser}
        />
      )
    } else {
      return <List.Item title="No refefence added" />
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.container, { backgroundColor: background }]}>
        <Card>
          <Card.Title title={event.title} />
          <Card.Content>
            <Subheading>Description</Subheading>
            <Paragraph>{event.description}</Paragraph>
            <View style={styles.dateWrapper}>
              <View>
                <Subheading>Start Date</Subheading>
                <Text>{event.startDate}</Text>
              </View>
              <View style={styles.endDate}>
                <Subheading>End Date</Subheading>
                <Text>{event.endDate}</Text>
              </View>
            </View>
            <Subheading>References</Subheading>
            {renderUrlList()}
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  )
})
