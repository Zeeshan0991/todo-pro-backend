# 🚀 Todo Pro Backend

Backend API for a Todo application with workspaces, projects, and task management.

---

## 📌 Tech Stack

- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL

---

## ✨ Features

- 🔐 User Authentication (Signup/Login with JWT)
- 🏢 Auto Workspace Creation on Signup
- 🏢 Workspace Management
- 📁 Project Management
- 📝 Task/List Management
- 🔒 Secure API with user ownership validation
- ⏳ JWT Token Expiry (1 hour)
- ⚙️ Environment-based configuration (.env support)

---

## ⚙️ Installation & Setup

### 1. Clone the repository

git clone https://github.com/Zeeshan0991/todo-pro-backend.git


### 2. Navigate to project folder

cd todo-pro-backend


### 3. Install dependencies

npm install


### 4. Create a `.env` file in root folder and add:


PORT=8080
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=your_secure_secret_key


### 5. Run the server

npm run dev


---

## 📡 API Endpoints (Examples)

### 👤 User Routes
- POST `/users` → Register user
- POST `/users/login` → Login user

### 🏢 Workspace Routes
- POST `/workspaces` → Create workspace

### 📁 Project Routes
- GET `/projects?workspaceId=1` → Get projects by workspace

---

## 📂 Project Structure


src/
├── controllers/
├── services/
├── routes/
├── middleware/
├── entities/
└── config/


---

## 🔐 Important Notes

- `.env` file is required and should NOT be pushed to GitHub
- JWT_SECRET is used to secure authentication
- Changing JWT_SECRET will invalidate old tokens (users must login again)
- Database used: PostgreSQL (via Sequelize ORM)

---

## 🚀 Recent Improvements

- ✅ Added environment variable support using dotenv
- ✅ Configured dynamic PORT using `.env`
- ✅ Improved JWT authentication security
- ✅ Fixed middleware token verification
- ✅ Cleaned up unnecessary dotenv usage in services
- ✅ Structured backend for production readiness

---

## 👨‍💻 Author

Muhammad Zeeshan Khaliq

---

## ⭐ Notes

This project is part of backend learning and portfolio development.

### 🔥 Future Enhancements

- Refresh Tokens (Advanced Authentication)
- Role-Based Access Control (Admin/User)
- Deployment (Render / Railway)