/**
 * Inspired by https://redux.js.org/recipes/usage-with-typescript/
 */

export const DELETE_TIMELINE = "DELETE_TIMELINE"
export const EDIT_TIMELINE = "EDIT_TIMELINE"
export const EDIT_EVENT = "EDIT_EVENT"
export const DELETE_EVENT = "DELETE_EVENT"

export interface Timeline {
  id: string
  title: string
  description: string
}

export interface Event {
  // eslint-disable-next-line camelcase
  created_at: string
  // eslint-disable-next-line camelcase
  updated_at: string
  id: string
  title: string
  description?: string
  url?: string
  timeline: string
}

export interface EditTimelineAction {
  type: typeof EDIT_TIMELINE
  payload: Timeline
}

export interface DeleteTimelineAction {
  type: typeof DELETE_TIMELINE
  meta: {
    id: string
  }
}

export interface EditEventAction {
  type: typeof EDIT_EVENT
  payload: Event
}

export interface DeleteEventAction {
  type: typeof DELETE_EVENT
  meta: {
    id: string
  }
}

/**
 * Actions to perform after navigation.
 *
 * Actions passed as navigation params. This is used at the screen after navigation to perform some actions like API requests.
 *
 * Example:
 * ```typescript
 * const herp = undefined
 * ```
 *
 */
// type NavigationActions = DeleteTimeline | DeleteEvent
