# 🛒 Tonar E-Commerce Backend API

A scalable, secure, and production-ready **Node.js backend** for an e-commerce platform, built with **Clean Architecture**, **JWT + Cookie-based Authentication**, and **role-based access control**.

This backend is designed so that:
- Only **Admins** can manage products
- Users can manage profiles, addresses, carts, orders, etc.
- Schemas are published and reused via **npm package**

---

## 🚀 Deployment Render

- https://tonarapi-s.onrender.com

## 📄 API Documentation

- [POSTMAN](https://documenter.getpostman.com/view/48027804/2sBXVZpF9L)

## 🧱 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **Cookie-based sessions**
- **Awilix (Dependency Injection)**
- **bcrypt**
- **Validator**
- **Cloudinary (for product images – optional)**
- **Clean Architecture**

## 🚀 Installation & Setup

```
git clone https://github.com/ashu2764/TonarApi-s
cd tonarapi's

npm install

npm run dev
```

## ⚙️ Environment Variables
Create a .env file in the root directory:
```
PORT=5000
NODE_ENV=development

MongoDB = MONGODB_URI=mongodb://localhost:27017/tonar_db

JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

CLIENT_URL=http://localhost:3000

```

---

## 📂 Project Architecture
src/
├── apps/
│   ├── auth/          # Authentication module
│   ├── user/          # User management
│   ├── address/       # Address management
│   ├── product/       # Product management
│   ├── category/      # Category management (planned)
│   ├── cart/          # Shopping cart (planned)
│   ├── wishlist/      # Wishlist (planned)
│   ├── order/         # Order management (planned)
│   └── payment/       # Payment processing (planned)
├── infrastructure/
│   ├── middlewares/   # Custom middlewares
│    ├── db/            # DB connection
│    ├── email/         # email service for reset password otp
│   ├── error-handling/# Error handling utilities
│   └── cloudinary/    # Cloudinary integration        
├── app.js             # Express app setup
└── server.js          # Server entry point


### Each module follows: routes → controller → usecase → repository


---

## 🗄️ Database Schemas

### Database schemas are published as a separate npm package:
- User Schema
- Address Schema
- Product Schema

`` npm install @ashu2764/tonar-db-schema ``

`` import { UserSchema, AddressSchema, ProductSchema } from "@ashu2764/tonar-db-schema";``

## ✅ COMPLETED FEATURES

### 🔐 Authentication APIs

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/forgot-password (OTP based)
POST /api/auth/reset-password
```


✔ Cookie-based authentication  
✔ Password hashing with bcrypt  
✔ OTP-based reset password  
✔ Secure error handling  

---

### 👤 User APIs

```
GET /api/user/profile
PUT /api/user/profile
PUT /api/user/change-password
DELETE /api/user/delete-account
```


✔ Authenticated access  
✔ Password verification  
✔ Account deletion clears session  

---

### 📍 Address APIs
```
POST /api/address
GET /api/address
PUT /api/address/:id
DELETE /api/address/:id
```


✔ User-specific addresses  
✔ Ownership validation  
✔ Secure update & delete  
✔ Address schema published separately  

---

### 📦 Product APIs (Admin Only)

```
POST /api/product (Admin)
GET /api/products
GET /api/product/:id
PUT /api/product/:id (Admin)
DELETE /api/product/:id (Admin)
```


✔ Role-based access control  
✔ Admin-only CRUD  
✔ Product image support via Cloudinary  
✔ Clean separation of concerns  

---

🖼️ Image Handling

Images are stored in Cloudinary
Only image URLs are stored in MongoDB
Supports multiple product images
Ready for production CDN usage

🔒 Security Features

HTTP-only cookies
JWT authentication
Role-based middleware
Ownership checks (user ↔ address)
Centralized error handling

## 🚧 NEXT STEPS (PLANNED)

### 🏷️ Category Module
```
POST /api/category          (Admin)
GET  /api/categories
PUT  /api/category/:id      (Admin)
DELETE /api/category/:id    (Admin)
```
### 🛒 Cart Module
```
POST /api/cart/add
GET  /api/cart
PUT  /api/cart/update
DELETE /api/cart/remove/:productId
```
### ❤️ Wishlist Module

```
POST /api/wishlist/add
GET  /api/wishlist
DELETE /api/wishlist/remove/:productId
```
### 📦 Order Module

```
POST /api/order
GET  /api/orders
GET  /api/order/:id
PUT  /api/order/cancel/:id
```

### 💳 Payment Module

```
POST /api/payment/create
POST /api/payment/verify
GET  /api/payment/status/:orderId
```
``(Razorpay / Stripe integration planned)``
### 📊 Admin Dashboard APIs

```
GET /api/admin/users
GET /api/admin/products
GET /api/admin/orders
PUT /api/admin/order-status/:id
```


## Authors

- [@ashu2764](https://github.com/ashu2764)

