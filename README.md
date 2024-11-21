# HTTP Status Dogs Application

A MERN stack application that allows users to create, search, and manage HTTP status code lists with corresponding dog images.

## Features

- User authentication (Login/Signup)
- Search HTTP status codes with dog images
- Filter status codes (exact match, pattern matching like 2xx, 3xx)
- Save filtered lists with custom names
- View, edit, and delete saved lists
- Responsive UI with Tailwind CSS

## Tech Stack

- MongoDB - Database
- Express.js - Backend framework
- React.js - Frontend library
- Node.js - Runtime environment
- Redux - State management
- Tailwind CSS - Styling
- Vite - Build tool
- JWT - Authentication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB installed locally or MongoDB Atlas account
- npm (Node Package Manager)

### Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

4. Create a .env file in the backend directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

5. Create a .env file in the frontend directory:
   ```
   VITE_API_URL=http://localhost:5000
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

The application will be available at `http://localhost:5173`
