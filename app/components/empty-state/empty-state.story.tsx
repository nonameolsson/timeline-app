import * as React from "react"
import { storiesOf } from "@storybook/react-native"

import { Story, StoryScreen, UseCase } from "../../../storybook/views"

import { EmptyState } from "./empty-state"

declare let module

storiesOf("EmptyState", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <EmptyState title="EmptyState" description="Description" />
      </UseCase>
    </Story>
  ))
