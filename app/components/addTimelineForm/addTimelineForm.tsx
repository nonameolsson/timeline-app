import React, { FunctionComponent as Component } from "react"
import { Button, TextInput, Text, HelperText, useTheme } from "react-native-paper"
import { Controller, useForm } from 'react-hook-form'
import { useObserver } from 'mobx-react-lite'
import { View } from "react-native"
import { yupResolver } from '@hookform/resolvers'

import { FormData } from './addTimelineForm.types'
import { AddTimelineFormSchema } from './addTimelineFormSchema.validation'

import { addTimelineFormStyles as styles } from "./addTimelineForm.styles"

interface AddTimelineFormProps {
  onCreate: (email: string, password: string) => void
  errorText: string | null
}

/**
 * This is a React functional component, ready to
 *
 * Component description here for TypeScript tips.
 */
export const AddTimelineForm = ({ errorText, onCreate }: AddTimelineFormProps) => {
  // Note: if you want your componeobservernt to refresh when data is updated in the store,
  // wrap this component in `` like so:
  // `export const AddTimelineForm = observer(function AddTimelineForm { ... })`

  // Enable this line to retrieve data from the rootStore (or other store)
  // const rootStore = useStores()
  // or
  // const { otherStore, userStore } = useStores()

  const { control, formState, handleSubmit, errors } = useForm<FormData>({
    resolver: yupResolver(AddTimelineFormSchema),
    mode: 'onBlur'
  })

  const onSubmit = ({ email, password }): void => {
    onCreate(email, password)
  }

  const {
    colors: { error },
  } = useTheme()

  return useObserver(() => (
    <View>
      <>
        <Controller
          control={control}
          name="title"
          render={({ onChange, onBlur, value }) => (<>
            <TextInput
              autoCapitalize="words" // TODO: Only on English, not Swedish
              autoCorrect={false}
              label="Title"
              left={
                <TextInput.Icon
                  name="email"
                />
              }
              disabled={formState.isSubmitting}
              onBlur={onBlur}
              onChangeText={text => onChange(text)}
              error={!!errors.title}
              value={value}
            />
            <HelperText type="error" visible={!!errors.title}>
              {errors.title?.message}
            </HelperText></>
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ onChange, onBlur, value }) => (<>
            <TextInput
              disabled={formState.isSubmitting}
              onBlur={onBlur}
              left={
                <TextInput.Icon
                  name="key"
                />
              }
              onChangeText={text => onChange(text)}
              label="Password"
              secureTextEntry={true}
              spellCheck={false}
              error={!!errors.description}
              value={value}
              style={{ marginTop: 16 }}
            />
            <HelperText type="error" visible={!!errors.description}>
              {errors.description?.message}
            </HelperText></>
          )}
        />

        <Text style={{ textAlign: 'center', marginBottom: 16, color: error }}>{errorText || ''}</Text>
        <Button
          disabled={formState.isSubmitting}
          onPress={handleSubmit(onSubmit)}
          mode="contained"
          loading={formState.isSubmitting}
        >
          Create Timeline
        </Button>
      </>
    </View>
  ))
}
