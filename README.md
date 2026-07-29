# RAD Project Backend

A Node.js and Express-based backend for a blood donation and campaign management platform. It provides authentication, user and admin operations, blood request handling, donation campaign management, and contact messaging.

## Features

- User signup/login with JWT-based authentication
- Public access for campaign browsing and joining/leaving campaigns
- User dashboard for blood requests and messaging
- Admin dashboard for request review and campaign management
- Contact form support
- MongoDB integration for persistent storage

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Token (JWT)
- Passport.js
- Nodemailer
- Jest for testing

## Prerequisites

- Node.js (recommended: 18+)
- MongoDB instance

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root with the following variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/rad-project
JWT_SECRET=your_jwt_secret
```

## Running the Server

Start the application with:

```bash
node index.js
```

The server will run on the port defined in `PORT` (default: `5000`).

## API Overview

The API is organized under versioned routes:

- `/v1/auth` - signup and login
- `/v1/open` - public campaign and contact endpoints
- `/v1/user` - authenticated user actions
- `/v1/admin` - admin-only management routes

## Testing

Run the test suite with:

```bash
npm test
```

## Project Structure

```text
src/
  configs/
  controllers/
  middleware/
  models/
  routes/
```

- `controllers/` contains request handlers
- `models/` defines MongoDB schemas
- `routes/` defines API endpoints
- `middleware/` contains authentication and request middleware
