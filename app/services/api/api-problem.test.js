import { getGeneralApiProblem } from "./api-problem"
test("handles connection errors", () => {
  expect(getGeneralApiProblem({ problem: "CONNECTION_ERROR" })).toEqual({
    kind: "cannot-connect",
    temporary: true,
  })
})
test("handles network errors", () => {
  expect(getGeneralApiProblem({ problem: "NETWORK_ERROR" })).toEqual({
    kind: "cannot-connect",
    temporary: true,
  })
})
test("handles timeouts", () => {
  expect(getGeneralApiProblem({ problem: "TIMEOUT_ERROR" })).toEqual({
    kind: "timeout",
    temporary: true,
  })
})
test("handles server errors", () => {
  expect(getGeneralApiProblem({ problem: "SERVER_ERROR" })).toEqual({
    kind: "server",
  })
})
test("handles unknown errors", () => {
  expect(getGeneralApiProblem({ problem: "UNKNOWN_ERROR" })).toEqual({
    kind: "unknown",
    temporary: true,
  })
})
test("handles unauthorized errors", () => {
  expect(getGeneralApiProblem({ problem: "CLIENT_ERROR", status: 401 })).toEqual({
    kind: "unauthorized",
  })
})
test("handles forbidden errors", () => {
  expect(getGeneralApiProblem({ problem: "CLIENT_ERROR", status: 403 })).toEqual({
    kind: "forbidden",
  })
})
test("handles not-found errors", () => {
  expect(getGeneralApiProblem({ problem: "CLIENT_ERROR", status: 404 })).toEqual({
    kind: "not-found",
  })
})
test("handles other client errors", () => {
  expect(getGeneralApiProblem({ problem: "CLIENT_ERROR", status: 418 })).toEqual({
    kind: "rejected",
  })
})
test("handles cancellation errors", () => {
  expect(getGeneralApiProblem({ problem: "CANCEL_ERROR" })).toBeNull()
})
//# sourceMappingURL=api-problem.test.js.map
