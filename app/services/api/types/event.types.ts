/* eslint-disable camelcase */
import { GeneralApiProblem } from '../api-problem'

interface EventTimeline {
  id: number
  title: string
  description: string | null
  user: number
  date: string
  created_at: string
  updated_at: string
}

export interface EventResponse {
  id: number
  title: string
  description: string | null
  timeline: EventTimeline | null
  url: string | null
  created_at: string
  updated_at: string
  date: string
}

export interface EventRequest {
  title: string
  description: string | null
  timeline: number
  date: string
  url: string | null
}

export type GetEventsResult = { kind: 'ok'; data: EventResponse[] } | GeneralApiProblem
export type GetEventResult = { kind: 'ok'; data: EventResponse } | GeneralApiProblem
export type PostEventResult = { kind: 'ok'; data: EventResponse } | GeneralApiProblem
export type PutEventResult = { kind: 'ok'; data: EventResponse } | GeneralApiProblem
export type DeleteEventResult = { kind: 'ok'; data: EventResponse } | GeneralApiProblem
