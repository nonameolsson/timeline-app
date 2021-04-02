import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { EventForm } from "./event-form"
storiesOf("EventForm", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <EventForm />
      </UseCase>
    </Story>
  ))
//# sourceMappingURL=event-form.story.js.map
