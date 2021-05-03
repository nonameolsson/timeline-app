import React, { FunctionComponent as Component } from "react"
import { Controller, useForm } from "react-hook-form"
import { Appbar, HelperText, TextInput } from "react-native-paper"
import { yupResolver } from "@hookform/resolvers/yup"

import { Event } from "models/event/event"
import { useHeaderButtons } from "utils/hooks"

import { EditEventFormSchema } from "./edit-event-form.validation"

export type EditEventFormData = {
  title: string
  description: string
  startDate: string
  endDate?: string
  url?: string
}

export interface EditEventFormProps {
  event: Event
  onSubmit: (data: EditEventFormData) => void
}

/**
 * This is a React functional component, ready to
 *
 * Component description here for TypeScript tips.
 */
export const EditEventForm: Component<EditEventFormProps> = ({ event, onSubmit }) => {
  const {
    control,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
  } = useForm<EditEventFormData>({
    resolver: yupResolver(EditEventFormSchema),
    mode: "onChange",
    defaultValues: {
      title: event.title,
      description: event.description || "",
      startDate: event.startDate,
      endDate: event.endDate || "",
      url: event.url || "",
    },
  })

  const localSubmit = (data: EditEventFormData) => {
    const updatedData = {
      id: event.id,
      title: data.title,
      url: data.url,
      startDate: data.startDate,
      endDate: data.endDate,
      description: data.description,
    }

    onSubmit(updatedData)
  }

  const headerRight = () => (
    <Appbar.Action
      disabled={!isValid || isSubmitting}
      icon="check"
      onPress={handleSubmit(localSubmit)}
    />
  )

  useHeaderButtons({ right: headerRight })

  return (
    <>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              autoCapitalize="none"
              error={!!errors.title}
              label="Title"
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
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
          <>
            <TextInput
              autoCapitalize="none"
              error={!!errors.description}
              label="Description"
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              value={value}
            />
            <HelperText type="error" visible={!!errors.description}>
              {errors.description?.message}
            </HelperText>
          </>
        )}
      />
      <Controller
        control={control}
        name="startDate"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              autoCapitalize="none"
              error={!!errors.startDate}
              label="Start Date"
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              value={value}
            />
            <HelperText type="error" visible={!!errors.startDate}>
              {errors.startDate?.message}
            </HelperText>
          </>
        )}
      />
      <Controller
        control={control}
        name="endDate"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              autoCapitalize="none"
              error={!!errors.endDate}
              label="End Date"
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              value={value}
            />
            <HelperText type="error" visible={!!errors.endDate}>
              {errors.endDate?.message}
            </HelperText>
          </>
        )}
      />
      <Controller
        control={control}
        name="url"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              error={!!errors.url}
              label="URL"
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              value={value}
              textContentType="URL"
              keyboardType="url"
            />
          </>
        )}
      />
    </>
  )
}
