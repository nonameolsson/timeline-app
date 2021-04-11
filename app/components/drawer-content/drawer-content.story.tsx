import * as React from 'react'
import { storiesOf } from '@storybook/react-native'

import { Story, StoryScreen, UseCase } from '../../../storybook/views'

import { DrawerContent } from './drawer-content'

declare let module

storiesOf('DrawerContent', module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add('Style Presets', () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <DrawerContent text="DrawerContent" />
      </UseCase>
    </Story>
  ))
