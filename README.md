# 🧑‍💼 Job Portal Server

This is the backend server for the Job Portal application. It is built using **Express.js**, connects to **MongoDB**, and is deployed on **Vercel**.

> 🌐 Live Server: [https://job-portal-server-o7lqgtwhw-tofael-islams-projects.vercel.app](https://job-portal-server-o7lqgtwhw-tofael-islams-projects.vercel.app)

---

## 🚀 Features

- RESTful API for managing job postings
- Job application handling
- MongoDB for data storage
- Secure CORS handling
- Environment variable-based configuration

---

## 🧾 Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Vercel (Deployment)
- dotenv (for environment variables)

---

## 📂 Project Structure

job-portal-server/
│
├── index.js # Main server file
├── .env # Environment variables (not pushed to GitHub)
├── package.json # Node dependencies and scripts
└── README.md # Project documentation


---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add:

DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
PORT=3000


---

## 🔐 CORS Configuration
Only the following origins are allowed:

http://localhost:5173

https://job-portal-70de2.web.app

You can adjust this list in the allowedOrigins array inside index.js.


---

## 📡 API Endpoints
Base URL : https://job-portal-server-o7lqgtwhw-tofael-islams-projects.vercel.app

GET /jobs
Returns all job postings.

GET /jobs/:id
Returns job posting by ID.

GET /job-applications?email=example@example.com
Returns all applications submitted by a user.

---

## 🌐 Deployment
This server is deployed on Vercel. Deployment is triggered automatically from the main branch using GitHub → Vercel integration.

---

## 📄 License
This project is licensed under the MIT License.

---

## 👨‍💻 Author
Tofael Islam
