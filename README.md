# School Management Information System (MIS)

A Node.js REST API for managing schools, levels, classes, students, teachers, and courses.

## Features

- Express.js REST API
- MongoDB database with Mongoose
- JWT Authentication
- Request validation with Joi
- Swagger UI documentation
- Comprehensive CRUD operations
- Logging with Morgan and Debug

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or remote instance)
- npm

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables (optional):
   - Copy `.env.example` to `.env` and update values
   - Or use `config/default.json` for configuration

3. Start MongoDB:
   - Make sure MongoDB is running on `mongodb://localhost:27017`
   - Or update the connection string in `config/default.json`

4. Create admin user (optional but recommended):
```bash
npm run seed
```
This creates a default admin user:
- Username: `admin`
- Password: `admin123`
- Email: `admin@school.com`

5. Start the server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:{PORT}`

## API Documentation

Swagger UI is available at: `http://localhost:{PORT}/api-docs`

## API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout

### Schools
- `GET /api/v1/schools` - Get all schools
- `GET /api/v1/schools/:id` - Get school by ID
- `POST /api/v1/schools` - Create school
- `PUT /api/v1/schools/:id` - Update school
- `DELETE /api/v1/schools/:id` - Delete school

### Levels
- `GET /api/v1/levels` - Get all levels (Senior 4, Senior 5, Senior 6)
- `GET /api/v1/levels/:id` - Get level by ID
- `POST /api/v1/levels` - Create level
- `PUT /api/v1/levels/:id` - Update level
- `DELETE /api/v1/levels/:id` - Delete level

### Classes
- `GET /api/v1/classes` - Get all classes
- `GET /api/v1/classes/:id` - Get class by ID
- `POST /api/v1/classes` - Create class
- `PUT /api/v1/classes/:id` - Update class
- `DELETE /api/v1/classes/:id` - Delete class

### Students
- `GET /api/v1/students` - Get all students
- `GET /api/v1/students/:id` - Get student by ID
- `POST /api/v1/students` - Create student
- `PUT /api/v1/students/:id` - Update student
- `DELETE /api/v1/students/:id` - Delete student

### Teachers
- `GET /api/v1/teachers` - Get all teachers
- `GET /api/v1/teachers/:id` - Get teacher by ID
- `POST /api/v1/teachers` - Create teacher
- `PUT /api/v1/teachers/:id` - Update teacher
- `DELETE /api/v1/teachers/:id` - Delete teacher

### Courses
- `GET /api/v1/courses` - Get all courses
- `GET /api/v1/courses/:id` - Get course by ID
- `POST /api/v1/courses` - Create course
- `PUT /api/v1/courses/:id` - Update course
- `DELETE /api/v1/courses/:id` - Delete course

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-token>
```

Or use the x-auth-token header:

```
x-auth-token: <your-token>
```

## Example Usage

### Login
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "password123"}'
```

### Create School
```bash
curl -X POST http://localhost:3000/api/v1/schools \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "name": "Example High School",
    "address": "123 Main St",
    "email": "info@example.com",
    "principalName": "John Doe"
  }'
```

## Project Structure

```
demo-mis/
├── config/
│   ├── database.js
│   ├── swagger.js
│   ├── default.json
│   └── development.json
├── controllers/
│   ├── authController.js
│   ├── schoolController.js
│   ├── levelController.js
│   ├── classController.js
│   ├── studentController.js
│   ├── teacherController.js
│   └── courseController.js
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   └── validate.js
├── models/
│   ├── User.js
│   ├── School.js
│   ├── Level.js
│   ├── Class.js
│   ├── Student.js
│   ├── Teacher.js
│   └── Course.js
├── routes/
│   ├── index.js
│   ├── authRoutes.js
│   ├── schoolRoutes.js
│   ├── levelRoutes.js
│   ├── classRoutes.js
│   ├── studentRoutes.js
│   ├── teacherRoutes.js
│   └── courseRoutes.js
├── validations/
│   ├── authValidation.js
│   ├── schoolValidation.js
│   ├── levelValidation.js
│   ├── classValidation.js
│   ├── studentValidation.js
│   ├── teacherValidation.js
│   └── courseValidation.js
├── server.js
└── package.json
```

## Configuration

Edit `config/default.json` to customize:
- Server port
- MongoDB connection URI
- JWT secret and expiration
- Swagger host settings

## License

ISC

# MIS-
