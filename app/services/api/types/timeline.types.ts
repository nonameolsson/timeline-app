/* eslint-disable camelcase */

import { GeneralApiProblem } from "../api-problem"
import { EventResponse } from "./event.types"

/**
 * User in Timeline response
 */
interface TimelineUser {
  id: number
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  role: number
  created_at: string
  updated_at: string
}

export interface TimelineResponse {
  id: number
  title: string
  description: string
  events: EventResponse[]
  user: TimelineUser
  created_at: string
  updated_at: string
}

export interface PostTimelineRequest {
  title: string
  description: string | null
  events: number[]
  user: number
}

export interface PutTimelineRequest {
  title: string | null
  description: string | null
}

export interface DeleteTimelineResponse {
  id: number
  title: string
  description: string
  user: TimelineUser
  created_at: string
  updated_at: string
  events: EventResponse[]
}

export type GetTimelinesResult = { kind: "ok"; data: TimelineResponse[] } | GeneralApiProblem
export type GetTimelineResult = { kind: "ok"; data: TimelineResponse } | GeneralApiProblem

export type PutTimelineResult = { kind: "ok"; data: TimelineResponse } | GeneralApiProblem
export type PostTimelineResult = { kind: "ok"; data: TimelineResponse } | GeneralApiProblem
export type DeleteTimelineResult = { kind: "ok"; data: DeleteTimelineResponse } | GeneralApiProblem
