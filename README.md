
Mini User Management System
Project Overview

This project is a Mini User Management System that implements user authentication and role-based access control.
Users can sign up, log in, view their dashboard, and log out.
Admin users can manage users by viewing all accounts and activating or deactivating them.
 PROJECT -URL  :  https://mini-user-management-system-lakshmi.netlify.app/
 
Tech Stack
Frontend

HTML

CSS

JavaScript (Vanilla JS)

Netlify (Deployment)

Backend

Node.js

Express.js

MongoDB Atlas

Mongoose

JSON Web Token (JWT)

bcrypt

dotenv

Render (Deployment)

Tools

Git & GitHub

MongoDB Atlas

Render

Netlify

Setup Instructions (Local)
Backend Setup
cd backend
npm install


Create a .env file inside the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development


Start the backend server:

node server.js


Backend runs on:

http://localhost:5000

Frontend Setup
cd frontend


Open index.html directly in the browser
OR

Use VS Code Live Server for better testing

Environment Variables Used
Variable	Purpose
PORT	Backend server port
MONGO_URI	MongoDB Atlas connection
JWT_SECRET	JWT signing secret
NODE_ENV	Environment mode
Deployment
Backend

Deployed on Render

Node Web Service

Environment variables configured via Render dashboard

Backend URL:

https://mini-user-management-system-1-gwj1.onrender.com

Frontend

Deployed on Netlify

Static site hosting

Entry file: index.html

API Endpoints Implemented
Authentication

POST /api/auth/signup

POST /api/auth/login

GET /api/auth/me

Admin

GET /api/admin/users (with pagination)

PATCH /api/admin/users/:id/activate

PATCH /api/admin/users/:id/deactivate

Features Implemented

User signup and login

JWT-based authentication

Role-based access (admin / user)

Admin dashboard for user management

Activate and deactivate user accounts

Pagination for user list

Frontend and backend integration

Cloud deployment
