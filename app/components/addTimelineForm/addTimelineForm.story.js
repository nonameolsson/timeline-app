import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import { StoryScreen, Story, UseCase } from "../../../storybook/views";
import { AddTimelineForm } from "./addTimelineForm";
storiesOf("AddTimelineForm", module)
    .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
    .add("Style Presets", () => (<Story>
      <UseCase text="Primary" usage="The primary.">
        <AddTimelineForm text="AddTimelineForm"/>
      </UseCase>
    </Story>));
//# sourceMappingURL=addTimelineForm.story.js.map