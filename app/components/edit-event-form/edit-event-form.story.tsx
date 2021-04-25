import * as React from "react";
import { storiesOf } from "@storybook/react-native";

import { Story, StoryScreen, UseCase } from "../../../storybook/views";

import { EditEventForm } from "./edit-event-form";

declare let module;

storiesOf("EditEventForm", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <EditEventForm text="EditEventForm" />
      </UseCase>
    </Story>
  ));
