# Intro to Backend Web Development – Node.js, Express & MongoDB

[![Node.js](https://img.shields.io/badge/Node.js-v20+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%20%2F%20Mongoose-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

A complete, production-grade implementation of the **[freeCodeCamp "Intro to Backend Web Development – Node.js, Express, MongoDB" Tutorial](https://www.youtube.com/watch?v=KOutPbKc9UM)** taught by Shivani.

This repository demonstrates the foundational concepts of backend engineering: client-server architecture, database connectivity with MongoDB Atlas, user authentication with Bcrypt password hashing, and full CRUD (Create, Read, Update, Delete) APIs following the **Model-Route-Controller (MRC)** design pattern.

---

## 📑 Table of Contents
1. [Architecture & Folder Structure](#-architecture--folder-structure)
2. [Prerequisites](#-prerequisites)
3. [Step-by-Step Setup Guide](#-step-by-step-setup-guide)
   - [A. Clone Repository & Install Dependencies](#a-clone-repository--install-dependencies)
   - [B. Setup Online MongoDB Atlas Cluster](#b-setup-online-mongodb-atlas-cluster)
   - [C. Configure Environment Variables](#c-configure-environment-variables)
   - [D. Run Server](#d-run-server)
4. [Automated Testing](#-automated-testing)
5. [API Documentation](#-api-documentation)
   - [User Authentication APIs](#1-user-authentication-apis)
   - [Post CRUD APIs](#2-post-crud-apis)
6. [Testing with Postman Desktop App](#-testing-with-postman-desktop-app)

---

## 🏗️ Architecture & Folder Structure

This application strictly implements the clean **Model-Route-Controller (MRC)** pattern:

```text
intro-to-backend/
├── backend/
│   └── src/
│       ├── config/
│       │   ├── constants.js          # Project configuration constants (e.g. DB_NAME)
│       │   └── database.js           # Mongoose MongoDB connection & fallback
│       ├── controllers/
│       │   ├── post.controller.js    # CRUD business logic (create, get, update, delete)
│       │   └── user.controller.js    # Auth logic (register, login, logout)
│       ├── models/
│       │   ├── post.model.js         # Mongoose Post schema & model
│       │   └── user.model.js         # Mongoose User schema with Bcrypt password hashing
│       ├── routes/
│       │   ├── post.route.js         # Post API routing
│       │   └── user.route.js         # User API routing
│       ├── app.js                    # Express app configuration & middlewares
│       ├── index.js                  # Server entry point & listener
│       └── test-apis.js              # Automated end-to-end API test runner
├── .env                              # Environment variables (git-ignored)
├── .env.example                      # Environment variables template
├── .gitignore                        # Git ignore rules
├── Intro_to_Backend_Postman_Collection.json # Postman Collection v2.1
├── package.json                      # Project dependencies & scripts
└── README.md                         # Documentation
```

---

## 🛠️ Prerequisites

Make sure you have installed on your laptop:
- **Node.js**: v18 or later (`node -v`)
- **npm**: v9 or later (`npm -v`)
- **Git**: (`git --version`)
- **Postman Desktop App** (free download from [postman.com/downloads](https://www.postman.com/downloads/))

---

## 🚀 Step-by-Step Setup Guide

### A. Clone Repository & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/vivek-rahagir07/intro-to-backend.git

# Navigate into the project directory
cd intro-to-backend

# Install dependencies
npm install
```

---

### B. Setup Online MongoDB Account and Cluster

1. Go to **[MongoDB Cloud](https://www.mongodb.com/cloud/atlas/register)** and sign up for a free account.
2. Click **Create Deployment** and choose the **M0 Free Shared Tier**.
3. Select your preferred Cloud Provider & Region (e.g., AWS / Mumbai or your closest region) and click **Create**.
4. **Create a Database User**:
   - Set a Username (e.g., `dbAdmin`)
   - Set a secure Password (e.g., `MySecretPassword123`)
   - Click **Create Database User** *(remember these credentials!)*.
5. **Configure Network Access**:
   - Under "Where would you like to connect from?", select **My Local Environment**.
   - Under IP Access List, add `0.0.0.0/0` (Allow Access from Anywhere) so your laptop can connect.
   - Click **Finish and Close**.
6. **Get Connection String**:
   - In the Atlas Dashboard, click the **Connect** button next to your cluster.
   - Choose **Drivers** (Node.js).
   - Copy the connection string format:
     ```text
     mongodb+srv://<username>:<password>@cluster0.twr96ja.mongodb.net/?retryWrites=true&w=majority
     ```

---

### C. Configure Environment Variables

Create a `.env` file in the root directory (copied from `.env.example`):

```bash
cp .env.example .env
```

Edit `.env` and replace with your credentials and database name (`intro-to-backend`):

```env
PORT=4000
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.twr96ja.mongodb.net/intro-to-backend?retryWrites=true&w=majority"
```

> **Note on Instant Local Evaluation:**  
> If no Atlas connection string is provided in `.env`, the project includes an automatic fallback to an in-memory MongoDB instance. This enables running the app and showing it on your laptop immediately without waiting for cluster provisioning!

---

### D. Run Server

Start the development server with live reload (**Nodemon**):

```bash
npm run dev
```

Or run in standard production mode:

```bash
npm start
```

You will see:
```text
🚀 Server is running at port : 4000
👉 http://localhost:4000/
 MongoDB connected !!! Host: cluster0-shard-00-00.xxxx.mongodb.net
```

---

## 🧪 Automated Testing

To automatically verify all endpoints (User registration, login verification, duplicate handling, logout, and full CRUD post operations) execute:

```bash
npm test
```

Expected output:
```text
==================================================
🧪 RUNNING AUTOMATED BACKEND API TESTS
==================================================
 MongoDB connected !!!
[Test Server] Listening on http://localhost:4099
 ✅ PASS: Root welcome / health endpoint
 ✅ PASS: POST /api/v1/users/register - Register User
 ✅ PASS: POST /api/v1/users/register - Rejects Duplicate Email
 ✅ PASS: POST /api/v1/users/login - Valid Credentials
 ✅ PASS: POST /api/v1/users/login - Rejects Invalid Credentials
 ✅ PASS: POST /api/v1/users/logout - Logout Successful
 ✅ PASS: POST /api/v1/posts/create - Create Post
 ✅ PASS: GET /api/v1/posts/getPosts - Read All Posts
 ✅ PASS: PATCH /api/v1/posts/update/:id - Update Post
 ✅ PASS: DELETE /api/v1/posts/delete/:id - Delete Post
==================================================
🏁 TEST RESULTS: 10 Passed, 0 Failed
==================================================
```

---

## 📡 API Documentation

Base URL: `http://localhost:4000`

### 1. User Authentication APIs

#### A. Register User
- **Method:** `POST`
- **URL:** `/api/v1/users/register`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "message": "User registered!",
    "user": {
      "id": "6737bc...",
      "email": "john@example.com",
      "username": "johndoe"
    }
  }
  ```

#### B. Login User
- **Method:** `POST`
- **URL:** `/api/v1/users/login`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "message": "User Logged in",
    "user": {
      "id": "6737bc...",
      "email": "john@example.com",
      "username": "johndoe"
    }
  }
  ```

#### C. Logout User
- **Method:** `POST`
- **URL:** `/api/v1/users/logout`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "email": "john@example.com"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "message": "Logout successful"
  }
  ```

---

### 2. Post CRUD APIs

#### A. Create Post (Create)
- **Method:** `POST`
- **URL:** `/api/v1/posts/create` *(alias: `/api/v1/posts`)*
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "name": "Getting Started with Node & Express",
    "description": "Building scalable backend APIs step-by-step using Express and MongoDB.",
    "age": 24
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "message": "Post created successfully",
    "post": {
      "_id": "6737c1...",
      "name": "Getting Started with Node & Express",
      "description": "Building scalable backend APIs step-by-step using Express and MongoDB.",
      "age": 24,
      "createdAt": "2026-11-16T08:00:00.000Z",
      "updatedAt": "2026-11-16T08:00:00.000Z"
    }
  }
  ```

#### B. Read All Posts (Read)
- **Method:** `GET`
- **URL:** `/api/v1/posts/getPosts` *(alias: `/api/v1/posts`)*
- **Response (200 OK):**
  ```json
  [
    {
      "_id": "6737c1...",
      "name": "Getting Started with Node & Express",
      "description": "Building scalable backend APIs step-by-step using Express and MongoDB.",
      "age": 24,
      "createdAt": "2026-11-16T08:00:00.000Z",
      "updatedAt": "2026-11-16T08:00:00.000Z"
    }
  ]
  ```

#### C. Update Post (Update)
- **Method:** `PATCH`
- **URL:** `/api/v1/posts/update/:id` *(alias: `/api/v1/posts/:id`)*
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "description": "Updated content with advanced architectural patterns.",
    "age": 25
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "message": "Post Updated Successfully",
    "post": {
      "_id": "6737c1...",
      "name": "Getting Started with Node & Express",
      "description": "Updated content with advanced architectural patterns.",
      "age": 25,
      "updatedAt": "2026-11-16T08:05:00.000Z"
    }
  }
  ```

#### D. Delete Post (Delete)
- **Method:** `DELETE`
- **URL:** `/api/v1/posts/delete/:id` *(alias: `/api/v1/posts/:id`)*
- **Response (200 OK):**
  ```json
  {
    "message": "Post successfully deleted"
  }
  ```

---

## 📮 Testing with Postman Desktop App

A pre-built Postman collection is included in this repository: `Intro_to_Backend_Postman_Collection.json`.

### How to use:
1. Open the **Postman** Desktop App.
2. Click **Import** (top left).
3. Drag and drop `Intro_to_Backend_Postman_Collection.json` into Postman.
4. Ensure your server is running (`npm run dev`).
5. Open the imported collection **"Intro to Backend - API Collection"**:
   - Run **Register User**
   - Run **Login User**
   - Run **Create Post** (this request automatically saves the created `postId` as a collection variable!)
   - Run **Read All Posts**
   - Run **Update Post**
   - Run **Delete Post**
   - Run **Logout User**

---

## 👨‍💻 Author
- **Vivek Rahagir** ([@vivek-rahagir07](https://github.com/vivek-rahagir07))
- Tutorial Source: [freeCodeCamp "Intro to Backend Web Development"](https://www.youtube.com/watch?v=KOutPbKc9UM) by Shivani.
