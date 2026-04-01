# 🚀 Todo Pro Backend

Backend API for a Todo application with workspaces, projects, and task management.

---

## 📌 Tech Stack

- Node.js
- Express.js
- Sequelize ORM
- MySQL

---

## ✨ Features

- 🔐 User Authentication (Signup/Login)
- 🏢 Workspace Management
- 📁 Project Management
- 📝 Task/List Management
- 🔒 Secure API with user ownership validation

---

## ⚙️ Installation & Setup

1. Clone the repository:
git clone https://github.com/Zeeshan0991/todo-pro-backend.git

2. Navigate to project folder:
cd todo-pro-backend

3. Install dependencies:
npm install

4. Create `.env` file and add:
PORT=5000
DB_NAME=your_db
DB_USER=root
DB_PASSWORD=your_password

5. Run the server:
npm run dev

---

## 📡 API Endpoints (Example)

- POST /users → Register user
- POST /users/login → Login user
- POST /workspaces → Create workspace
- GET /projects → Get projects by workspace

---

## 📂 Project Structure

src/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middlewares/
 └── config/

---

## 👨‍💻 Author

Muhammad Zeeshan Khaliq

---

## ⭐ Notes

This project is part of my backend learning and portfolio development.