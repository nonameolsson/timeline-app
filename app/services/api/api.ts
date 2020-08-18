import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce!: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,

      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  /**
   * Gets a list of users.
   *
   * @returns {Promise<Types.GetUsersResult>}
   * @memberof Api
   */
  async getUsers(): Promise<Types.GetUsersResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertUser = raw => {
      return {
        id: raw.id,
        name: raw.name,
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawUsers = response.data
      const resultUsers: Types.User[] = rawUsers.map(convertUser)

      return { kind: "ok", users: resultUsers }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
 * Gets a single user by ID
 *
 * @param {number} id
 * @returns {Promise<Types.GetUserResult>}
 * @memberof Api
 */
  async getUser(id: number): Promise<Types.GetUserResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users/${id}`, {}, { headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTk0MjE2ODE2LCJleHAiOjE1OTY4MDg4MTZ9.LuPgVDDzBrJsHyxJ39RPeq_7qf900rxtb8Hr4Vc7NqY' } })

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultUser: Types.User = {
        id: response.data.id,
        email: response.data.email,
        username: response.data.username,
        blocked: response.data.blocked,
        confirmed: response.data.confirmed,
        createdAt: response.data.created_at,
        updatedAt: response.data.updated_at,
        provider: response.data.provider,
        role: response.data.role,
      }

      return { kind: "ok", user: resultUser }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
 * Login a user with identifier and password
 *
 * @param {string} identifier Could be something like e-mail or username
 * @param {string} password The password used to login
 * @returns {Promise<Types.GetLoginResult>}
 * @memberof Api
 */
  async login(identifier: string, password: string): Promise<Types.GetLoginResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post(`/auth/local`, { identifier, password })

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawLogin: Types.Login = {
        jwt: response.data.jwt,
        user: {
          id: response.data.user.id,
          email: response.data.user.email,
          username: response.data.user.username,
          blocked: response.data.user.blocked,
          confirmed: response.data.user.confirmed,
          createdAt: response.data.user.created_at,
          updatedAt: response.data.user.updated_at,
          provider: response.data.user.provider,
          role: response.data.user.role,
        }
      }

      return { kind: "ok", data: rawLogin }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Gets a list of all timelines.
   *
   * @returns {Promise<Types.GetTimelinesResult>}
   * @memberof Api
   */
  async getAllTimelines(): Promise<Types.GetTimelinesResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/timelines`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertTimeline = raw => {
      return {
        id: raw.id,
        title: raw.title,
        description: raw.description
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawTimelines = response.data
      const resultTimelines: Types.Timeline[] = rawTimelines.map(convertTimeline)

      return { kind: "ok", timelines: resultTimelines }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Get all timelines for a specific user.
   *
   * @param {number} userId
   * @returns {Promise<Types.GetTimelinesResult>}
   * @memberof Api
   */
  async getTimelinesByUser(userId: number): Promise<Types.GetTimelinesResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/timelines/?user.id=${userId}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawTimelines = response.data

      return { kind: "ok", timelines: rawTimelines }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Create a new timeline
   *
   * @returns {Promise<Types.PostTimelineResult>}
   * @memberof Api
   */
  async createTimeline(timeline: { title: string, description?: string }): Promise<Types.PostTimelineResult> { // TODO: Add correct type for timeline
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post(`/timelines`, timeline)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultTimeline: Types.Timeline = response.data

      return { kind: "ok", timeline: resultTimeline }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Update a specific timeline
   *
   * @returns {Promise<Types.PutTimelineResult>}
   * @memberof Api
   */
  async updateTimeline(timeline: { id: string, title: string, description: string }): Promise<Types.PutTimelineResult> { // TODO: Add correct type for timeline
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.put(`/timelines/${timeline.id}`, timeline)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultTimeline: Types.Timeline = response.data

      return { kind: "ok", timeline: resultTimeline }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Delete a timeline
   *
   * @returns {Promise<Types.deleteTimelinesResult>}
   * @memberof Api
   */
  async deleteTimeline(timelineId: string): Promise<Types.DeleteTimelineResult> { // TODO: Add correct type for timeline
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.delete(`/timelines/${timelineId}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultTimeline: Types.Timeline = response.data

      return { kind: "ok", timeline: resultTimeline }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Gets a list of all events.
   *
   * @returns {Promise<Types.GetEventsResult>}
   * @memberof Api
   */
  async getEvents(): Promise<Types.GetEventsResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/events`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawEvents = response.data
      // const resultEvents: Types.Event[] = rawEvents.map(convertEvent)

      return { kind: "ok", events: rawEvents }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Update a specific event
   *
   * @returns {Promise<Types.PutEventResult>}
   * @memberof Api
   */
  async updateEvent(event: { id: string, title: string, description: string }): Promise<Types.PutEventResult> { // TODO: Add correct type for event
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.put(`/events/${event.id}`, event)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultEvent: Types.Event = response.data

      return { kind: "ok", event: resultEvent }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Update a specific event
   *
   * @returns {Promise<Types.DeleteEventResult>}
   * @memberof Api
   */
  async deleteEvent(id: string): Promise<Types.DeleteEventResult> { // TODO: Add correct type for event
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.delete(`/events/${id}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultEvent: Types.Event = response.data

      return { kind: "ok", event: resultEvent.id.toString() }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
