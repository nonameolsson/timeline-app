import React, { FunctionComponent as Component } from "react";
import { Controller, useForm } from "react-hook-form";
import { Appbar, HelperText, TextInput } from "react-native-paper";
import { yupResolver } from "@hookform/resolvers";

import { Timeline } from "models";
import { useHeaderButtons } from "utils/hooks";

import { EditTimelineFormSchema } from "./edit-timeline-form.validation";

export interface EditTimelineFormProps {
  timeline: Timeline;
  onSubmit: (data: EditTimelineFormData) => void;
}

export type EditTimelineFormData = {
  title: string;
  description: string;
};

/**
 * Form used when editing a timeline.
 */
export const EditTimelineForm: Component<EditTimelineFormProps> = ({
  timeline,
  onSubmit,
}) => {
  const {
    control,
    errors,
    formState,
    handleSubmit,
  } = useForm<EditTimelineFormData>({
    resolver: yupResolver(EditTimelineFormSchema),
    mode: "onChange",
    defaultValues: {
      title: timeline.title || "",
      description: timeline.description || "",
    },
  });

  const localSubmit = (data: EditTimelineFormData) => {
    const updatedData = {
      id: timeline.id,
      title: data.title,
      description: data.description,
    };

    onSubmit(updatedData);
  };

  const headerRight = () => (
    <Appbar.Action
      disabled={!formState.isValid || formState.isSubmitting}
      icon="check"
      onPress={handleSubmit(localSubmit)}
    />
  );

  useHeaderButtons({ right: headerRight });

  return (
    <>
      <Controller
        control={control}
        name="title"
        label="Title"
        render={({ onChange, onBlur, value }) => (
          <>
            <TextInput
              autoCapitalize="none"
              error={!!errors.title}
              label="Title"
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
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
        label="Description"
        render={({ onChange, onBlur, value }) => (
          <>
            <TextInput
              autoCapitalize="none"
              error={!!errors.description}
              label="Description"
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              value={value}
            />
            <HelperText type="error" visible={!!errors.description}>
              {errors.description?.message}
            </HelperText>
          </>
        )}
      />
    </>
  );
};
