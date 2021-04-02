import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { AddEventForm } from "./add-event-form"
storiesOf("AddEventForm", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <AddEventForm text="AddEventForm" />
      </UseCase>
    </Story>
  ))
//# sourceMappingURL=add-event-form.story.js.map
