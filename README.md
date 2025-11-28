# 📝 Node.js Todo App API (JWT + SQLite)

A simple and secure REST API built with **Express**, **JWT authentication**, **bcrypt hashing**, and **SQLite** (via `better-sqlite3`).
This API allows users to **register**, **login**, and **manage personal todo tasks**.

---

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **bcryptjs** – password hashing
- **jsonwebtoken** – authentication
- **SQLite (better-sqlite3)** – database
- **REST API architecture**

---

## 📦 Installation

```sh
git clone https://github.com/nooraqib/todo_backend.git
cd todo_backend
npm install
```

---

## ⚙️ Environment Setup

Create `.env` file:

```
JWT_SECRET=your-secret-key
```

---

## ▶ Run the Server

```sh
npm start
```

Server default:

```
http://localhost:3000
```

---

# 🔐 Authentication Routes

## **1. Register User**

### **POST /auth/register**

Creates a new user, stores hashed password, creates one default todo, and returns a JWT token.

### **Request Body**

```json
{
  "username": "john123",
  "password": "mypassword"
}
```

### **Success Response**

```json
{
  "token": "your-jwt-token"
}
```

### **Errors**

| Status | Message                |
| ------ | ---------------------- |
| 400    | Username already taken |
| 500    | Server error           |

---

## **2. Login User**

### **POST /auth/login**

Validates credentials and returns a JWT token.

### **Request Body**

```json
{
  "username": "john123",
  "password": "mypassword"
}
```

### **Success Response**

```json
{
  "token": "your-jwt-token"
}
```

### **Errors**

| Status | Message            |
| ------ | ------------------ |
| 404    | User not found     |
| 401    | Password not match |
| 500    | Server error       |

---

# 📝 Todo Routes (Protected)

> These routes require JWT middleware that sets `req.userid`.

---

## **1. Get All Todos**

### **GET /todos**

Fetch all todos belonging to the logged-in user.

### **Success Response**

```json
[
  {
    "id": 1,
    "user_id": 12,
    "task": "Hello :): Add your first todo",
    "completed": 0
  }
]
```

---

## **2. Create Todo**

### **POST /todos**

### **Request Body**

```json
{
  "task": "Buy groceries"
}
```

### **Success Response**

```json
{
  "id": 5,
  "task": "Buy groceries",
  "completed": 0
}
```

### **Error**

```json
{
  "message": "some thing went wrong"
}
```

---

## **3. Update Todo**

### **PUT /todos/:id**

Used to mark todo as completed/uncompleted.

### **Request Body**

```json
{
  "completed": 1
}
```

### **Success Response**

```json
{
  "message": "completed"
}
```

---

## **4. Delete Todo**

### **DELETE /todos/:id**

### **Success Response**

```json
{
  "message": "deleted"
}
```

---

# 🗄 Database Schema (Example)

### **users**

| id  | username | password |
| --- | -------- | -------- |

### **todos**

| id  | user_id | task | completed |
| --- | ------- | ---- | --------- |

---

# 🧪 Testing With Postman

### Add Authorization Header:

```
Authorization: Bearer <your-token>
```

---

# 🎯 Summary

This API provides:

✔ Secure User Authentication
✔ JWT-based protected routes
✔ CRUD todos
✔ SQLite fast local storage
