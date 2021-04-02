import React from "react";
import { observer } from "mobx-react-lite";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView, View } from "react-native";
import { useTheme } from "react-native-paper";
import { EventForm } from "components";
import { useStores } from "models";
import { editEventScreenStyles as styles } from "./add-event-screen.styles";
// #den här koden vet jag inte vad den gör, det är @nonameolsson som har koll
export const EditEventScreen = observer(function EditEventScreen() {
    const navigation = useNavigation(); // NOTE: Should this be a props instead?
    const { timelineStore } = useStores();
    const { params } = useRoute();
    const { colors: { background }, } = useTheme();
    // Make sure all data exists
    const event = timelineStore.getEventFromTimeline(params.timelineId, params.eventId);
    if (!event)
        return null;
    // This will be changed when implementing #87
    // @nonameolsson
    const onSubmit = async ({ title, url, description }) => {
        navigation.navigate("event", {
            eventId: params.eventId,
            timelineId: params.timelineId,
            title,
            action: {
                type: "EDIT_EVENT",
                payload: {
                    id: event.id,
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    created_at: event.created_at,
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    updated_at: event.updated_at,
                    timeline: params.timelineId,
                    title,
                    url,
                    description,
                },
            },
        });
    };
    return (<SafeAreaView style={styles.screen}>
      <View style={[styles.container, { backgroundColor: background }]}>
        <EventForm event={event} onSubmit={onSubmit}/>
      </View>
    </SafeAreaView>);
});
//# sourceMappingURL=edit-event-screen.js.map