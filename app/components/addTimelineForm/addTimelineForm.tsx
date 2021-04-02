import React from "react"
import { TextInput, Text, HelperText, useTheme } from "react-native-paper"
import { Controller, useForm } from "react-hook-form"
import { View } from "react-native"
import { yupResolver } from "@hookform/resolvers"

import { FormData } from "./addTimelineForm.types"
import { AddTimelineFormSchema } from "./addTimelineForm.validation"
import { MaterialHeaderButtons, Item } from "components"
import { useNavigation } from "@react-navigation/native"

interface AddTimelineFormProps {
  onSubmit: (data: { title: string; description: string }) => void
  errorText: string | null
}

/**
 * This is a React functional component, ready to
 *
 * Component description here for TypeScript tips.
 */
export const AddTimelineForm = ({ errorText, onSubmit }: AddTimelineFormProps) => {
  const navigation = useNavigation()
  const {
    colors: { error },
  } = useTheme()

  const { control, formState, handleSubmit, errors } = useForm<FormData>({
    resolver: yupResolver(AddTimelineFormSchema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
    },
  })

  React.useLayoutEffect(() => {
    const localSubmit = (data: any /* FIXME: this type */) => {
      const updatedData = {
        title: data.title,
        description: data.description,
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

      <Text>{errorText || ""}</Text>
    </View>
  )
}
