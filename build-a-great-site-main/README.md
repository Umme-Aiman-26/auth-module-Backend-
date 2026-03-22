#  Authentication Module Backend

A production-ready authentication module built using Node.js, Express, and TypeScript. This project implements secure user authentication, OTP verification, JWT-based authorization, and role-based access control following modern backend development practices.

---

##  Features

### 🔹 User Authentication
- User registration with email and phone
- Secure password hashing using bcrypt
- Login using email & password
- Optional OTP-based login

### 🔹 OTP System
- 6-digit OTP generation
- OTP expiry (5 minutes)
- Retry attempt limits
- OTP resend functionality

### 🔹 Token Management
- JWT-based authentication
- Access token (short-lived)
- Refresh token (long-lived)
- Token refresh endpoint

### 🔹 Password Management
- Forgot password flow
- Secure reset token via email
- Token expiry (15 minutes)

### 🔹 Authorization
- Role-based access control (user, admin, super_admin)
- Protected routes using middleware

### 🔹 Security Features
- Password hashing (bcrypt)
- JWT authentication
- Rate limiting
- Input validation (Zod/Joi)
- Secure headers (Helmet)
- CORS configuration

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT (Authentication)
- bcrypt (Password hashing)
- Nodemailer / Twilio (OTP services)
- dotenv (Environment variables)

---

##  Project Structure

src/
 ├── controllers/
 ├── routes/
 ├── models/
 ├── middleware/
 ├── utils/
 ├── config/

---

##  Installation & Setup

1. Clone the repository  
git clone https://github.com/your-username/auth-module.git

2. Navigate to the project folder  
cd auth-module

3. Install dependencies  
npm install

4. Create a `.env` file and add:

PORT=5000  
MONGO_URI=your_mongodb_uri  
JWT_SECRET=your_secret  
JWT_REFRESH_SECRET=your_refresh_secret  
JWT_EXPIRES_IN=15m  
JWT_REFRESH_EXPIRES_IN=7d  
EMAIL_USER=your_email  
EMAIL_PASS=your_password  
OTP_EXPIRY=5m  

5. Run the server  
npm run dev

---

##  API Endpoints

POST /auth/register  
POST /auth/verify-otp  
POST /auth/login  
POST /auth/login-otp  
POST /auth/refresh-token  
POST /auth/forgot-password  
POST /auth/reset-password  
POST /auth/logout  
GET  /auth/me (Protected)

---

##  Middleware

- Authentication Middleware (JWT verification)
- Authorization Middleware (role-based access)
- Centralized Error Handling

---

##  Database Design

- User Entity – Stores user details and roles  
- OTP Entity – Stores OTP and expiry  
- Refresh Token Entity – Stores active sessions  

---

##  Testing

- API testing using Postman  
- Unit testing for core logic  
- Manual testing for authentication flows  

---

## 📌 Learning Outcomes

- REST API development  
- JWT authentication & authorization  
- Secure backend design  
- OTP verification systems  
- MongoDB schema design  
- TypeScript backend development  

---

## 📦 Deliverables

- Complete backend implementation  
- API documentation  
- Postman collection  
- Database schema  
- Testing screenshots  

