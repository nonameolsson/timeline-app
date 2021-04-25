import { ApiResponse, ApisauceInstance, create } from "apisauce";

import * as Types from "./api.types";
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config";
import { getGeneralApiProblem } from "./api-problem";

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce!: ApisauceInstance;

  /**
   * Configurable options.
   */
  config: ApiConfig;

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
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
    });
  }

  /**
   * Gets a list of users.
   *
   * @returns {Promise<Types.GetUsersResult>}
   * @memberof Api
   */
  async getUsers(): Promise<Types.GetUsersResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users`);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    // transform the data into the format we are expecting
    try {
      const { data } = response;

      return { kind: "ok", data };
    } catch {
      return { kind: "bad-data" };
    }
  }

  /**
   * Gets a single user by ID
   *
   * @param {number} id ID of user
   *
   * @returns {Promise<Types.GetUserResult>}
   * @memberof Api
   */
  async getUser(id: number): Promise<Types.GetUserResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users/${id}`);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    // transform the data into the format we are expecting
    try {
      const { data } = response;

      return { kind: "ok", data };
    } catch {
      return { kind: "bad-data" };
    }
  }

  /**
   * Login a user with identifier and password
   *
   * @param {string} identifier Could be something like e-mail or username
   * @param {string} password The password used to login
   *
   * @returns {Promise<Types.PostLoginResult>}
   * @memberof Api
   */
  async login(
    identifier: string,
    password: string
  ): Promise<Types.PostLoginResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post(`/auth/local`, {
      identifier,
      password,
    });

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    // transform the data into the format we are expecting
    try {
      const { data } = response;

      return { kind: "ok", data };
    } catch {
      return { kind: "bad-data" };
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
    const response: ApiResponse<any> = await this.apisauce.get(`/timelines`);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    // transform the data into the format we are expecting
    try {
      const { data } = response;

      return { kind: "ok", data };
    } catch {
      return { kind: "bad-data" };
    }
  }

  /**
   * Get all timelines for a specific user.
   *
   * @param id {number} ID of the user used to retrieve all timelines
   *
   * @returns {Promise<Types.GetTimelinesResult>}
   * @memberof Api
   */
  async getTimelinesByUser(id: number): Promise<Types.GetTimelinesResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(
      `/timelines/?user.id=${id}`
    );

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    // transform the data into the format we are expecting
    try {
      const { data } = response;

      return { kind: "ok", data };
    } catch {
      return { kind: "bad-data" };
    }
  }

  /**
   * Create a new timeline
   *
   * @param data {Types.PostTimelineRequest} Data used to create a new timeline
   *
   * @returns {Promise<Types.PostTimelineResult>}
   * @memberof Api
   */
  async createTimeline(
    data: Types.PostTimelineRequest
  ): Promise<Types.PostTimelineResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post(
      `/timelines`,
      data
    );

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    // transform the data into the format we are expecting
    try {
      const { data } = response;

      return { kind: "ok", data };
    } catch {
      return { kind: "bad-data" };
    }
  }

  /**
   * Update a specific timeline
   *
   * @param data {Types.PutTimelineRequest} Data used to updated existing timeline
   * @param id {number} ID the timeline to update
   *
   * @returns {Promise<Types.PutTimelineResult>}
   * @memberof Api
   */
  async updateTimeline(
    data: Types.PutTimelineRequest,
    id: number
  ): Promise<Types.PutTimelineResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.put(
      `/timelines/${id}`,
      data
    );

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    // transform the data into the format we are expecting
    try {
      const { data } = response;

      return { kind: "ok", data };
    } catch {
      return { kind: "bad-data" };
    }
  }

  /**
   * Delete a timeline
   *
   * @param id {number} ID of timeline to delete
   *
   * @returns {Promise<Types.DeleteTimelinesResult>}
   * @memberof Api
   */
  async deleteTimeline(id: number): Promise<Types.DeleteTimelineResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.delete(
      `/timelines/${id}`
    );

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    // transform the data into the format we are expecting
    try {
      const { data } = response;

      return { kind: "ok", data };
    } catch {
      return { kind: "bad-data" };
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
    const response: ApiResponse<any> = await this.apisauce.get(`/events`);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    // transform the data into the format we are expecting
    try {
      const { data } = response;

      return { kind: "ok", data };
    } catch {
      return { kind: "bad-data" };
    }
  }

  /**
   * Create an event
   *
   * @param data {Types.EventRequest} The new event to create
   *
   * @returns {Promise<Types.PutEventResult>}
   * @memberof Api
   */
  async createEvent(data: Types.EventRequest): Promise<Types.PostEventResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post(`/events`, {
      ...data,
    });

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    // transform the data into the format we are expecting
    try {
      const { data } = response;

      return { kind: "ok", data };
    } catch {
      return { kind: "bad-data" };
    }
  }

  /**
   * Update a specific event
   *
   * @param data {Types.EventRequest} New data used to update existing event
   * @param id {number} ID of the event to update
   *
   * @returns {Promise<Types.PutEventResult>}
   * @memberof Api
   */
  async updateEvent(
    data: Types.EventRequest,
    id: number
  ): Promise<Types.PutEventResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.put(
      `/events/${id}`,
      data
    );

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    // transform the data into the format we are expecting
    try {
      const { data } = response;

      return { kind: "ok", data };
    } catch {
      return { kind: "bad-data" };
    }
  }

  /**
   * Delete a event
   * @param id {number} ID of event to delete
   *
   * @returns {Promise<Types.DeleteEventResult>}
   * @memberof Api
   */
  async deleteEvent(id: number): Promise<Types.DeleteEventResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.delete(
      `/events/${id}`
    );

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    // transform the data into the format we are expecting
    try {
      const { data } = response;

      return { kind: "ok", data };
    } catch {
      return { kind: "bad-data" };
    }
  }
}
