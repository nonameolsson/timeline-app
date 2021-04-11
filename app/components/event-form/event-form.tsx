import React, { useLayoutEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
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
      date: event?.date,
      url: event?.url || '',
    },
  })

  useLayoutEffect(() => {
    const localSubmit = (data: EventFormData) => {
      const updatedData: EventFormData = {
        id: event ? event.id : null,
        title: data.title,
        description: data.description,
        date: data.date.toString(),
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
            title="Save"
            disabled={!formState.isValid || formState.isSubmitting}
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
              label="Title"
              left={<TextInput.Icon name="format-title" />}
              right={errors.title && <TextInput.Icon name="alert-circle" color={error} />}
              disabled={formState.isSubmitting}
              onBlur={onBlur}
              onChangeText={text => onChange(text)}
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
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={{ marginBottom: 24 }}
            disabled={formState.isSubmitting}
            onBlur={onBlur}
            left={<TextInput.Icon name="script-text-outline" />}
            onChangeText={text => onChange(text)}
            label="Description"
            spellCheck={true}
            error={!!errors.description}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name="date"
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={{ marginBottom: 24 }}
            disabled={formState.isSubmitting}
            onBlur={onBlur}
            left={<TextInput.Icon name="calendar" />}
            onChangeText={text => onChange(text)}
            label="Date"
            error={!!errors.date}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name="url"
        render={({ onChange, onBlur, value }) => (
          <>
            <TextInput
              disabled={formState.isSubmitting}
              onBlur={onBlur}
              left={<TextInput.Icon name="web" />}
              onChangeText={text => onChange(text)}
              label="URL"
              autoCapitalize="none"
              autoCorrect={false}
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
