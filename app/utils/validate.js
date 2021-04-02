import { contains } from "ramda"
const ValidateJS = require("validate.js")
// HACK(steve): wierd typescript situation because of strange typings
const Validate = ValidateJS.default ? ValidateJS.default : ValidateJS
/**
 * Validates that 1 attribute doesn't appear in another's attributes content.
 */
Validate.validators.excludes = function custom(value, options, key, attributes) {
  const list = attributes[options.attribute] || []
  if (value && contains(value, list)) {
    return options.message || `${value} is in the list`
  }
}
/**
 * Validates that another attribute isn't true.
 */
Validate.validators.tripped = function custom(value, options, key, attributes) {
  if (value && attributes[options.attribute] === true) {
    return options.message || `${options.attribute} is true`
  }
}
/**
 * Runs the given rules against the data object.
 *
 * @param rules The rules to apply.
 * @param data The object to validate.
 */
export function validate(rules, data) {
  if (typeof data !== "object") {
    return {}
  }
  return Validate(data, rules, { fullMessages: false }) || {}
}
//# sourceMappingURL=validate.js.map
