import React, { useLayoutEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { View } from "react-native"
import { HelperText, TextInput, useTheme } from "react-native-paper"
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigation } from "@react-navigation/native"

import { Item, MaterialHeaderButtons } from "components"
import { Event } from "models/event/event"

import { EventFormData } from "./event-form.types"
import { EventFormSchema } from "./event-form.validation"

export interface EventFormProps {
  event?: Event
  onSubmit: (data: EventFormData) => void
}

/**
 * This is a React functional component, ready to
 *
 * Component description here for TypeScript tips.
 */
export const EventForm = ({ event, onSubmit }: EventFormProps) => {
  const navigation = useNavigation()
  const {
    colors: { error },
  } = useTheme()

  const {
    control,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
  } = useForm<EventFormData>({
    resolver: yupResolver(EventFormSchema),
    mode: "onChange",
    defaultValues: {
      id: event?.id ?? undefined,
      title: event?.title || "",
      description: event?.description || "",
      startDate: event?.startDate || "",
      endDate: event?.endDate || "",
      url: event?.url || "",
    },
  })

  useLayoutEffect(() => {
    const headerLeft = () => (
      <MaterialHeaderButtons left={true}>
        <Item title="Cancel" onPress={() => navigation.goBack()} />
      </MaterialHeaderButtons>
    )

    const headerRight = () => {
      const localSubmit = (data: EventFormData) => {
        const updatedData: EventFormData = {
          id: event?.id ?? undefined,
          title: data.title,
          description: data.description,
          startDate: data.startDate.toString(),
          endDate: data.endDate ? data.endDate.toString() : "",
          url: data.url,
        }

        onSubmit(updatedData)
      }

      return (
        <MaterialHeaderButtons left={true}>
          <Item
            title="Save"
            disabled={!isValid || isSubmitting}
            onPress={handleSubmit(localSubmit)}
          />
        </MaterialHeaderButtons>
      )
    }
    navigation.setOptions({
      // in your app, extract the arrow function into a separate component
      // to avoid creating a new one every time
      headerLeft: () => headerLeft(),
      headerRight: () => headerRight(),
    })
  }, [event, event?.id, isSubmitting, isValid, handleSubmit, navigation, onSubmit])

  return (
    <View>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              autoCorrect={false}
              label="Title"
              left={<TextInput.Icon name="format-title" />}
              right={errors.title && <TextInput.Icon name="alert-circle" color={error} />}
              disabled={isSubmitting}
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              error={!!errors.title}
              value={value}
            />
            <HelperText type="error" visible={!!errors.title}>
              {errors.title?.message}
            </HelperText>
          </>
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{ marginBottom: 24 }}
            disabled={isSubmitting}
            onBlur={onBlur}
            left={<TextInput.Icon name="script-text-outline" />}
            onChangeText={(text) => onChange(text)}
            label="Description"
            spellCheck={true}
            error={!!errors.description}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name="startDate"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{ marginBottom: 24 }}
            disabled={isSubmitting}
            onBlur={onBlur}
            left={<TextInput.Icon name="calendar" />}
            onChangeText={(text) => onChange(text)}
            label="Start date"
            error={!!errors.startDate}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name="endDate"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{ marginBottom: 24 }}
            disabled={isSubmitting}
            onBlur={onBlur}
            left={<TextInput.Icon name="calendar" />}
            onChangeText={(text) => onChange(text)}
            label="End date"
            error={!!errors.endDate}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name="url"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              disabled={isSubmitting}
              onBlur={onBlur}
              left={<TextInput.Icon name="web" />}
              onChangeText={(text) => onChange(text)}
              label="URL"
              autoCorrect={false}
              autoCapitalize="none"
              error={!!errors.url}
              value={value}
            />
            <HelperText type="error" visible={!!errors.url}>
              {errors.url?.message}
            </HelperText>
          </>
        )}
      />
    </View>
  )
}
