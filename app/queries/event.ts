import gql from "graphql-tag"

export const GET_EVENT = gql`
  query getEvent($id: ID) {
    event(id:$id) {
      id
      title
      description
    }
  }
`

export const CREATE_EVENT = gql`
  mutation createEvent($event: createEventInput) {
    createEvent(input: $event) {
      event {
        id
        created_at
      }
    }
  }
`

export const UPDATE_EVENT = gql`
  mutation updateEvent($event: updateEventInput) {
    updateEvent(input: $event) {
      event {
        id
        created_at
      }
    }
  }
`

export const DELETE_EVENT = gql`
  mutation deleteEvent($event: deleteEventInput) {
    deleteEvent(input: $event) {
      event {
        id
        updated_at
      }
    }
  }
`

export const GET_ALL_EVENTS = gql`
  query {
    events {
      id
      title
      description
    }
  }
`
