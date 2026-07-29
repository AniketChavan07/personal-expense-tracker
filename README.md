# Personal Expense Tracker

A production-quality Personal Expense Tracker built using the MERN Stack (MongoDB, Express.js, React.js with Vite, Node.js). 
Features a modern, responsive UI with Tailwind CSS and advanced functionalities like searching, filtering, and sorting expenses.

## Features
- **Add & Delete Expenses**: Easily manage your daily spending with confirmation dialogs.
- **Search, Filter, Sort**: Search by description, filter by categories, and sort by dates.
- **Dashboard Summary**: Real-time tracking of total expenses and current month expenses.
- **Modern UI/UX**: Premium aesthetic with micro-animations, glassmorphism, and Toast notifications.
- **Responsive**: Fully optimized for mobile and desktop screens.
- **Secure backend**: Data validation, global error handling, async wrappers, and RESTful API best practices.

---

## Folder Structure

```text
personal-expense-tracker/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Business logic for endpoints
│   ├── middleware/      # Global error handlers
│   ├── models/          # Mongoose schema definitions
│   ├── routes/          # Express route definitions
│   ├── utils/           # Helper classes and async wrappers
│   ├── app.js           # Express app setup & middleware
│   ├── server.js        # Entry point for the backend server
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/  # Reusable UI components
    │   ├── hooks/       # Custom React hooks
    │   ├── pages/       # Dashboard and other views
    │   ├── services/    # Axios API service
    │   ├── utils/       # Formatters (Currency, Date)
    │   ├── App.jsx      # Main React Router setup
    │   └── main.jsx     # Vite React entry point
    └── .env.example
```

---

## Setup & Installation

### Prerequisites
- Node.js (v18+)
- MongoDB connection string (Local or Atlas)

### 1. Clone & Setup Backend
```bash
cd backend
npm install
```
- Copy `.env.example` to `.env` and configure your `MONGO_URI` and `PORT`.
- Start the server: `npm run dev` (Runs on http://localhost:5000)

### 2. Setup Frontend
```bash
cd frontend
npm install
```
- Copy `.env.example` to `.env` and verify `VITE_API_URL` points to your backend.
- Start the app: `npm run dev` (Runs on http://localhost:5173 by default)

---

## API Documentation

| Method | Endpoint | Description | Request Body | Query Params |
|--------|---------|-------------|--------------|--------------|
| GET | `/api/expenses` | Get all expenses | - | `search`, `category`, `sort` (`date_asc`, `date_desc`) |
| POST | `/api/expenses` | Create a new expense | `amount`, `description`, `category`, `date` | - |
| DELETE | `/api/expenses/:id` | Delete an expense by ID | - | - |

---

## Deployment Guide

### Database (MongoDB Atlas)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free cluster.
2. Under "Database Access", create a user with read/write privileges.
3. Under "Network Access", allow access from anywhere (`0.0.0.0/0`).
4. Click "Connect" -> "Connect your application" and copy the connection string.
5. Replace `<password>` with your user's password and place it in the `.env` files.

### Backend (Render)
1. Push your repository to GitHub.
2. Sign up on [Render.com](https://render.com) and create a new **Web Service**.
3. Connect your GitHub repository.
4. Set the Root Directory to `backend`.
5. Set Build Command to `npm install` and Start Command to `npm start`.
6. Add Environment Variables: `MONGO_URI`, `PORT`, `NODE_ENV=production`.
7. Click "Create Web Service".

### Frontend (Vercel)
1. Sign up on [Vercel](https://vercel.com) and click "Add New Project".
2. Import your GitHub repository.
3. Edit the "Root Directory" to be `frontend`.
4. The Build settings should automatically detect Vite (`npm run build`).
5. Add Environment Variables: `VITE_API_URL` (Point this to your deployed Render URL).
6. Click "Deploy".
