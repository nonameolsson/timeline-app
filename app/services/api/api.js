import { create } from "apisauce";
import { getGeneralApiProblem } from "./api-problem";
import { DEFAULT_API_CONFIG } from "./api-config";
/**
 * Manages all requests to the API.
 */
export class Api {
    /**
     * Creates the api.
     *
     * @param config The configuration to use.
     */
    constructor(config = DEFAULT_API_CONFIG) {
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
    async getUsers() {
        // make the api call
        const response = await this.apisauce.get(`/users`);
        // the typical ways to die when calling an api
        if (!response.ok) {
            const problem = getGeneralApiProblem(response);
            if (problem)
                return problem;
        }
        // transform the data into the format we are expecting
        try {
            const data = response.data;
            return { kind: "ok", data };
        }
        catch {
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
    async getUser(id) {
        // make the api call
        const response = await this.apisauce.get(`/users/${id}`);
        // the typical ways to die when calling an api
        if (!response.ok) {
            const problem = getGeneralApiProblem(response);
            if (problem)
                return problem;
        }
        // transform the data into the format we are expecting
        try {
            const data = response.data;
            return { kind: "ok", data };
        }
        catch {
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
    async login(identifier, password) {
        // make the api call
        const response = await this.apisauce.post(`/auth/local`, {
            identifier,
            password,
        });
        // the typical ways to die when calling an api
        if (!response.ok) {
            const problem = getGeneralApiProblem(response);
            if (problem)
                return problem;
        }
        // transform the data into the format we are expecting
        try {
            const data = response.data;
            return { kind: "ok", data };
        }
        catch {
            return { kind: "bad-data" };
        }
    }
    /**
     * Gets a list of all timelines.
     *
     * @returns {Promise<Types.GetTimelinesResult>}
     * @memberof Api
     */
    async getAllTimelines() {
        // make the api call
        const response = await this.apisauce.get(`/timelines`);
        // the typical ways to die when calling an api
        if (!response.ok) {
            const problem = getGeneralApiProblem(response);
            if (problem)
                return problem;
        }
        // transform the data into the format we are expecting
        try {
            const data = response.data;
            return { kind: "ok", data };
        }
        catch {
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
    async getTimelinesByUser(id) {
        // make the api call
        const response = await this.apisauce.get(`/timelines/?user.id=${id}`);
        // the typical ways to die when calling an api
        if (!response.ok) {
            const problem = getGeneralApiProblem(response);
            if (problem)
                return problem;
        }
        // transform the data into the format we are expecting
        try {
            const data = response.data;
            return { kind: "ok", data };
        }
        catch {
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
    async createTimeline(data) {
        // make the api call
        const response = await this.apisauce.post(`/timelines`, data);
        // the typical ways to die when calling an api
        if (!response.ok) {
            const problem = getGeneralApiProblem(response);
            if (problem)
                return problem;
        }
        // transform the data into the format we are expecting
        try {
            const data = response.data;
            return { kind: "ok", data };
        }
        catch {
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
    async updateTimeline(data, id) {
        // make the api call
        const response = await this.apisauce.put(`/timelines/${id}`, data);
        // the typical ways to die when calling an api
        if (!response.ok) {
            const problem = getGeneralApiProblem(response);
            if (problem)
                return problem;
        }
        // transform the data into the format we are expecting
        try {
            const data = response.data;
            return { kind: "ok", data };
        }
        catch {
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
    async deleteTimeline(id) {
        // make the api call
        const response = await this.apisauce.delete(`/timelines/${id}`);
        // the typical ways to die when calling an api
        if (!response.ok) {
            const problem = getGeneralApiProblem(response);
            if (problem)
                return problem;
        }
        // transform the data into the format we are expecting
        try {
            const data = response.data;
            return { kind: "ok", data };
        }
        catch {
            return { kind: "bad-data" };
        }
    }
    /**
     * Gets a list of all events.
     *
     * @returns {Promise<Types.GetEventsResult>}
     * @memberof Api
     */
    async getEvents() {
        // make the api call
        const response = await this.apisauce.get(`/events`);
        // the typical ways to die when calling an api
        if (!response.ok) {
            const problem = getGeneralApiProblem(response);
            if (problem)
                return problem;
        }
        // transform the data into the format we are expecting
        try {
            const data = response.data;
            return { kind: "ok", data };
        }
        catch {
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
    async createEvent(data) {
        // make the api call
        const response = await this.apisauce.post(`/events`, { ...data });
        // the typical ways to die when calling an api
        if (!response.ok) {
            const problem = getGeneralApiProblem(response);
            if (problem)
                return problem;
        }
        // transform the data into the format we are expecting
        try {
            const data = response.data;
            return { kind: "ok", data };
        }
        catch {
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
    async updateEvent(data, id) {
        // make the api call
        const response = await this.apisauce.put(`/events/${id}`, data);
        // the typical ways to die when calling an api
        if (!response.ok) {
            const problem = getGeneralApiProblem(response);
            if (problem)
                return problem;
        }
        // transform the data into the format we are expecting
        try {
            const data = response.data;
            return { kind: "ok", data };
        }
        catch {
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
    async deleteEvent(id) {
        // make the api call
        const response = await this.apisauce.delete(`/events/${id}`);
        // the typical ways to die when calling an api
        if (!response.ok) {
            const problem = getGeneralApiProblem(response);
            if (problem)
                return problem;
        }
        // transform the data into the format we are expecting
        try {
            const data = response.data;
            return { kind: "ok", data };
        }
        catch {
            return { kind: "bad-data" };
        }
    }
}
//# sourceMappingURL=api.js.map