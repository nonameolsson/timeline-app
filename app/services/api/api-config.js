// Use this import if you want to use "env.js" file
const { API_URL } = require("../../config/env")
/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG = {
  url: API_URL || "https://jsonplaceholder.typicode.com",
  timeout: 10000,
}
//# sourceMappingURL=api-config.js.map
