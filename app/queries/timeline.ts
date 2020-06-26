import gql from "graphql-tag"

export const GET_TIMELINE = gql`
  query getTimeline($id:ID!) {
    timeline(id:$id) {
      id
      title
    }
  }
`

export const CREATE_TIMELINE = gql`
  mutation createTimeline($timeline: createTimelineInput) {
    createTimeline(input: $timeline) {
      timeline {
        id
        created_at
      }
    }
  }
`

export const UPDATE_TIMELINE = gql`
  mutation updateTimeline($timeline: updateTimelineInput) {
    updateTimeline(input: $timeline) {
      timeline {
        id
        updated_at
      }
    }
  }
`

export const DELETE_TIMELINE = gql`
  mutation deleteTimeline($timeline: deleteTimelineInput) {
    deleteTimeline(input: $timeline) {
      timeline {
        id
        updated_at
      }
    }
  }
`

export const GET_ALL_TIMELINES = gql`
  query {
    timelines {
      id
      title
    }
  }
`
