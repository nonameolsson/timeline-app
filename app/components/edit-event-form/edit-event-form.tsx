import { Controller, useForm } from "react-hook-form"
import { TextInput, HelperText, Appbar } from "react-native-paper"
import { yupResolver } from "@hookform/resolvers"
import React, { FunctionComponent as Component } from "react"

import { EditEventFormSchema } from "./edit-event-form.validation"
import { Event } from "models"
import { useHeaderButtons } from "utils/hooks"

export type EditEventFormData = {
  title: string
  description: string
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
  const { control, errors, formState, handleSubmit } = useForm<EditEventFormData>({
    resolver: yupResolver(EditEventFormSchema),
    mode: "onChange",
    defaultValues: {
      title: event.title,
      description: event.description || "",
      url: event.url || "",
    },
  })

  const localSubmit = (data: EditEventFormData) => {
    const updatedData = {
      id: event.id,
      title: data.title,
      url: data.url,
      description: data.description,
    }

    onSubmit(updatedData)
  }

  const headerRight = () => (
    <Appbar.Action
      disabled={!formState.isValid || formState.isSubmitting}
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
        label="Title"
        render={({ onChange, onBlur, value }) => (
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
        label="Description"
        render={({ onChange, onBlur, value }) => (
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
        name="url"
        label="URL"
        render={({ onChange, onBlur, value }) => (
          <>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              error={!!errors.url}
              label="Url"
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
