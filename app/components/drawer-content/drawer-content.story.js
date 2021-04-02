import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import { StoryScreen, Story, UseCase } from "../../../storybook/views";
import { DrawerContent } from "./drawer-content";
storiesOf("DrawerContent", module)
    .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
    .add("Style Presets", () => (<Story>
      <UseCase text="Primary" usage="The primary.">
        <DrawerContent text="DrawerContent"/>
      </UseCase>
    </Story>));
//# sourceMappingURL=drawer-content.story.js.map