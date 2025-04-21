# OpenCred Equivalency API Documentation

This document outlines the API endpoints for requesting and retrieving course equivalency evaluations.

## Base URL

All API endpoints are relative to the server's base URL. The evaluations routes are mounted under `/evaluations`.

Example: `http://your-server-address/api/evaluations`

_(Note: The exact base URL might differ based on deployment configuration. The `/api` prefix might or might not be present depending on how the main server (`server.js` or `server/src/index.ts`) mounts the routers.)_

---

## Endpoints

### 1. Create Evaluation Request

Initiates a new request for an equivalency evaluation.

- **Endpoint:** `POST /requests`
- **Description:** Submits details for a new evaluation request. The system will process this request asynchronously.
- **Request Body:** `application/json`

  ```json
  {
    "studentId": "string",      // ID of the student associated with this request
    "evaluationType": "string", // Type of evaluation (e.g., "COURSE_EQUIVALENCY")
    "institution": "string",    // Name of the institution where courses were taken
    "countryCode": "string",    // ISO code of the country (e.g., "US", "CA")
    "program": "string"         // Name of the program/degree pursued
  }
  ```

- **Response (Success 201 Created):** `application/json` - Returns the created `EvaluationRequest` object.

  ```json
  {
    "id": "uuid-string", // Unique ID for this evaluation request
    "studentId": "string",
    "status": "SUBMITTED", // Initial status
    "submittedAt": "datetime-string",
    "evaluationType": "string",
    "institution": "string",
    "countryCode": "string",
    "program": "string",
    "createdAt": "datetime-string",
    "updatedAt": "datetime-string"
  }
  ```

- **Response (Error 500):**

  ```json
  {
    "error": "Failed to create evaluation request"
  }
  ```

### 2. Get Evaluation Request Status

Retrieves the details and current status of a specific evaluation request.

- **Endpoint:** `GET /requests/:id`
- **Description:** Fetches an evaluation request by its unique ID.
- **URL Parameters:**
  - `id` (string, required): The unique ID of the evaluation request.
- **Response (Success 200 OK):** `application/json` - Returns the full `EvaluationRequest` object, including related data like student info, documents, and country rules.

  ```json
  {
    "id": "uuid-string",
    "studentId": "string",
    "status": "string (Enum: SUBMITTED, AI_PROCESSING, HUMAN_REVIEW, COMPLETED, ERROR)",
    "submittedAt": "datetime-string",
    "evaluationType": "string",
    "institution": "string",
    "countryCode": "string",
    "program": "string",
    "createdAt": "datetime-string",
    "updatedAt": "datetime-string",
    "student": { // Included Student data
      "id": "string",
      "name": "string",
      "email": "string",
      "createdAt": "datetime-string",
      "updatedAt": "datetime-string"
    },
    "documents": [ // Included Document data
      {
        "id": "uuid-string",
        "filename": "string",
        "originalName": "string",
        "path": "string",
        "type": "string (Enum: TRANSCRIPT, DIPLOMA, IDENTIFICATION, OTHER)",
        "mimetype": "string",
        "size": "integer",
        "parsedData": {}, // JSON object or null
        "evaluationRequestId": "uuid-string",
        "createdAt": "datetime-string",
        "updatedAt": "datetime-string"
      }
      // ... more documents
    ],
    "country": { // Included CountryRules data
      "id": "uuid-string",
      "country": "string",
      "rules": "string", // Contains the rules definition
      "createdAt": "datetime-string",
      "updatedAt": "datetime-string"
    }
    // Note: 'result' and 'revisions' are not included here by default
  }
  ```

- **Response (Error 404 Not Found):**

  ```json
  {
    "error": "Evaluation request not found"
  }
  ```

- **Response (Error 500):**

  ```json
  {
    "error": "Failed to fetch evaluation request"
  }
  ```

### 3. Get Evaluation Result (Equivalencies)

Retrieves the final results of an evaluation request, including the calculated equivalencies.

- **Endpoint:** `GET /results/:id`
- **Description:** Fetches the evaluation result associated with a specific evaluation request ID. This endpoint should be polled or called after confirming the request status is `COMPLETED` via `GET /requests/:id`.
- **URL Parameters:**
  - `id` (string, required): The unique ID of the **Evaluation Result**. _(Note: Based on the code `getEvaluationResultById`, this seems to expect the EvaluationResult ID, not the EvaluationRequest ID. However, the schema has a unique constraint on `requestId` in `EvaluationResult`, implying a 1:1 relationship. Clarification might be needed if `EvaluationResult.id` and `EvaluationResult.requestId` are different.)_
- **Response (Success 200 OK):** `application/json` - Returns the `EvaluationResult` object, including the associated `EvaluationRequest` summary.

  ```json
  {
    "id": "uuid-string", // EvaluationResult ID
    "requestId": "uuid-string", // Corresponding EvaluationRequest ID
    "aiAnalysis": {}, // JSON object: Raw analysis from AI
    "humanReview": {}, // JSON object or null: Adjustments/review by human
    "finalResult": {}, // JSON object or null: The final calculated equivalencies
    "reviewedBy": "string or null",
    "reviewedAt": "datetime-string or null",
    "reviewNotes": "string or null",
    "createdAt": "datetime-string",
    "updatedAt": "datetime-string",
    "request": { // Included EvaluationRequest summary
      "id": "uuid-string",
      "studentId": "string",
      "status": "string (Enum: SUBMITTED, AI_PROCESSING, HUMAN_REVIEW, COMPLETED, ERROR)",
      "submittedAt": "datetime-string",
      "evaluationType": "string",
      "institution": "string",
      "countryCode": "string",
      "program": "string",
      "createdAt": "datetime-string",
      "updatedAt": "datetime-string"
    }
  }
  ```

- **Response (Error 404 Not Found):**

  ```json
  {
    "error": "Evaluation result not found"
  }
  ```

- **Response (Error 500):**

  ```json
  {
    "error": "Failed to fetch evaluation result"
  }
  ```

---

## Data Models (Simplified from Prisma Schema)

### EvaluationRequest

| Field          | Type          | Description                                     |
| -------------- | ------------- | ----------------------------------------------- |
| id             | String (UUID) | Unique identifier for the request               |
| studentId      | String (UUID) | ID of the associated student                    |
| status         | Enum          | Current status (SUBMITTED, AI_PROCESSING, etc.) |
| submittedAt    | DateTime      | Timestamp when the request was submitted        |
| evaluationType | String        | Type of evaluation requested                    |
| institution    | String        | Name of the institution                         |
| countryCode    | String        | ISO country code                                |
| program        | String        | Program/degree name                             |
| ...            | ...           | (Other fields like relations not shown here)    |

### EvaluationResult

| Field       | Type          | Description                                        |
| ----------- | ------------- | -------------------------------------------------- |
| id          | String (UUID) | Unique identifier for the result                   |
| requestId   | String (UUID) | ID of the corresponding EvaluationRequest (Unique) |
| aiAnalysis  | JSON          | Raw analysis data from the AI model                |
| humanReview | JSON?         | Data after human review/modification (optional)    |
| finalResult | JSON?         | **Final calculated equivalencies** (optional)      |
| reviewedBy  | String?       | Identifier of the human reviewer (optional)        |
| reviewedAt  | DateTime?     | Timestamp of human review (optional)               |
| reviewNotes | String?       | Notes from the human reviewer (optional)           |
| ...         | ...           | (Other fields like timestamps not shown here)      |
