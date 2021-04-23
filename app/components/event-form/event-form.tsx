import React, { useLayoutEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View } from 'react-native'
import { HelperText, TextInput, useTheme } from 'react-native-paper'
import { yupResolver } from '@hookform/resolvers'
import { useNavigation } from '@react-navigation/native'

import { Item, MaterialHeaderButtons } from 'components'
import { Event } from 'models/event/event'

import { EventFormData } from './event-form.types'
import { EventFormSchema } from './event-form.validation'

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

  const { control, formState, handleSubmit, errors } = useForm<EventFormData>({
    resolver: yupResolver(EventFormSchema),
    mode: 'onBlur',
    defaultValues: {
      id: event?.id || null,
      title: event?.title || '',
      description: event?.description || '',
      startDate: event?.startDate,
      endDate: event?.endDate || '',
      url: event?.url || '',
    },
  })

  useLayoutEffect(() => {
    const localSubmit = (data: EventFormData) => {
      const updatedData: EventFormData = {
        id: event ? event.id : null,
        title: data.title,
        description: data.description,
        startDate: data.startDate.toString(),
        endDate: data.endDate.toString(),
        url: data.url,
      }

      onSubmit(updatedData)
    }

    navigation.setOptions({
      // in your app, extract the arrow function into a separate component
      // to avoid creating a new one every time
      headerRight: () => (
        <MaterialHeaderButtons left={true}>
          <Item
            disabled={!formState.isValid || formState.isSubmitting}
            title="Save"
            onPress={handleSubmit(localSubmit)}
          />
        </MaterialHeaderButtons>
      ),
    })
  }, [event, event?.id, formState.isSubmitting, formState.isValid, handleSubmit, navigation, onSubmit])

  return (
    <View>
      <Controller
        control={control}
        name="title"
        render={({ onChange, onBlur, value }) => (
          <>
            <TextInput
              autoCapitalize="words" // TODO: Only on English, not Swedish
              autoCorrect={false}
              disabled={formState.isSubmitting}
              error={!!errors.title}
              label="Title"
              left={<TextInput.Icon name="format-title" />}
              right={errors.title && <TextInput.Icon color={error} name="alert-circle" />}
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
        name="description"
        render={({ onChange, onBlur, value }) => (
          <TextInput
            disabled={formState.isSubmitting}
            error={!!errors.description}
            label="Description"
            left={<TextInput.Icon name="script-text-outline" />}
            spellCheck={true}
            style={{ marginBottom: 24 }}
            value={value}
            onBlur={onBlur}
            onChangeText={text => onChange(text)}
          />
        )}
      />
      <Controller
        control={control}
        name="startDate"
        render={({ onChange, onBlur, value }) => (
          <TextInput
            disabled={formState.isSubmitting}
            error={!!errors.startDate}
            label="Start date"
            left={<TextInput.Icon name="calendar" />}
            style={{ marginBottom: 24 }}
            value={value}
            onBlur={onBlur}
            onChangeText={text => onChange(text)}
          />
        )}
      />
      <Controller
        control={control}
        name="endDate"
        render={({ onChange, onBlur, value }) => (
          <TextInput
            disabled={formState.isSubmitting}
            error={!!errors.endDate}
            label="End date"
            left={<TextInput.Icon name="calendar" />}
            style={{ marginBottom: 24 }}
            value={value}
            onBlur={onBlur}
            onChangeText={text => onChange(text)}
          />
        )}
      />
      <Controller
        control={control}
        name="url"
        render={({ onChange, onBlur, value }) => (
          <>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              disabled={formState.isSubmitting}
              error={!!errors.url}
              label="URL"
              left={<TextInput.Icon name="web" />}
              value={value}
              onBlur={onBlur}
              onChangeText={text => onChange(text)}
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
