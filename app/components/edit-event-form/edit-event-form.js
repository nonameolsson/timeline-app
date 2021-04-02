import { Controller, useForm } from "react-hook-form";
import { TextInput, HelperText, Appbar } from "react-native-paper";
import { yupResolver } from "@hookform/resolvers";
import React from "react";
import { EditEventFormSchema } from "./edit-event-form.validation";
import { useHeaderButtons } from "utils/hooks";
/**
 * This is a React functional component, ready to
 *
 * Component description here for TypeScript tips.
 */
export const EditEventForm = ({ event, onSubmit }) => {
    const { control, errors, formState, handleSubmit } = useForm({
        resolver: yupResolver(EditEventFormSchema),
        mode: "onChange",
        defaultValues: {
            title: event.title,
            description: event.description || "",
            url: event.url || "",
        },
    });
    const localSubmit = (data) => {
        const updatedData = {
            id: event.id,
            title: data.title,
            url: data.url,
            description: data.description,
        };
        onSubmit(updatedData);
    };
    const headerRight = () => (<Appbar.Action disabled={!formState.isValid || formState.isSubmitting} icon="check" onPress={handleSubmit(localSubmit)}/>);
    useHeaderButtons({ right: headerRight });
    return (<>
      <Controller control={control} name="title" label="Title" render={({ onChange, onBlur, value }) => (<>
            <TextInput autoCapitalize="none" error={!!errors.title} label="Title" onBlur={onBlur} onChangeText={(text) => onChange(text)} value={value}/>
            <HelperText type="error" visible={!!errors.title}>
              {errors.title?.message}
            </HelperText>
          </>)}/>
      <Controller control={control} name="description" label="Description" render={({ onChange, onBlur, value }) => (<>
            <TextInput autoCapitalize="none" error={!!errors.description} label="Description" onBlur={onBlur} onChangeText={(text) => onChange(text)} value={value}/>
            <HelperText type="error" visible={!!errors.description}>
              {errors.description?.message}
            </HelperText>
          </>)}/>
      <Controller control={control} name="url" label="URL" render={({ onChange, onBlur, value }) => (<>
            <TextInput autoCapitalize="none" autoCorrect={false} error={!!errors.url} label="Url" onBlur={onBlur} onChangeText={(text) => onChange(text)} value={value} textContentType="URL" keyboardType="url"/>
          </>)}/>
    </>);
};
//# sourceMappingURL=edit-event-form.js.map