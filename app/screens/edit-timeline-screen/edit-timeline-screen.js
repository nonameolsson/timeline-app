import { observer } from "mobx-react-lite"
import { useNavigation, useRoute } from "@react-navigation/native"
import React from "react"
import { SafeAreaView, View } from "react-native"
import { useStores } from "models"
import { EditTimelineForm } from "components/edit-timeline-form/edit-timeline-form"
import { useTheme } from "react-native-paper"
import { editTimelineScreenStyles as styles } from "./edit-timeline-screen.styles"
export const EditTimelineScreen = observer(function EditTimelineScreen() {
  const navigation = useNavigation()
  const { timelineStore } = useStores()
  const { params } = useRoute()
  const {
    colors: { background },
  } = useTheme()
  // Make sure all data exists
  const timeline = timelineStore.getTimeline(params.id)
  if (!timeline) return null
  const onSubmit = async (formData) => {
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
    })
  }
  return (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.container, { backgroundColor: background }]}>
        <EditTimelineForm timeline={timeline} onSubmit={onSubmit} />
      </View>
    </SafeAreaView>
  )
})
//# sourceMappingURL=edit-timeline-screen.js.map
