/* eslint-disable camelcase */
import { GeneralApiProblem } from "../api-problem"

export interface EventResponse {
  id: number
  title: string
  description: string | null
  timeline: EventTimeline | null
  url: string | null
  created_at: string
  updated_at: string
}

export interface EventRequest {
  title: string
  description: string | null
  timeline: number
  url: string | null
}

interface EventTimeline {
  id: number
  title: string
  description: string | null
  user: number
  created_at: string
  updated_at: string
}

export type GetEventsResult = { kind: "ok"; data: EventResponse[] } | GeneralApiProblem
export type GetEventResult = { kind: "ok"; data: EventResponse } | GeneralApiProblem
export type PostEventResult = { kind: "ok"; data: EventResponse } | GeneralApiProblem
export type PutEventResult = { kind: "ok"; data: EventResponse } | GeneralApiProblem
export type DeleteEventResult = { kind: "ok"; data: EventResponse } | GeneralApiProblem