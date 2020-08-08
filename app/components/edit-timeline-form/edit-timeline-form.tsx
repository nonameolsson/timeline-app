import React, { FunctionComponent as Component } from "react"
import { Controller, useForm } from "react-hook-form"
import { Input } from "@ui-kitten/components"
import { yupResolver } from "@hookform/resolvers"

import { Timeline } from "models"
import { EditTimelineFormSchema } from "./edit-timeline-form.validation"
import { Button as HeaderButton } from "react-native"
import { useHeaderRight } from 'utils/hooks'

export interface EditTimelineFormProps {
  timeline: Timeline
  onSubmit: (data: EditTimelineFormData) => void
}

export type EditTimelineFormData = {
  title: string,
  description: string,
}

/**
 * Form used when editing a timeline.
 */
export const EditTimelineForm: Component<EditTimelineFormProps> = ({ timeline, onSubmit }) => {
  const { control, errors, formState, handleSubmit } = useForm<EditTimelineFormData>({
    resolver: yupResolver(EditTimelineFormSchema),
    mode: 'onChange',
    defaultValues: {
      title: timeline?.title,
      description: timeline?.description
    }
  })

  const localSubmit = (data: EditTimelineFormData) => {
    const updatedData = {
      id: timeline.id,
      title: data.title,
      description: data.description,
    }

    onSubmit(updatedData)
  }

  const headerRight = <HeaderButton disabled={!formState.isValid || formState.isSubmitting} title="Save" onPress={handleSubmit(localSubmit)} />

  useHeaderRight(headerRight)

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
            onChangeText={text => onChange(text)}
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
            onChangeText={text => onChange(text)}
            status={errors.description ? 'danger' : 'basic'}
            value={value}
          />
        )}
      />
    </>
  )
}
