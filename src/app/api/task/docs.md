# Task Management API Documentation

## Base URL
```
/api/tasks
```

## Authentication
All endpoints require a JWT token to be sent in the request header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 1. Create Task
Create a new task in the system.

### Endpoint
```
POST /api/tasks
```

### Request Body
```json
{
  "scorePoints": 100,
  "difficultyLevel": "medium",
  "deadline": "2024-03-20T14:00:00.000Z",
  "taskContent": "Build a REST API using Node.js and Express"
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
    "deadline": "2024-03-20T14:00:00.000Z",
    "taskContent": "Build a REST API using Node.js and Express",
    "publisher": "65c4f8912d68f47c26a8d3b0",
    "submissions": [],
    "createdAt": "2024-02-08T12:30:41.123Z",
    "updatedAt": "2024-02-08T12:30:41.123Z"
  }
}
```

### Error Responses

#### Missing Required Fields (400 Bad Request)
```json
{
  "success": false,
  "message": "Please provide all required fields"
}
```

#### Unauthorized (401)
```json
{
  "success": false,
  "message": "Unauthorized"
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

### Example Request
```
GET /api/tasks?page=1&limit=10&difficulty=medium
```

### Success Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "_id": "65c4f8a12d68f47c26a8d3b1",
      "scorePoints": 100,
      "difficultyLevel": "medium",
      "deadline": "2024-03-20T14:00:00.000Z",
      "taskContent": "Build a REST API using Node.js and Express",
      "publisher": {
        "_id": "65c4f8912d68f47c26a8d3b0",
        "userName": "john_doe",
        "email": "john@example.com"
      },
      "submissions": [],
      "createdAt": "2024-02-08T12:30:41.123Z",
      "updatedAt": "2024-02-08T12:30:41.123Z"
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
    "deadline": "2024-03-20T14:00:00.000Z",
    "taskContent": "Build a REST API using Node.js and Express",
    "publisher": {
      "_id": "65c4f8912d68f47c26a8d3b0",
      "userName": "john_doe",
      "email": "john@example.com"
    },
    "submissions": [
      {
        "_id": "65c4f8c12d68f47c26a8d3b2",
        "submittedContent": "GitHub repository link: https://github.com/...",
        "submissionDate": "2024-02-08T13:30:41.123Z",
        "status": "pending"
      }
    ],
    "createdAt": "2024-02-08T12:30:41.123Z",
    "updatedAt": "2024-02-08T12:30:41.123Z"
  }
}
```

### Error Response - Task Not Found (404)
```json
{
  "success": false,
  "message": "Task not found"
}
```

---

## 4. Update Task
Update an existing task's information.

### Endpoint
```
PUT /api/tasks/{taskId}
```

### Request Body
```json
{
  "scorePoints": 150,
  "deadline": "2024-03-25T14:00:00.000Z",
  "taskContent": "Updated task content with additional requirements"
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
    "deadline": "2024-03-25T14:00:00.000Z",
    "taskContent": "Updated task content with additional requirements",
    "publisher": {
      "_id": "65c4f8912d68f47c26a8d3b0",
      "userName": "john_doe",
      "email": "john@example.com"
    },
    "submissions": [],
    "createdAt": "2024-02-08T12:30:41.123Z",
    "updatedAt": "2024-02-08T14:15:22.456Z"
  }
}
```

### Error Responses

#### Unauthorized to Update (403 Forbidden)
```json
{
  "success": false,
  "message": "Unauthorized to update this task"
}
```

#### Task Not Found (404)
```json
{
  "success": false,
  "message": "Task not found"
}
```

---

## 5. Delete Task
Delete a specific task.

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

### Error Responses

#### Unauthorized to Delete (403 Forbidden)
```json
{
  "success": false,
  "message": "Unauthorized to delete this task"
}
```

#### Task Not Found (404)
```json
{
  "success": false,
  "message": "Task not found"
}
```

## Common Error Responses

### Server Error (500)
```json
{
  "success": false,
  "message": "Internal server error"
}
```

### Validation Error (400)
```json
{
  "success": false,
  "message": "Invalid input data"
}
```

## Data Types

### Task Object
| Field           | Type     | Description                                    |
|-----------------|----------|------------------------------------------------|
| _id             | ObjectId | Unique identifier for the task                 |
| scorePoints     | Number   | Points awarded for completing the task         |
| difficultyLevel | String   | One of: 'easy', 'medium', 'hard'             |
| deadline        | Date     | Task submission deadline                       |
| taskContent     | String   | Detailed description of the task              |
| publisher       | ObjectId | Reference to the user who created the task    |
| submissions     | Array    | Array of submission ObjectIds                 |
| createdAt       | Date     | Timestamp of task creation                    |
| updatedAt       | Date     | Timestamp of last update                      |

