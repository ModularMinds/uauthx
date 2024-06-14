
---

[![Docker Image CI](https://github.com/ModularMinds/uauthx/actions/workflows/docker-image.yml/badge.svg)](https://github.com/ModularMinds/uauthx/actions/workflows/docker-image.yml)

# UAuthX - User Authentication System

UAuthX is a user authentication system built with Node.js and MongoDB. It provides a secure and efficient way to manage user authentication for web applications.

## Features

- User registration with email and password
- User login with email and password
- Token-based authentication using JWT (JSON Web Tokens)
- Password hashing for secure storage
- Centralized management of user authentication
- Scalable architecture

## Installation

### Using Node.js

1. Clone the repository:
   ```bash
   git clone https://github.com/modularminds/uauthx.git
   ```

2. Install dependencies:
   ```bash
   cd uauthx
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and define the following variables:
   ```plaintext
   MONGO_URI=mongodb://localhost:27017/uauthx
   SECRET_KEY=your_secret_key
   UAUTHX_ADMIN=your_username
   UAUTHX_PASSWORD=your_password
   ```

4. Build the application:
   ```bash
   npm run build
   ```

5. Start the server:
   ```bash
   npm start
   ```

### Using Docker

#### Build from Source

1. Build the Docker image:
   ```bash
   docker build -t uauthx .
   ```

2. Run the Docker container:
   ```bash
   docker run -p 5000:5000 \
     -e MONGO_URI=mongodb://localhost:27017/uauthx \
     -e SECRET_KEY=your_secret_key \
     -e UAUTHX_ADMIN=your_username \
     -e UAUTHX_PASSWORD=your_password \
     -d uauthx
   ```

#### Pull from Docker Hub

1. Pull the Docker image:
   ```bash
   docker pull modularminds/uauthx:latest
   ```

2. Run the Docker container:
   ```bash
   docker run -p 5000:5000 \
     -e MONGO_URI=mongodb://localhost:27017/uauthx \
     -e SECRET_KEY=your_secret_key \
     -e UAUTHX_ADMIN=your_username \
     -e UAUTHX_PASSWORD=your_password \
     -d modularminds/uauthx:latest
   ```

## Usage

| **Endpoint**           | **Request Type**        | **Request Body / Headers**                                                                         | **Success Response**                                                                                               | **Error Response**                                                                                                 |
|------------------------|-------------------------|-----------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| **Register a User**    | POST `/auth/sign-up`    | ```json { "email": "user@example.com", "password": "password123" } ```                               | ```json { "isSuccess": true, "authToken": "your_jwt_token" } ```                                                   | ```json { "isSuccess": false, "error": "Error message" } ```                                                       |
| **Login**              | POST `/auth/sign-in`    | ```json { "email": "user@example.com", "password": "password123" } ```                               | ```json { "isSuccess": true, "authToken": "your_jwt_token" } ```                                                   | ```json { "isSuccess": false, "error": "Error message" } ```                                                       |
| **Verify User Token**  | GET `/auth/verify-user` | Header: Authorization: Bearer your_jwt_token                                                        | ```json { "isSuccess": true, "userId": "user_id_string" } ```                                                      | ```json { "isSuccess": false, "error": "Error message" } ```                                                       |

### Access Protected Routes

To access protected routes, include the JWT token in the Authorization header of your requests:

```
Authorization: Bearer your_jwt_token
```

### Access Admin Routes

To access admin routes, use Basic Authentication with your admin username and password.

```plaintext
Authorization: Basic base64_encode(username:password)
```

---