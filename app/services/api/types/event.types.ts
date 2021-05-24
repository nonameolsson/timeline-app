/* eslint-disable camelcase */
import { GeneralApiProblem } from "../api-problem"

interface EventTimeline {
  id: number
  title: string
  description: string
  user: number
  date: string
  created_at: string
  updated_at: string
}

/**
 * Response data after creating or retrieving an event
 */
export interface EventResponse {
  id: number
  title: string
  description: string
  timeline: EventTimeline | null
  url: string | null
  startDate: string
  endDate: string | null
  startBC: boolean
  endBC: boolean
  updated_at: string
  created_at: string
}

/**
 * Request for creating a new event
 */
export interface EventRequest {
  description: string | null
  endDate: string | null
  endBC: boolean | null
  startDate: string
  startBC: boolean
  timeline: number
  title: string
  url: string | null
}

export type GetEventsResult = { kind: "ok"; data: EventResponse[] } | GeneralApiProblem
export type GetEventResult = { kind: "ok"; data: EventResponse } | GeneralApiProblem
export type PostEventResult = { kind: "ok"; data: EventResponse } | GeneralApiProblem
export type PutEventResult = { kind: "ok"; data: EventResponse } | GeneralApiProblem
export type DeleteEventResult = { kind: "ok"; data: EventResponse } | GeneralApiProblem
