# Task Management API Documentation

## Base URL
```
/api/tasks
```

## Authentication
All endpoints require a JWT token in the request header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 1. Create Task
Create a new task (Professor/Company only).

### Endpoint
```
POST /api/tasks
```

### Request Body
```json
{
  "scorePoints": 100,
  "difficultyLevel": "medium",
  "deadline": "2024-03-20T14:00:00Z",
  "taskContent": "Build a RESTful API using Node.js and Express"
}
```

### Success Response (201 Created)
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "_id": "65c4f8a12d68f47c26a8d3b1",
    "scorePoints": 100,
    "difficultyLevel": "medium",
    "deadline": "2024-03-20T14:00:00Z",
    "taskContent": "Build a RESTful API using Node.js and Express",
    "publisher": "65c4f8912d68f47c26a8d3b0",
    "joiners": [],
    "submissions": [],
    "createdAt": "2024-02-08T12:30:41.123Z",
    "updatedAt": "2024-02-08T12:30:41.123Z"
  }
}
```

---

## 2. Get All Tasks
Retrieve a paginated list of tasks with optional filters.

### Endpoint
```
GET /api/tasks
```

### Query Parameters
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `difficulty` (optional): Filter by difficulty level
- `publisher` (optional): Filter by publisher ID
- `upcoming` (optional): Filter for upcoming tasks (deadline > current date)

### Success Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "_id": "65c4f8a12d68f47c26a8d3b1",
      "scorePoints": 100,
      "difficultyLevel": "medium",
      "deadline": "2024-03-20T14:00:00Z",
      "taskContent": "Build a RESTful API using Node.js and Express",
      "publisher": {
        "_id": "65c4f8912d68f47c26a8d3b0",
        "userName": "john_doe",
        "role": "professor"
      },
      "joiners": ["65c4f8912d68f47c26a8d3b2"],
      "submissions": []
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalTasks": 45
  }
}
```

---

## 3. Get Single Task
Retrieve detailed information about a specific task.

### Endpoint
```
GET /api/tasks/{taskId}
```

### Success Response (200 OK)
```json
{
  "success": true,
  "data": {
    "_id": "65c4f8a12d68f47c26a8d3b1",
    "scorePoints": 100,
    "difficultyLevel": "medium",
    "deadline": "2024-03-20T14:00:00Z",
    "taskContent": "Build a RESTful API using Node.js and Express",
    "publisher": {
      "_id": "65c4f8912d68f47c26a8d3b0",
      "userName": "john_doe",
      "role": "professor"
    },
    "joiners": ["65c4f8912d68f47c26a8d3b2"],
    "submissions": [
      {
        "_id": "65c4f8c12d68f47c26a8d3b3",
        "student": "65c4f8912d68f47c26a8d3b2",
        "submissionDate": "2024-02-08T13:30:41.123Z"
      }
    ]
  }
}
```

---

## 4. Update Task
Update an existing task (Publisher only).

### Endpoint
```
PUT /api/tasks/{taskId}
```

### Request Body
```json
{
  "scorePoints": 150,
  "deadline": "2024-03-25T14:00:00Z",
  "taskContent": "Updated task description with additional requirements"
}
```

### Success Response (200 OK)
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "_id": "65c4f8a12d68f47c26a8d3b1",
    "scorePoints": 150,
    "difficultyLevel": "medium",
    "deadline": "2024-03-25T14:00:00Z",
    "taskContent": "Updated task description with additional requirements",
    "publisher": {
      "_id": "65c4f8912d68f47c26a8d3b0",
      "userName": "john_doe",
      "role": "professor"
    },
    "joiners": ["65c4f8912d68f47c26a8d3b2"],
    "submissions": []
  }
}
```

---

## 5. Delete Task
Delete a specific task (Publisher only).

### Endpoint
```
DELETE /api/tasks/{taskId}
```

### Success Response (200 OK)
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

## 6. Join Task
Join a task as a participant.

### Endpoint
```
PATCH /api/tasks/{taskId}/join
```

### Success Response (200 OK)
```json
{
  "success": true,
  "message": "Successfully joined the task",
  "data": {
    "_id": "65c4f8a12d68f47c26a8d3b1",
    "scorePoints": 100,
    "difficultyLevel": "medium",
    "deadline": "2024-03-20T14:00:00Z",
    "taskContent": "Build a RESTful API using Node.js and Express",
    "publisher": "65c4f8912d68f47c26a8d3b0",
    "joiners": ["65c4f8912d68f47c26a8d3b2"],
    "submissions": []
  }
}
```

## Common Error Responses

### Unauthorized (401)
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

### Forbidden (403)
```json
{
  "success": false,
  "message": "Only professors and companies can create tasks"
}
```

### Not Found (404)
```json
{
  "success": false,
  "message": "Task not found"
}
```

### Validation Error (400)
```json
{
  "success": false,
  "message": "Missing required fields"
}
```

## Notes

1. Task Creation:
   - Only professors and companies can create tasks
   - All required fields must be provided
   - Deadline must be a future date

2. Task Updates:
   - Only the original publisher can update or delete a task
   - Cannot update publisher or submission fields directly

3. Joining Tasks:
   - Users can only join a task once
   - Cannot join after deadline
   - Publisher cannot join their own task

4