# Design Decisions

Every architectural choice in this framework is deliberate, explainable, and follows real-world QA engineering standards. This document captures the "why" behind each decision.

---

## 1. Locators Layer Separate from Page Objects

**Decision:** Selectors live in dedicated `Locators` files, never inside Page Object methods or test files.

**Why:** Selectors are the most frequently changing part of a UI test suite. When the frontend team renames a class or changes a component structure, the fix is a single-line change in one Locators file. Page Object business logic and test assertions are never touched. This also means a non-technical team member can update a selector without reading POM code.

**Alternative considered:** Inline selectors in Page Objects (common in smaller projects). Rejected because it couples test logic to UI structure, violating Single Responsibility Principle.

---

## 2. Fixture Factory Pattern (`dso.fixtures.js`)

**Decision:** Test data is exported as named scenario groups (`validScenarios`, `bulkRangeScenarios`, `invalidScenarios`, `edgeCases`) from a `.js` file using ES module exports, not flat JSON.

**Why:**
- **Self-documenting:** `forEach(scenario => ...)` loops in tests read like English — "for each valid scenario, do X"
- **Extensible:** Adding a new scenario is a single array entry, not a structural change
- **Typed offsets:** Date offsets are co-located with the scenario data, making conflicts immediately visible in one file
- **Computed values:** `.js` allows computed properties (e.g., dynamic dates) that flat JSON cannot express

**Alternative considered:** Flat JSON fixtures (`cy.fixture()`). Rejected because JSON cannot compute values, export named groups, or provide JSDoc context.

---

## 3. Fresh Login Per Test Over `cy.session()` Caching

**Decision:** Every test gets a full `cy.login()` in `beforeEach` and a full `cy.logout()` in `afterEach`. No session caching with `cy.session()`.

**Why:** For this suite size (~14 tests), the login overhead per test is negligible (~2-3 seconds). What we gain:

| Benefit | Explanation |
|---|---|
| **True independence** | A test failure can never be caused by state leaked from a previous test |
| **Parallelization readiness** | Each Cypress worker gets its own browser with a clean login — no session coordination |
| **Simpler debugging** | The state at the start of every test is always identical and known |
| **Simpler code** | `beforeEach` is one line, no `validate()` hooks, no selective teardown |

**When to upgrade:** `cy.session()` is the right optimization when the suite grows large enough that re-login latency becomes a bottleneck across hundreds of tests. At that point, it is a one-line change to `cy.login()`. We are not unaware of it — we made a conscious tradeoff for correctness and parallelization over micro-optimization.

---

## 4. Named Endpoint Aliasing Instead of Global Network Settling

**Decision:** We alias specific DSO-related endpoints (`@dsoSave`, `@calendarLoad`, `@searchResults`) and wait on them individually, rather than implementing a "wait for all network traffic to stop" command.

**Why:** A global network settler is a flakiness trap. If the application has:
- Analytics pings (Google Analytics, Mixpanel)
- Polling requests (real-time price updates)
- WebSocket heartbeats
- Background health checks

...a "wait for idle" approach will timeout constantly, producing failures that have nothing to do with the feature under test.

Named aliases give us:
- **Precision** — we wait only for the operations we triggered
- **Reliability** — background traffic is irrelevant
- **Readability** — `cy.waitForDSOSave()` is self-documenting
- **Debug-ability** — Cypress command log shows exactly which alias was waited on

---

## 5. Drag-and-Drop Fallback Ladder

**Decision:** Start with Level 1 (native Cypress `.drag()`), escalate to Level 2 (`@4tw/cypress-drag-drop` plugin) only if Level 1 fails, and Level 3 (manual trigger chain) only if Level 2 fails.

**Why:** Cypress drag-and-drop behaviour depends entirely on how the target application handles DOM events (HTML5 drag API vs pointer events vs custom handlers). Starting at the simplest approach:
- Keeps code readable and maintainable
- Avoids over-engineering for a problem that might not exist
- Makes the implementation easy to understand and defend
- Each level is documented with clear escalation criteria

**Anti-pattern avoided:** Jumping straight to Level 3 (manual trigger chain) because it "looks more thorough." Level 3 is harder to read, harder to debug, and couples the test to specific event types that may not match the app's implementation.

---

## 6. `ApiClient` Class Mirrors REST Resource Structure

**Decision:** All `cy.request()` calls live inside an `ApiClient` class with methods named after REST operations (`getDSO()`, `updateDSO()`, `deleteDSO()`).

**Why:**
- **Readability** — API test files read like English: `apiClient.updateDSO(payload).then(response => ...)`
- **Single source of truth** — auth header logic, base URL, and `failOnStatusCode: false` live in one place
- **Token override support** — expired token tests pass a `tokenOverride` without touching the default auth flow
- **No raw `cy.request()` in tests** — this is a non-negotiable architectural rule; `ApiClient` enforces it

---

## 7. `cy.intercept()` Mocking for Negative Tests

**Decision:** For the "API returns 500" negative test, we mock the response with `cy.intercept()` rather than needing a broken backend.

**Why:**
- **Stable** — mock responses are deterministic; no flaky dependencies on backend state
- **Reproducible** — the test produces the same result every time, in any environment
- **Independent** — no need for backend access, test-specific API endpoints, or database manipulation
- **Fast** — no actual network call needed

---

## 8. Date Offset Strategy for Test Isolation

**Decision:** Each test targets a unique future date offset (e.g., test A writes to `today + 3`, test B writes to `today + 5`). Offsets are centralised in `dso.fixtures.js`.

**Why:** UI tests that write DSO values mutate application data on the server. We cannot roll this back without backend access. Instead:
- Each test writes to a unique date, so tests never read each other's data
- Offset assignments are in one file — conflicts are immediately visible
- No test-order dependencies
- No database cleanup required (which would need backend access we may not have)

---

## 9. Mochawesome Over Cypress Cloud

**Decision:** Use `cypress-mochawesome-reporter` for test reporting instead of Cypress Cloud (Dashboard).

**Why:**
- **No account or billing dependency** for a standalone submission
- **Self-contained** — produces an HTML report with embedded screenshots that can be opened in any browser
- **Portable** — the report directory can be uploaded as a CI artifact
- **Charts and metrics** — visual pass/fail charts out of the box
- **Native integration** — `cypress-mochawesome-reporter` hooks into Cypress's test lifecycle with minimal config

---

## 10. `DECISIONS.md` Alongside `README.md`

**Decision:** Maintain a dedicated file documenting architecture choices, separate from the README.

**Why:** The README covers "how to use" — setup, running tests, folder structure. This file covers "why it's built this way." Separating them:
- Signals that I can articulate design decisions, not just write tests
- Makes decisions searchable and reviewable independently
- Provides a reference during the interview defense
- Follows the principle that code should document *what* and *how*, while architecture docs document *why*

---

## 11. Global `afterEach` Screenshot vs Per-Spec Logout

**Decision:** The global `afterEach` in `e2e.js` captures failure screenshots. The per-spec `afterEach` handles `cy.logout()`.

**Why:** API test specs (`dso-api.cy.js`) run `cy.request()` calls with token auth — there is no browser session to clear. Calling `cy.clearCookies()` after an API test is a no-op and adds noise. By keeping logout in each UI spec's own `afterEach`, we avoid unnecessary commands in API tests while still getting universal failure screenshots.
