import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { TopBar } from "./top-bar"
storiesOf("TopBar", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <TopBar text="TopBar" />
      </UseCase>
    </Story>
  ))
//# sourceMappingURL=top-bar.story.js.map
