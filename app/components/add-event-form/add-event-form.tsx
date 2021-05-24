import React, { useEffect, useLayoutEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { ScrollView } from "react-native"
import { HelperText, Subheading, Checkbox, Text, TextInput, useTheme } from "react-native-paper"
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigation } from "@react-navigation/native"

import { Item, MaterialHeaderButtons } from "components"

import { AddEventFormData, AddEventFormProps } from "./add-event-form.types"
import { AddEventFormSchema } from "./add-event-form.validation"

/**
 * This is a React functional component, ready to
 *
 * Component description here for TypeScript tips.
 */
export const AddEventForm = ({ onSubmit }: AddEventFormProps) => {
  const navigation = useNavigation()
  const {
    colors: { error },
  } = useTheme()

  const {
    control,
    setValue,
    watch,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
  } = useForm<AddEventFormData>({
    resolver: yupResolver(AddEventFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      startBC: false,
      startYear: undefined,
      startMonth: undefined,
      startDate: undefined,
      endBC: false,
      endYear: undefined,
      endMonth: undefined,
      endDate: undefined,
      url: null,
    },
  })

  const watchStartYear = watch("startYear")
  const watchStartMonth = watch("startMonth")
  const watchEndYear = watch("endYear")
  const watchEndMonth = watch("endMonth")

  useLayoutEffect(() => {
    const headerLeft = () => (
      <MaterialHeaderButtons left={true}>
        <Item title="Cancel" onPress={() => navigation.goBack()} />
      </MaterialHeaderButtons>
    )

    const headerRight = () => {
      return (
        <MaterialHeaderButtons left={true}>
          <Item
            title="Save"
            disabled={!isValid || isSubmitting}
            onPress={handleSubmit((data) => onSubmit(data))}
          />
        </MaterialHeaderButtons>
      )
    }

    navigation.setOptions({
      // in your app, extract the arrow function into a separate component
      // to avoid creating a new one every time
      headerLeft: () => headerLeft(),
      headerRight: () => headerRight(),
    })
  }, [isSubmitting, isValid, handleSubmit, navigation, onSubmit])

  function onToggleChecked(value) {
    setValue("startBC", !value)
  }

  useEffect(() => {
    // Reset values when emptying fields
    if (!watchStartYear) {
      setValue("startMonth", undefined)
    }
    if (!watchStartMonth) {
      setValue("startDate", undefined)
    }
    if (!watchEndYear) {
      setValue("endMonth", undefined)
    }
    if (!watchEndMonth) {
      setValue("endDate", undefined)
    }
  }, [setValue, watchStartYear, watchStartMonth, watchEndYear, watchEndMonth])

  return (
    <ScrollView>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
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
            style={{ marginBottom: 24 }}
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
      <Subheading>Start Date</Subheading>
      <Text>BCE</Text>
      <Controller
        name="startBC"
        control={control}
        render={({ field: { value } }) => {
          return (
            <Checkbox
              onPress={() => onToggleChecked(value)}
              status={value ? "checked" : "unchecked"}
            />
          )
        }}
      />
      <Controller
        name="startYear"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              onChangeText={(text) => onChange(text)}
              onBlur={onBlur}
              // keyboardType="number-pad"
              error={!!errors.startYear?.message}
              label="Year"
              value={value || undefined}
            />
            <HelperText type="error" visible={!!errors.startYear}>
              {errors.startYear?.message}
            </HelperText>
          </>
        )}
      />
      {!!watchStartYear && !errors.startYear && (
        <Controller
          name="startMonth"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                onChangeText={(text) => onChange(text)}
                onBlur={onBlur}
                value={value || undefined}
                // keyboardType="number-pad"
                error={!!errors.startMonth?.message}
                label="Month"
              />
              <HelperText type="error" visible={!!errors.startMonth}>
                {errors.startMonth?.message}
              </HelperText>
            </>
          )}
        />
      )}
      {!!watchStartMonth && !errors.startMonth && (
        <Controller
          name="startDate"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                error={!!errors.startDate?.message}
                keyboardType="numeric"
                label="Date"
                onChangeText={(text) => onChange(text)}
                onBlur={onBlur}
                value={value || undefined}
              />
              <HelperText type="error" visible={!!errors.startMonth}>
                {errors.startMonth?.message}
              </HelperText>
            </>
          )}
        />
      )}
      <Subheading>End Date</Subheading>
      <Text>BCE</Text>
      <Controller
        name="endBC"
        control={control}
        render={({ field: { value } }) => {
          return (
            <Checkbox
              onPress={() => onToggleChecked(value)}
              status={value ? "checked" : "unchecked"}
            />
          )
        }}
      />
      <Controller
        name="endYear"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              onChangeText={(text) => onChange(text)}
              onBlur={onBlur}
              keyboardType="number-pad"
              error={!!errors.endYear?.message}
              label="Year"
              value={value || undefined}
            />
            <HelperText type="error" visible={!!errors.endYear}>
              {errors.endYear?.message}
            </HelperText>
          </>
        )}
      />
      {!!watchEndYear && !errors.endYear && (
        <Controller
          name="endMonth"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                onChangeText={(text) => onChange(text)}
                onBlur={onBlur}
                value={value || undefined}
                keyboardType="number-pad"
                error={!!errors.endMonth?.message}
                label="Month"
              />
              <HelperText type="error" visible={!!errors.endMonth}>
                {errors.endMonth?.message}
              </HelperText>
            </>
          )}
        />
      )}
      {!!watchEndMonth && !errors.endMonth && (
        <Controller
          name="endDate"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                error={!!errors.endDate?.message}
                keyboardType="number-pad"
                label="Date"
                onChangeText={(text) => onChange(text)}
                onBlur={onBlur}
                value={value || undefined}
              />
              <HelperText type="error" visible={!!errors.endDate}>
                {errors.endDate?.message}
              </HelperText>
            </>
          )}
        />
      )}
      <Controller
        control={control}
        name="url"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              disabled={isSubmitting}
              onBlur={onBlur}
              left={<TextInput.Icon name="web" />}
              onChangeText={(text) => onChange(text)}
              label="URL"
              autoCorrect={false}
              autoCapitalize="none"
              error={!!errors.url}
              value={value}
            />
            <HelperText type="error" visible={!!errors.url}>
              {errors.url?.message}
            </HelperText>
          </>
        )}
      />
    </ScrollView>
  )
}
