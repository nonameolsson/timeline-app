import React from "react"
import { View } from "react-native"
import { Text, useTheme, HelperText, TextInput } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers"

import { MaterialHeaderButtons, Item } from "components"
import { AddEventFormSchema } from "./add-event-form.validation"
import { AddEventFormData } from "./add-event-form.types"

export interface AddEventFormProps {
  onSubmit: (data: AddEventFormData) => void
  errorText: string | null
}

/**
 * This is a React functional component, ready to
 *
 * Component description here for TypeScript tips.
 */
export const AddEventForm = ({ errorText, onSubmit }: AddEventFormProps) => {
  const navigation = useNavigation()
  const {
    colors: { error },
  } = useTheme()

  const { control, formState, handleSubmit, errors } = useForm<AddEventFormData>({
    resolver: yupResolver(AddEventFormSchema),
    mode: "onBlur",
    defaultValues: {
      description: "",
      title: "",
      url: "https://",
    },
  })

  React.useLayoutEffect(() => {
    const localSubmit = (data: AddEventFormData) => {
      const updatedData: AddEventFormData = {
        title: data.title,
        description: data.description,
        url: data.url,
      }

      onSubmit(updatedData)
    }

    navigation.setOptions({
      // in your app, extract the arrow function into a separate component
      // to avoid creating a new one every time
      headerLeft: () => (
        <MaterialHeaderButtons left={true}>
          <Item title="Cancel" onPress={() => navigation.goBack()} />
        </MaterialHeaderButtons>
      ),
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
  }, [formState.isSubmitting, formState.isValid, handleSubmit, navigation, onSubmit])

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
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={{ marginBottom: 24 }}
            disabled={formState.isSubmitting}
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
        name="url"
        render={({ onChange, onBlur, value }) => (
          <>
            <TextInput
              disabled={formState.isSubmitting}
              onBlur={onBlur}
              left={<TextInput.Icon name="web" />}
              onChangeText={(text) => onChange(text)}
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

      <Text>{errorText || ""}</Text>
    </View>
  )
}
