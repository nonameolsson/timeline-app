import * as React from 'react'
import { storiesOf } from '@storybook/react-native'

import { Story, StoryScreen, UseCase } from '../../../storybook/views'

import { MaterialHeaderButtons } from './material-header-button'

declare let module

storiesOf('HeaderButton', module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add('Style Presets', () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <MaterialHeaderButtons text="HeaderButton" />
      </UseCase>
    </Story>
  ))
