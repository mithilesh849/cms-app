
# MERN Stack Application

## Overview
This is a full-stack MERN (MongoDB, Express.js, React, Node.js) application designed for IoT Device's data management and actitities. The application includes authentication, CRUD operations, and real-time updates. The frontend is built with React 18.x.x and ShadCN UI, while the backend is powered by Node.js, Express.js, and MongoDB.

## Features
- User Authentication (JWT-based)
- Task Management (Create, Read, Update, Delete)
- Real-time Updates
- Secure API Implementation
- ShadCN UI 
- Dark Mode Support

## Tech Stack
### Frontend:
- React 18.x.x
- TypeScript
- Vite
- ShadCN UI
- Context API for State Management
- Axios for API Requests

### Backend:
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- WebSockets for Real-time Updates

## Installation
### Prerequisites:
- Node.js (Latest LTS)
- MongoDB (Local or Cloud - e.g., MongoDB Atlas)
- Git

### Steps:
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/cms-app.git
   cd cms-app
   ```

2. Install dependencies for app-api:
   ```sh
   cd app-api
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the `app-api` folder and add:
     ```env
     PORT=5004
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     ```

4. Start the backend server:
   ```sh
   npm run dev
   ```

5. Install dependencies for frontend:
   ```sh
   cd ../web-app
   npm install
   ```

6. Configure frontend environment variables:
   - Create a `.env` file in the `frontend` folder and add:
     ```env
     VITE_API_BASE_URL=http://localhost:5004/api/v1
     ```

7. Start the frontend:
   ```sh
   npm run dev
   ```

## API Endpoints

### Authentication:
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login and receive JWT token
- `GET /api/v1/auth/me` - Fetch user details (JWT required)

### Station Management:
- `GET /api/v1/stations` - Get all stations
- `POST /api/v1/stations` - Create a new station
- `PUT /api/v1/stations/:id` - Update an existing station
- `DELETE /api/v1/stations/:id` - Delete a station

### Vehicle Management:
- `GET /api/v1/vehicles` - Get all vehicles
- `POST /api/v1/vehicles` - Create a new vehicle
- `PUT /api/v1/vehicles/:id` - Update an existing vehicle
- `DELETE /api/v1/vehicles/:id` - Delete a vehicle


### Charging Session:
- `GET /api/v1/charging-history` - Get all Charging Session
- `POST /api/v1/charging-history` - Create a new Charging Session
- `PUT /api/v1/charging-history/:id` - Update an existing Charging Session
- `DELETE /api/v1/charging-history/:id` - Delete a Charging Session

## Contributing
Feel free to contribute by submitting pull requests or opening issues.

## License
This project is licensed under the MIT License.
