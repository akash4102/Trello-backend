
# Trello Backend

## Overview

This repository contains the backend code for a Trello application. It provides a RESTful API for user authentication, project management, and task management. The backend is built with Node.js, Express, and MongoDB, and it handles all the server-side logic and database interactions.

## Features

- **User Authentication**: Secure registration and login with JWT-based authentication.
- **Project Management**: Create, view, update, and delete projects.
- **Task Management**: Add, update, delete, and view tasks associated with projects.
- **Task Board**: Organize tasks by status: Backlog, In Discussion, In Progress, and Done.
- **Validation**: Comprehensive input validation using Zod.
- **Security**: Protects API endpoints with JWT for security.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM library for MongoDB.
- **JWT (JSON Web Tokens)**: For token-based authentication.
- **Zod**: For input validation.

## Installation

### Prerequisites

- Node.js
- MongoDB
- Express
- Git
- AWS

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/akash4102/Trello-backend.git
   cd Trello-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:

   Create a `.env` file in the root directory and add varialbes available in `.env.example` file:

   necessary variables
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/trelloDB
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the server**:
   ```bash
   node index.js
   ```

5. **Access the server**:
   - The server will run on `http://localhost:5000`.

## API Endpoints

### Authentication

- **POST** `/api/v1/auth/register`: Register a new user.
  - **Request Body**: `{ "name": "John Doe", "email": "john@example.com", "password": "SecurePassword123!" }`
- **POST** `/api/v1/auth/login`: Log in a user and receive a JWT.
  - **Request Body**: `{ "email": "john@example.com", "password": "SecurePassword123!" }`
- **GET** `/api/v1/auth/verify`: Verify the user by client and get client data.

### Projects

- **POST** `/api/v1/project`: Create a new project.
  - **Request Body**: `{ "name": "Project Alpha", "description": "This is a description of Project Alpha." }`
- **GET** `/api/v1/project`: Retrieve all projects.
- **GET** `/api/v1/project/:projectId`: Retrieve a project by ID along with its tasks.
- **PUT** `/api/v1/project/:projectId`: Update a project by ID.
  - **Request Body**: `{ "name": "Updated Project Alpha", "description": "Updated description." }`
- **DELETE** `/api/v1/project/:projectId`: Delete a project by ID.

### Tasks

- **POST** `/api/v1/task`: Create a new task within a project.
  - **Request Body**: `{ "project": "<PROJECT_ID>", "name": "Task 1", "description": "Description of Task 1", "status": "Backlog", "tags": ["urgent", "important"], "dueDate": "2024-08-15T00:00:00.000Z", "assignedUser": "John Doe" }`
- **GET** `/api/v1/task`: Retrieve all tasks across projects.
- **PUT** `/api/v1/task/:taskId`: Update a task by ID.
  - **Request Body**: `{ "name": "Updated Task 1", "description": "Updated description of Task 1", "status": "In Progress" }`
- **DELETE** `/api/v1/task/:taskId`: Delete a task by ID.

## Deployment

The backend is deployed on AWS [http://44.203.0.181:5000/api/v1].

## Project Structure

```
Trello-backend/
├── controllers/
│   ├── auth.controller.js
│   ├── project.controller.js
│   └── task.controller.js
├── models/
│   ├── user.model.js
│   ├── project.model.js
│   └── task.model.js
├── routes/
│   ├── index.js
│   ├── auth.route.js
│   ├── project.route.js
│   └── task.route.js
├── middleware/
│   ├── auth.middleware.js
│   └── main.middleware.js
├── utils/
│   ├── config.js
│   ├── dbConnection.js
│   ├── errorHandler.js
│   ├── rateLimiter.js
│   └── zodValidations.js
├── .env
├── .env.example
├── app.js
├── .gitignore
└── package.json
```