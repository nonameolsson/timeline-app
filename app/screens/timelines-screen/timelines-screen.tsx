import React, { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, View } from "react-native";
import { Button, List, Text } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { observer } from "mobx-react-lite";

import { EmptyState } from "components";
import { useStores } from "models";

import { styles } from "./timelines-screen.styles";

// type TimelinesScreenProp = {
//   navigation: CompositeNavigationProp<
//     MaterialBottomTabNavigationProp<BottomTabParamList, "timelines">,
//     StackNavigationProp<RootTimelineParamList>>
//   route: TimelineRouteProp<"timelines">
// }

// type Props = {
//   navigation: TimelineStackNavigationProp<"timelines">
//   route: TimelineRouteProp<"timelines">
// };

export const TimelinesScreen = observer(function TimelinesScreen({
  navigation,
  route: { params },
}: any) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fix to get correct type
  const { userStore, timelineStore } = useStores();

  // TODO: Adjust so new timelines are retrieved when navigating to this screen.
  useFocusEffect(
    useCallback(() => {
      if (userStore.user) {
        timelineStore
          .getTimelines(userStore.user.id)
          .then(() => setIsLoading(false));
      }
    }, [timelineStore, userStore.user])
  );

  useFocusEffect(
    useCallback(() => {
      if (!params || !params.action) return;
      const { action } = params;

      const deleteTimeline = async (timelineId: number) => {
        const timeline = timelineStore.getTimeline(timelineId);
        if (!timeline) return;

        await timeline.deleteAllEvents();
        await timelineStore.deleteTimeline(timelineId);
      };

      if (action.type === "DELETE_TIMELINE") {
        setIsLoading(true);
        deleteTimeline(action.meta.id);
        setIsLoading(false);
      }
    }, [params, timelineStore])
  );

  const openTimeline = (id: string, title: string): void => {
    navigation.navigate("timeline", { id, title });
  };

  const renderItem = ({ item: { title, id, description } }) => (
    <List.Item
      title={title}
      key={id}
      onPress={() => openTimeline(id, title)}
      description={description}
      left={(props) => <List.Icon {...props} icon="folder" />}
    />
  );

  const renderList = () => {
    const timelines = timelineStore.getTimelinesArray();

    if (!timelines) return null;

    return (
      <FlatList
        data={timelineStore.getTimelinesArray()}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  };

  const emptyState = () => {
    return (
      <View style={styles.emptyStateWrapper}>
        <EmptyState
          title="Empty in timelines"
          description="Start by creating a timeline and it will show up here"
          icon="timeline-plus-outline"
        />
        <View style={styles.emptyStateButtonWrapper}>
          <Button
            onPress={() => navigation.navigate("addTimeline")}
            mode="contained"
          >
            Create timeline
          </Button>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        {userStore.isLoggedIn() ? (
          <>
            {isLoading ? (
              <ActivityIndicator />
            ) : timelineStore.hasTimelines() ? (
              renderList()
            ) : (
              emptyState()
            )}
          </>
        ) : (
          <Text>Logging in...</Text>
        )}
      </View>
    </SafeAreaView>
  );
});
