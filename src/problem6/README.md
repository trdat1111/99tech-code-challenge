# Scoreboard API Specification (Golang + Temporal + SSE)

## Overview

This module provides an API for a **real-time scoreboard system** using **Golang** with **Temporal** to ensure reliability, scalability, and fault tolerance. **Server-Sent Events (SSE)** is used for **live score updates**, replacing WebSockets.

## Key Components

-   **Golang + Fiber** for the API
-   **Temporal** for workflow management
-   **MySQL** for persistent storage
-   **Redis** for real-time leaderboard caching
-   **SSE (Server-Sent Events)** for live score updates

---

## API Endpoints

### **1. Get Top 10 Scores**

#### **`GET /scores`**

Returns the top 10 highest scores.

**Request:**

```sh
curl -X GET http://localhost:3000/scores
```

**Response:**

```json
[
    { "user": "Alice", "score": 1500 },
    { "user": "Bob", "score": 1400 }
]
```

**Implementation Notes:**

-   Retrieves data from **Redis cache** for fast response.
-   If cache is **stale or missing**, fetches from **MySQL** and updates Redis.

---

### **2. Submit Score Update Request**

#### **`POST /scores/update`**

A user submits an action that triggers a score update.

**Request:**

```sh
curl -X POST http://localhost:3000/scores/update \
     -H "Authorization: Bearer <JWT_TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{ "userId": 1, "increment": 10 }'
```

**Response:**

```json
{ "message": "Score update request submitted" }
```

**Implementation Notes:**

-   The API **does not update the database directly**.
-   Instead, it **starts a Temporal workflow** to:
    1. Validate the request (rate limits, authentication, etc.).
    2. Update the MySQL database asynchronously.
    3. Publish the updated score to Redis.
    4. Notify connected SSE clients.

---

### **3. Live Score Updates (SSE)**

#### **`GET /scores/stream`** (Server-Sent Events)

Clients subscribe to receive **real-time score updates**.

**Client Subscription:**

```sh
curl -N http://localhost:3000/scores/stream
```

**Live Updates Example:**

```json
event: update
data: { "user": "Alice", "score": 1510 }
```

**Implementation Notes:**

-   The API **holds the connection open** and streams updates.
-   When a **score is updated**, Temporal **triggers an SSE event**.
-   Clients **receive updates automatically** without polling.

---

## Backend Implementation Details

**Temporal Workflow for Score Updates**

1. **API starts Temporal workflow** when a user requests a score update.
2. **Temporal executes workflow:**
    - **Step 1:** Validate input (e.g., check user existence, rate limits).
    - **Step 2:** Update the **MySQL database**.
    - **Step 3:** Publish updated score to **Redis**.
    - **Step 4:** Notify **SSE clients** of the score change.

**Why Use Temporal?**

-   **Ensures exactly-once processing** (no duplicate updates).
-   **Automatic retries** in case of DB failures.
-   **Scalable & decoupled processing**.

---

## How to Implement SSE in Golang (Fiber)

### **1. Install Required Packages**

```sh
go get github.com/gofiber/fiber/v2
```

### **2. SSE Server Implementation**

```go
package main

import (
    "fmt"
    "net/http"
    "github.com/gofiber/fiber/v2"
)

func main() {
    app := fiber.New()

    app.Get("/scores/stream", func(c *fiber.Ctx) error {
        c.Set("Content-Type", "text/event-stream")
        c.Set("Cache-Control", "no-cache")
        c.Set("Connection", "keep-alive")

        for {
            c.WriteString("event: update\n")
            c.WriteString(fmt.Sprintf("data: {\"user\": \"Alice\", \"score\": 1510 }\n\n"))
            c.Flush()
        }
        return nil
    })

    app.Listen(":3000")
}
```

**How It Works:**

-   The server **keeps the connection open** and **streams updates**.
-   When Temporal **triggers an update**, SSE **pushes it** to clients.
-   Clients **receive automatic updates** without needing WebSockets.

---

## Database Schema

**`users` Table:**

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    score INT DEFAULT 0
);
CREATE INDEX idx_score ON users(score DESC);
```

---

## Security Considerations

1. **JWT authentication** required for updates.
2. **Rate-limiting** to prevent abuse.
3. **Signed requests** to prevent unauthorized score updates.
4. **SSE connections validated** to prevent unauthorized access.
5. **Temporal ensures retries** on failures to maintain consistency.

---

## Improvement Suggestions

**Enhancements:**

-   **Use Redis as a caching layer** for leaderboard queries.
-   **Implement Temporal Cron Workflows** to refresh leaderboard rankings.
-   **Implement fraud detection** (e.g., flag score anomalies in Temporal).
-   **Run Temporal workers in Kubernetes** for high availability.

---

##

---

## Conclusion

This API module efficiently manages a **real-time scoreboard** using **Golang + Temporal + SSE**. It ensures **reliable, asynchronous, and scalable score updates** without the complexity of WebSockets. 🚀
