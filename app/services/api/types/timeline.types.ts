/* eslint-disable camelcase */

import { GeneralApiProblem } from "../api-problem"

export interface GetTimelineResponse {
  id: number
  title: string
  description: string | null
  events: TimelineEvent[]
  created_at: string
  updated_at: string
  user: TimelineUser
}

export interface PostTimelineRequest {
  title: string
  description: string | null
  events: number[]
  user: number
}

export interface PostTimelineResponse {
  id: number
  title: string
  description: string | null
  user: TimelineUser
  created_at: string
  updated_at: string
  events: TimelineEvent[]
}

export interface PutTimelineRequest {
  title: string | null
  description: string | null
}

export interface PutTimelineResponse {
  id: number
  title: string | null
  description: string | null
  user: TimelineUser
  created_at: string
  updated_at: string
  events: Event[]
}

export interface DeleteTimelineResponse {
  id: number
  title: string
  description: string
  user: TimelineUser
  created_at: string
  updated_at: string
  events: TimelineEvent[]
}

interface TimelineEvent {
  id: number
  title: string
  description: string | null
  timeline: number
  url: null | string
  created_at: string
  updated_at: string
}

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

export type GetTimelinesResult = { kind: "ok"; data: GetTimelineResponse[] } | GeneralApiProblem
export type GetTimelineResult = { kind: "ok"; data: GetTimelineResponse } | GeneralApiProblem

export type PutTimelineResult = { kind: "ok"; data: PutTimelineResponse } | GeneralApiProblem
export type PostTimelineResult = { kind: "ok"; data: PostTimelineResponse } | GeneralApiProblem
export type DeleteTimelineResult = { kind: "ok"; data: DeleteTimelineResponse } | GeneralApiProblem
