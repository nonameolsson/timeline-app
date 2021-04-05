import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StoryScreen, Story, UseCase } from '../../../storybook/views'
import { EditTimelineForm } from './edit-timeline-form'

declare let module

storiesOf('EditTimelineForm', module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add('Style Presets', () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <EditTimelineForm text="EditTimelineForm" />
      </UseCase>
    </Story>
  ))
