import React, { useCallback } from "react"
import { Controller, useForm } from "react-hook-form"
import { View } from "react-native"
import { HelperText, Text, TextInput, useTheme } from "react-native-paper"
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigation } from "@react-navigation/native"

import { Item, MaterialHeaderButtons } from "components"

import { FormData } from "./addTimelineForm.types"
import { AddTimelineFormSchema } from "./addTimelineForm.validation"

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

  const {
    control,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
  } = useForm<FormData>({
    resolver: yupResolver(AddTimelineFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const headerLeft = useCallback(
    () => (
      <MaterialHeaderButtons left={true}>
        <Item title="Cancel" onPress={() => navigation.goBack()} />
      </MaterialHeaderButtons>
    ),
    [navigation],
  )

  const headerRight = useCallback(() => {
    const localSubmit = (data: any /* FIXME: this type */) => {
      const updatedData = {
        title: data.title,
        description: data.description,
      }

      onSubmit(updatedData)
    }

    return (
      <>
        <MaterialHeaderButtons>
          <Item
            title="Save"
            disabled={!isValid || isSubmitting}
            onPress={handleSubmit(localSubmit)}
          />
        </MaterialHeaderButtons>
      </>
    )
  }, [handleSubmit, isSubmitting, isValid, onSubmit])

  React.useLayoutEffect(() => {
    navigation.setOptions({
      // in your app, extract the arrow function into a separate component
      // to avoid creating a new one every time
      headerLeft: () => headerLeft(),
      headerRight: () => headerRight(),
    })
  }, [isSubmitting, isValid, handleSubmit, navigation, onSubmit, headerLeft, headerRight])

  return (
    <View>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              autoCapitalize="sentences"
              autoCorrect={false}
              label="Title"
              left={<TextInput.Icon name="format-title" />}
              right={errors.title && <TextInput.Icon name="alert-circle" color={error} />}
              disabled={isSubmitting}
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
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            autoCapitalize="sentences"
            disabled={isSubmitting}
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
