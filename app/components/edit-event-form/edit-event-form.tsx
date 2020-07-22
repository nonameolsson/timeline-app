import { Button as HeaderButton } from "react-native"
import { Controller, useForm } from "react-hook-form"
import { Input } from "@ui-kitten/components"
import { useNavigation } from "@react-navigation/native"
import { yupResolver } from "@hookform/resolvers"
import React, { FunctionComponent as Component } from "react"

import { EditEventFormSchema } from "./edit-event-form.validation"
import { Event } from "models"
import { PrimaryStackNavigationProp } from "navigation"

export type EditEventeFormData = {
  title: string,
  description: string,
}

export interface EditEventFormProps {
  event: Event
  onSubmit: (data: EditEventeFormData) => void
}

/**
 * This is a React functional component, ready to
 *
 * Component description here for TypeScript tips.
 */
export const EditEventForm: Component<EditEventFormProps> = ({ event, onSubmit }) => {
  const navigation = useNavigation<PrimaryStackNavigationProp<"editEvent">>()
  const { control, errors, formState, handleSubmit } = useForm<EditEventeFormData>({
    resolver: yupResolver(EditEventFormSchema),
    mode: 'onChange',
    defaultValues: {
      title: event.title,
      description: event.description
    }
  })

  const localSubmit = async (data) => {
    const updatedData = {
      id: event.id,
      title: data.title,
      description: data.description,
    }

    await onSubmit(updatedData)
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton disabled={!formState.isValid || formState.isSubmitting} title="Save" onPress={handleSubmit(localSubmit)} />
      ),
    })
  }, [navigation, formState])

  return (
    <>
      <Controller
        control={control}
        name="title"
        label='Title'
        render={({ onChange, onBlur, value }) => (
          <Input
            autoCapitalize="none"
            caption={errors.title && errors.title.message}
            label="Title"
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            status={errors.title ? 'danger' : 'basic'}
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
            autoCapitalize="none"
            caption={errors.description && errors.description.message}
            label="Description"
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            status={errors.description ? 'danger' : 'basic'}
            value={value}
          />
        )}
      />
    </>
  )
}
