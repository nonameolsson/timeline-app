import * as React from "react"
import { storiesOf } from "@storybook/react-native"

import { Story, StoryScreen, UseCase } from "../../../storybook/views"

import { AddEventForm } from "./add-event-form"

declare const module

storiesOf("EventForm", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <AddEventForm />
      </UseCase>
    </Story>
  ))
