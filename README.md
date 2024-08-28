Employee Management API:

```markdown
# Employee Management API

This is an Employee Management API built using Node.js, Express.js, and MongoDB. It allows you to manage employee profiles, including creating, updating, retrieving, and deleting employee records. The API also supports operations for managing employee reviews.

## Features

- Create Employee: Add a new employee profile.
- Update Employee: Modify details of an existing employee, including the ability to deactivate the profile.
- Delete Employee: Remove an employee from the system.
- Get Employees: Retrieve all employee profiles or a specific employee profile by ID.
- Manage Reviews: Create, update, delete and retrieve employee reviews.

## Technologies Used

- Node.js: JavaScript runtime.
- Express.js: Web framework for Node.js.
- MongoDB: NoSQL database.
- Mongoose: MongoDB object modeling for Node.js.

## Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:entsoereng/employee-management-api.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory with the following content:

   ```
   MONGO_URI=your-mongodb-uri
   PORT=3000
   ```

4. Start the server:

   ```bash
   npm start
   ```

   The server should now be running on `http://localhost:3000`.

## API Endpoints

### Employees

- Create an Employee

  ```http
  POST /employees
  ```

  Body:
  ```json
  {
    "first_name": "Emmanuel",
    "last_name": "Ntsoereng",
    "position": "Software Engineer",
    "department": "Engineering",
    "email": "emmanuel@example.com",
    "phone": "123-456-7890"
  }
  ```

- Get All Employees

  ```http
  GET /employees
  ```

- Get Employee by ID

  ```http
  GET /employees/:employeeId
  ```

- Update an Employee

  ```http
  PATCH /employees/:employeeId
  ```

  Body (example):
  ```json
  [
    { "propName": "position", "value": "Senior Software Engineer" }
  ]
  ```

- Deactivate an Employee

  ```http
  PATCH /employees/:employeeId/deactivate
  ```

- Delete an Employee

  ```http
  DELETE /employees/:employeeId
  ```

### Reviews

- Create a Review

  ```http
  POST /reviews
  ```

  Body:
  ```json
  {
    "employee_id": "employeeId",
    "review": "Great work!",
    "rating": 5
  }
  ```

- Get All Reviews

  ```http
  GET /reviews
  ```

- Get Review by ID

  ```http
  GET /reviews/:reviewId
  ```

- Update a Review

  ```http
  PATCH /reviews/:reviewId
  ```

  Body (example):
  ```json
  [
    { "propName": "review", "value": "Excellent work!" }
  ]
  ```

- Delete a Review

  ```http
  DELETE /reviews/:reviewId
  ```

## Testing

You can test the API endpoints using Postman or any other API client.
Postman link: https://www.postman.com/payload-specialist-8389544/workspace/internpulse-workspace/request/37785720-cc7b20a7-d3de-4186-a3c2-6424cfd86294?action=share&creator=37785720&ctx=documentation

 
