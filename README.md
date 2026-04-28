# Project Management Dashboard

A complete MERN stack application for managing projects with user authentication.

## Tech Stack

**Backend:**
- Node.js + Express
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

**Frontend:**
- React (functional components + hooks)
- React Router DOM
- Axios for API calls

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally on port 27017) OR MongoDB Atlas connection string

### Backend Setup

1. Navigate to backend folder:
   `cd backend`

2. Update the `.env` file with your MongoDB connection string if using Atlas

3. Start the backend server:
   `npm run dev`

   The server will run on http://localhost:5000

### Frontend Setup

1. Open a new terminal and navigate to frontend folder:
   `cd frontend`

2. Start the frontend:
   `npm start`

   The app will open on http://localhost:3000

## API Endpoints

### Auth Routes
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- GET /api/auth/profile - Get user profile (protected)

### Project Routes (All Protected)
- GET /api/projects - Get all user's projects
- GET /api/projects/:id - Get single project
- POST /api/projects - Create new project
- PUT /api/projects/:id - Update project
- DELETE /api/projects/:id - Delete project

## Features
- User registration and login
- JWT-based authentication
- Create, read, update, and delete projects
- Project status tracking (pending, in-progress, completed)
- Dashboard with project statistics
- Protected routes
- Responsive UI
