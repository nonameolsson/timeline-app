import React, { FunctionComponent as Component } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Appbar, HelperText, TextInput } from 'react-native-paper'
import { yupResolver } from '@hookform/resolvers'

import { Event } from 'models/event/event'
import { useHeaderButtons } from 'utils/hooks'

import { EditEventFormSchema } from './edit-event-form.validation'

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
  const { control, errors, formState, handleSubmit } = useForm<EditEventFormData>({
    resolver: yupResolver(EditEventFormSchema),
    mode: 'onChange',
    defaultValues: {
      title: event.title,
      description: event.description || '',
      startDate: event.startDate,
      endDate: event.endDate || '',
      url: event.url || '',
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
        label="Title"
        name="title"
        render={({ onChange, onBlur, value }) => (
          <>
            <TextInput
              autoCapitalize="none"
              error={!!errors.title}
              label="Title"
              value={value}
              onBlur={onBlur}
              onChangeText={text => onChange(text)}
            />
            <HelperText type="error" visible={!!errors.title}>
              {errors.title?.message}
            </HelperText>
          </>
        )}
      />
      <Controller
        control={control}
        label="Description"
        name="description"
        render={({ onChange, onBlur, value }) => (
          <>
            <TextInput
              autoCapitalize="none"
              error={!!errors.description}
              label="Description"
              value={value}
              onBlur={onBlur}
              onChangeText={text => onChange(text)}
            />
            <HelperText type="error" visible={!!errors.description}>
              {errors.description?.message}
            </HelperText>
          </>
        )}
      />
      <Controller
        control={control}
        label="Start Date"
        name="startDate"
        render={({ onChange, onBlur, value }) => (
          <>
            <TextInput
              autoCapitalize="none"
              error={!!errors.startDate}
              label="Start Date"
              value={value}
              onBlur={onBlur}
              onChangeText={text => onChange(text)}
            />
            <HelperText type="error" visible={!!errors.startDate}>
              {errors.startDate?.message}
            </HelperText>
          </>
        )}
      />
      <Controller
        control={control}
        label="End Date"
        name="endDate"
        render={({ onChange, onBlur, value }) => (
          <>
            <TextInput
              autoCapitalize="none"
              error={!!errors.endDate}
              label="End Date"
              value={value}
              onBlur={onBlur}
              onChangeText={text => onChange(text)}
            />
            <HelperText type="error" visible={!!errors.endDate}>
              {errors.endDate?.message}
            </HelperText>
          </>
        )}
      />
      <Controller
        control={control}
        label="URL"
        name="url"
        render={({ onChange, onBlur, value }) => (
          <>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              error={!!errors.url}
              keyboardType="url"
              label="Url"
              textContentType="URL"
              value={value}
              onBlur={onBlur}
              onChangeText={text => onChange(text)}
            />
          </>
        )}
      />
    </>
  )
}
