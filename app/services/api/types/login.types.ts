/* eslint-disable camelcase */
import { GeneralApiProblem } from '../api-problem'

interface UserClassRole {
  id: number
  name: string
  description: string
  type: string
}

interface UserClassTimeline {
  id: number
  title: string
  description: string
  user: number
  created_at: string
  updated_at: string
}

export interface PostLoginRequest {
  identifier: string
  password: string
}

export interface PostLoginResponse {
  jwt: string
  user: UserClass
}

interface UserClass {
  id: number
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  role: UserClassRole
  created_at: string
  updated_at: string
  timelines: UserClassTimeline[]
}

export type PostLoginResult = { kind: 'ok'; data: PostLoginResponse } | GeneralApiProblem
