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
  id: number
  title: string
  description: string
  events: Event[]
  // eslint-disable-next-line camelcase
  created_at: string
  // eslint-disable-next-line camelcase
  updated_at: string
}

export type GetTimelinesResult = { kind: "ok"; timelines: Timeline[] } | GeneralApiProblem
export type GetTimelineResult = { kind: "ok"; timelines: Timeline } | GeneralApiProblem

/**
 * Event
 */
export interface Event {
  id: number
  title: string
  description: string
  timeline: number
  // eslint-disable-next-line camelcase
  created_at: string
  // eslint-disable-next-line camelcase
  updated_at: string
}

export type GetEventsResult = { kind: "ok"; events: Event[] } | GeneralApiProblem
export type GetEventResult = { kind: "ok"; event: Event } | GeneralApiProblem
