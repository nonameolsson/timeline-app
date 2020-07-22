import { Button, Input, Text, Layout } from '@ui-kitten/components'
import { Controller, useForm } from 'react-hook-form'
import { observer } from "mobx-react-lite"
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native"
import React, { FunctionComponent as Component } from "react"
import { SafeAreaView, StyleSheet } from "react-native"

import { PrimaryParamList } from "navigation"
import { useStores } from "models"

type TimelineScreenRouteProp = RouteProp<PrimaryParamList, 'editTimeline'>;

type FormData = {
  title: string,
  description: string,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layout: {
    flex: 1,
    padding: 16
  }
})

export const EditTimelineScreen: Component = observer(function EditTimelineScreen() {
  const { timelineStore } = useStores()
  const navigation = useNavigation()
  const { params: { id } } = useRoute<TimelineScreenRouteProp>()
  const timeline = timelineStore.getTimeline(id)

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      title: timeline.title,
      description: timeline.description
    }
  })

  const onSubmit = async data => {
    const updatedData = {
      id: timeline.id,
      title: data.title,
      description: data.description,
    }

    await timelineStore.updateTimeline(updatedData)
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.layout}>
        <Controller
          control={control}
          name="title"
          label='Title'
          render={({ onChange, onBlur, value }) => (
            <Input
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          label='Description'
          render={({ onChange, onBlur, value }) => (
            <Input
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
        />

        <Button onPress={handleSubmit(onSubmit)}>Save</Button>
      </Layout>
    </SafeAreaView>
  )
})
