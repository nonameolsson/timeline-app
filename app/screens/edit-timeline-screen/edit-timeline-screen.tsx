import React, { FunctionComponent as Component } from "react";
import { SafeAreaView, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { TimelineRouteProp, TimelineStackNavigationProp } from "navigators";

import {
  EditTimelineForm,
  EditTimelineFormData,
} from "components/edit-timeline-form/edit-timeline-form";
import { useStores } from "models";

import { editTimelineScreenStyles as styles } from "./edit-timeline-screen.styles";

export const EditTimelineScreen: Component = observer(
  function EditTimelineScreen() {
    const navigation = useNavigation<
      TimelineStackNavigationProp<"editTimeline">
    >();
    const { timelineStore } = useStores();
    const { params } = useRoute<TimelineRouteProp<"editTimeline">>();

    const {
      colors: { background },
    } = useTheme();

    // Make sure all data exists
    const timeline = timelineStore.getTimeline(params.id);
    if (!timeline) return null;

    const onSubmit = async (formData: EditTimelineFormData) => {
      navigation.navigate("timeline", {
        id: timeline.id,
        title: formData.title,
        action: {
          type: "EDIT_TIMELINE",
          payload: {
            id: timeline.id,
            title: formData.title,
            description: formData.description,
          },
        },
      });
    };

    return (
      <SafeAreaView style={styles.screen}>
        <View style={[styles.container, { backgroundColor: background }]}>
          <EditTimelineForm timeline={timeline} onSubmit={onSubmit} />
        </View>
      </SafeAreaView>
    );
  }
);
