# 🧠 PrepMate AI  
**An AI-powered Assistant for GRE, TOEFL, and IELTS Aspirants**

---

## 🚀 Overview

**PrepMate AI** is a smart and personalized preparation assistant for students targeting GRE, TOEFL, and IELTS. The platform helps users by offering AI-generated study plans, essay feedback, personalized learning strategies, and a chatbot for any exam-related queries.

---
</center>
<p align="center"> 
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2R5bnpsMHFydnF6MGlxZmJmYzQzbmFocTY3a2F5M2lyN2xyeTJqZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/JQm3RhTz4vFJk/giphy.gif" width="700">
</p>

<h1 align="center">
  🌐 <a href="#" target="_blank">LIVE DEMO (Coming Soon)</a>
</h1>

---

## 🎯 Problem Statement

International test preparation can be costly and scattered across multiple resources.
This project tackles two core issues:

➡️ The need for **personalized**, **affordable**, and **effective** test preparation.
➡️ Offering **real-time AI guidance** and centralized storage of study materials.

---

## 🔍 App Features

- 🧾 **Secure User Authentication** – Register/Login using JWT
- 📤 **PDF Upload System** – Save your materials to the cloud
- 🧠 **AI Chatbot** – Ask doubts about GRE/TOEFL/IELTS anytime
- ✍️ **Essay Evaluation** – Upload your writing for instant AI feedback
- 📅 **Personalized Study Plans** – Custom timeline based on user inputs
- 🧠 **AI-Driven Knowledge Assistance** – From grammar help to vocabulary drills

---

## 💻 Tech Stack

### ⚙️ Backend (Node.js + Express)
- **Authentication**: JWT
- **Database**: MongoDB (Mongoose)
- **AI Integration**: OpenAI API
- **PDF Uploads**: Multer
- **Middleware**: Auth, File Validation

### 🌐 Frontend (Coming Soon)
- Will be built using React + Tailwind CSS (Not deployed yet)

---

## 🧠 AI Capabilities

| Feature | Powered By | Description |
|--------|------------|-------------|
| Essay Feedback | OpenAI GPT | Provides real-time scoring and suggestions |
| Doubt Solver Chat | OpenAI GPT | Answers exam-related questions instantly |
| Study Planner | OpenAI GPT | Generates plans based on input timeline & exam |

---

## 🛠️ How to Run the Project Locally

### 🔁 Clone the Repository
```bash
git clone https://github.com/your-username/prepmate-ai.git
cd prepmate-ai
```

### 🔧 Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file and include:
```env
MONGO_URI=your_mongodb_uri
OPENAI_API_KEY=your_openai_key
JWT_SECRET=your_jwt_secret
```

Run the backend:
```bash
node server.js
```

> Runs on: `http://localhost:5000/`

---

## 📦 Folder Structure

```
PrepMate-AI/
├── models/
│   ├── User.js
│   └── Material.js
├── routes/
│   ├── userRoutes.js
│   ├── materialRoutes.js
│   ├── openaiRoutes.js
│   ├── essayRoutes.js
│   └── planRoutes.js
├── middleware/
│   └── auth.js
├── uploads/            ← Stores uploaded PDFs
├── .env                ← Your secrets and API keys
├── server.js           ← Main server file
└── README.md           ← This file
```

---

## 📡 API Routes

### User
- `POST /api/user/register` – Register new user
- `POST /api/user/login` – Login and receive token

### Material
- `POST /api/material/upload` – Upload PDF file
- `GET /api/material/my-materials` – Get all your uploaded files

### AI
- `POST /api/ai/chat` – Ask a question
- `POST /api/essay/evaluate` – Get essay feedback
- `POST /api/plan/generate` – Generate custom study plan

---

## 🔐 Security & Auth
- JWT-based authentication
- Secure PDF handling with `multer`
- CORS enabled

---

## 🧑‍💻 Author
**Eeshanya Joshi**  
TY Student, KJ Somaiya College  
🔗 *Building tools to make student lives easier*

---

> "Learning is not attained by chance, it must be sought for with ardor and attended to with diligence." – Abigail Adams
