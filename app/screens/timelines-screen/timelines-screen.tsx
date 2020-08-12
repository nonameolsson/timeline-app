import React, { useRef, useState, FunctionComponent as Component, useCallback } from "react"
import { ActivityIndicator, Animated, SafeAreaView, View, Modal } from "react-native"
import { Button, Text, List, useTheme } from "react-native-paper"
import { observer } from "mobx-react-lite"
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native"
import { Modalize } from 'react-native-modalize'
import { Host } from 'react-native-portalize'
import { AddTimelineForm } from 'components'

import { useStores } from "models"
import { TimelineStackNavigationProp, TimelineRouteProp } from "navigation"
import { styles } from "./timelines-screen.styles"

export const TimelinesScreen: Component = observer(function TimelinesScreen(props) {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const modalizeRef = useRef<Modalize>(null)
  const [showModal, setShowModal] = useState<boolean>(false)
  const animated = useRef(new Animated.Value(0)).current
  const {
    colors: { background },
  } = useTheme()

  // Fix to get correct type
  const { userStore, timelineStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation<TimelineStackNavigationProp<"home">>()
  const { params } = useRoute<TimelineRouteProp<"home">>()

  // TODO: Adjust so new timelines are retrieved when navigating to this screen.
  useFocusEffect(
    useCallback(() => {
      if (userStore.user) {
        timelineStore.getTimelines(userStore.user.id).then(() => setIsLoading(false))
      }
    }, [timelineStore, userStore.user])
  )

  useFocusEffect(
    useCallback(() => {
      if (!params || !params.action) return
      const { action } = params

      const deleteTimeline = async (timelineId: string) => {
        const timeline = timelineStore.getTimeline(timelineId)
        if (!timeline) return

        await timeline.deleteAllEvents()
        await timelineStore.deleteTimeline(timelineId)
      }

      if (action.type === 'DELETE_TIMELINE') {
        setIsLoading(true)
        deleteTimeline(action.meta.id)
        setIsLoading(false)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params])
  )

  const openTimeline = (id: string, title: string): void => {
    navigation.navigate("timeline", { id, title })
  }

  const renderEmptyState = () => <Text>Please create a timeline first.</Text>

  const onOpen = () => {
    setShowModal(true)
    modalizeRef.current?.open()
  }

  const closeModalize = () => {
    setShowModal(false)
    modalizeRef.current?.close()
  }

  const renderList = () => {
    return timelineStore.getTimelinesArray().map(timeline => (
      <List.Item
        title={timeline.title}
        key={timeline.id}
        onPress={() => openTimeline(timeline.id, timeline.title)}
        description={timeline.description}
        left={props => <List.Icon {...props} icon="folder" />}
      />
    ))
  }

  return (
    <Host style={{ backgroundColor: '#000' }}>
      <SafeAreaView style={styles.screen}>
        <View style={[styles.container, { backgroundColor: background }]}>
          {userStore.isLoggedIn() ? (
            <>
              <Text>Your timelines</Text>
              {isLoading
                ? <ActivityIndicator />
                : timelineStore.hasTimelines()
                  ? renderList()
                  : renderEmptyState()
              }
            </>
          ) : (
            <Text>Logging in...</Text>
          )}
          <Button onPress={(): void => onOpen()}>Add</Button>
        </View>
        <Modal
          animationType="slide"
          presentationStyle="pageSheet"
          visible={showModal}
        >
          <AddTimelineForm onClose={closeModalize} />
        </Modal>
      </SafeAreaView>
    </Host>
  )
})
