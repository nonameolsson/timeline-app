import React, {
  FunctionComponent as Component,
  useCallback,
  useLayoutEffect,
} from "react";
import { Alert, SafeAreaView, View } from "react-native";
import { Headline, List, Subheading, Text, useTheme } from "react-native-paper";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import { observer } from "mobx-react-lite";
import { TimelineRouteProp, TimelineStackNavigationProp } from "navigators";

import { Item, MaterialHeaderButtons } from "components";
import { useStores } from "models";
import {
  formatDateYear,
  getTimelineDataString,
  getTimelineDate,
} from "utils/date";

import { styles } from "./event-screen.styles";

export const EventScreen: Component = observer(function EventScreen() {
  const { timelineStore } = useStores();
  const navigation = useNavigation<TimelineStackNavigationProp<"event">>();
  const { params } = useRoute<TimelineRouteProp<"event">>();

  const {
    colors: { background },
  } = useTheme();

  const event = timelineStore.getEventFromTimeline(
    params.timelineId,
    params.eventId
  );

  useFocusEffect(
    useCallback(() => {
      if (!params.action || !event) return;
      if (params.action.type === "EDIT_EVENT") {
        event.updateEvent(params.action.payload, params.action.payload.id);
      }
    }, [event, params.action])
  );

  const deleteEvent = useCallback(() => {
    const currentEvent = timelineStore.getEventFromTimeline(
      params.timelineId,
      params.eventId
    );
    if (!currentEvent) return;

    navigation.navigate("timeline", {
      id: params.timelineId,
      action: {
        type: "DELETE_EVENT",
        meta: {
          id: currentEvent.id,
        },
      },
    });
  }, [navigation, params.eventId, params.timelineId, timelineStore]);

  const showDeleteAlert = useCallback(
    function showDeleteAlert() {
      Alert.alert(
        "Delete event",
        "Do you really want to delete it?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => deleteEvent() },
        ],
        { cancelable: false }
      );
    },
    [deleteEvent]
  );

  useLayoutEffect(
    function HeaderButtons() {
      if (event) {
        navigation.setOptions({
          // in your app, extract the arrow function into a separate component
          // to avoid creating a new one every time
          headerRight: () => (
            <MaterialHeaderButtons>
              <Item
                title="Delete"
                iconName="delete"
                onPress={showDeleteAlert}
              />
              <Item
                title="Edit"
                iconName="edit"
                onPress={() =>
                  navigation.navigate("editEvent", {
                    eventId: event.id,
                    timelineId: params.timelineId,
                  })
                }
              />
            </MaterialHeaderButtons>
          ),
        });
      }
    },
    [event, event?.id, navigation, params.timelineId, showDeleteAlert]
  );

  if (!event) return null;

  const openBrowser = async () => {
    if (event.url) {
      try {
        const res = await WebBrowser.openBrowserAsync(event.url, {
          enableBarCollapsing: true,
          enableDefaultShareMenuItem: true,
        });
        console.log("res", res);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const renderUrlList = () => {
    if (event.url) {
      return <List.Item title={event.url} onPress={openBrowser} />;
    } else {
      return <List.Item title="No refefence added" />;
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.container, { backgroundColor: background }]}>
        <Subheading>Title</Subheading>
        <Text>{event.title}</Text>
        <Subheading>Description</Subheading>
        <Text>{event.description}</Text>
        <Subheading>Start Date</Subheading>
        <Text>{event.startDate}</Text>
        <Subheading>End Date</Subheading>
        <Text>{event.endDate}</Text>
        <Subheading>Test</Subheading>
        <Text>
          {formatDateYear(
            getTimelineDate({ negative: true, year: 1914, month: 10, day: 22 })
          )}
        </Text>
        <Text>
          {getTimelineDataString({
            negative: true,
            year: 1914,
            month: 10,
            day: 22,
          })}
        </Text>
        <Text>
          {formatDateYear(getTimelineDate({ negative: true, year: 1914 }))}
        </Text>
        <Headline>References</Headline>
        {renderUrlList()}
      </View>
    </SafeAreaView>
  );
});
