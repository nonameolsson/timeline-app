/* eslint-disable camelcase */

import { GeneralApiProblem } from "./api-problem"

export interface Role {
  id: number
  name: string
  description: string
  type: string
}

/**
 * USER
 */
export interface User {
  id: number
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  role: any
  createdAt: string
  updatedAt: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

/**
 * LOGIN
 */
export interface Login {
  jwt: string
  user: User
}

export type GetLoginResult = { kind: "ok"; data: Login } | GeneralApiProblem

/**
 * Timeline
 */
export interface Timeline {
  id: string
  title: string
  description: string
  events: Event[]
  created_at: string
  updated_at: string
}

export interface EventTimeline {
  id: number
  title: string
  description: string
  user: number
  created_at: string
  updated_at: string
}

export type GetTimelinesResult = { kind: "ok"; timelines: Timeline[] } | GeneralApiProblem
export type GetTimelineResult = { kind: "ok"; timelines: Timeline } | GeneralApiProblem

export type PutTimelineResult = { kind: "ok"; timeline: Timeline } | GeneralApiProblem

/**
 * Event
 */
export interface Event {
  id: string
  title: string
  description: string
  timeline: EventTimeline
  created_at: string
  updated_at: string
}

export interface TimelineEvent {
  id: string
  title: string
  description: string
  timeline: number
  created_at: string
  updated_at: string
}

export type GetEventsResult = { kind: "ok"; events: Event[] } | GeneralApiProblem
export type GetEventResult = { kind: "ok"; event: Event } | GeneralApiProblem
export type PutEventResult = { kind: "ok"; event: Event } | GeneralApiProblem
export type DeleteEventResult = { kind: "ok"; event: Event } | GeneralApiProblem
