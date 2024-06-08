
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

### Register a User

Send a POST request to `/auth/sign-up` with the following JSON body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Response

- Success:
  ```json
  {
    "isSuccess": true,
    "authToken": "your_jwt_token"
  }
  ```

- Error:
  ```json
  {
    "isSuccess": false,
    "error": "Error message"
  }
  ```

### Login

Send a POST request to `/auth/sign-in` with the following JSON body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Response

- Success:
  ```json
  {
    "isSuccess": true,
    "authToken": "your_jwt_token"
  }
  ```

- Error:
  ```json
  {
    "isSuccess": false,
    "error": "Error message"
  }
  ```

### Verify User Token

Send a GET request to `/auth/verify-user` with the Authorization header containing the Bearer token:

```
GET /auth/verify-user HTTP/1.1
Host: localhost:5000
Authorization: Bearer your_jwt_token
```

#### Response

- Success:
  ```json
  {
    "isSuccess": true,
    "userId": "user_id_string"
  }
  ```

- Error:
  ```json
  {
    "isSuccess": false,
    "error": "Error message"
  }
  ```

### Access Protected Routes

To access protected routes, include the JWT token in the Authorization header of your requests:

```
Authorization: Bearer your_jwt_token
```

---
