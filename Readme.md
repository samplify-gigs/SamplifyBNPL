# Samplify BNPL

> A modern Buy Now, Pay Later (BNPL) platform that enables merchants to offer installment payment options to their customers through secure payment links , works for bussiness niches.


---

## Overview

Samplify BNPL is a full-stack web application built to simplify installment payments for businesses.

Merchants can register, verify their accounts, create product payment links, and allow customers to purchase products through flexible payment plans.

The project is built with a modern TypeScript stack using **Next.js**, **Express.js**, and **PostgreSQL (Supabase)**.

## Project Status

> **⚠️ Note:** This project is primarily intended as a **boilerplate and proof of concept** for a Buy Now, Pay Later (BNPL) platform.

Although the application can be deployed and run in a production environment, it is **not production-ready** in its current state. Several features are intentionally simplified, and additional development would be required before launching a commercial BNPL service.

### Current Limitations

* Security implementation is currently at a **basic level** and should be strengthened before production deployment.
* Some pages and workflows contain **mock data** for demonstration purposes.
* Business logic has been implemented as a foundation but requires further refinement and testing.
* Error handling, monitoring, auditing, and advanced authorization are still planned improvements.

### Current Core Functionality

The current implementation focuses on demonstrating the core BNPL workflow, including:

* Merchant registration and authentication
* Merchant dashboard
* Product payment link generation
* Customer payment sessions
* Credit score evaluation
* Loan approval workflow
* Customer credit history management

### Payment Processing

Payment processing is currently integrated using the **Mono Sandbox** environment for development and testing purposes.

Launching a real Buy Now, Pay Later platform requires compliance with financial regulations, licensing, legal agreements, and live payment infrastructure.

Once those requirements are met, the project has already been structured to support production integrations with minimal architectural changes. The services, controllers, and application boilerplate have been designed to make replacing the sandbox implementation with a live provider straightforward.

### Purpose of the Project

This project was developed primarily to demonstrate:

* Full-stack application architecture
* Express.js backend development
* Next.js frontend development
* PostgreSQL database integration
* Authentication and authorization
* Payment workflow design
* Scalable project structure suitable for future expansion into a production BNPL platform



---

## Features

### Merchant Features

* Merchant registration
* Email verification
* Secure login
* Merchant dashboard
* Manual verification workflow
* Product payment link generation

### Customer Features

* Open payment links
* View product details
* Select payment options
* Create payment sessions

### Authentication & Security

* JWT Authentication
* HTTP-only Cookies
* Password hashing with bcrypt
* Zod validation
* Protected routes
* CORS protection
* Environment variables

---

# Tech Stack

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

## Backend

* Express.js
* TypeScript
* PostgreSQL
* JWT
* Zod
* Bcrypt
* Cookie Parser
* CORS
* Resend Email API

## Database

* Supabase PostgreSQL

## Deployment

Frontend

* Vercel

Backend

* Render

Database

* Supabase

---

# Project Structure

```text
SamplifyBNPL/

├── frontend/
│   ├── app/
│   ├── components/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── database/
│   │   └── server.ts
│   └── package.json
│
└── README.md
```

---

# System Architecture

```text
                Customer / Merchant
                        │
                        ▼
               Next.js Frontend (Vercel)
                        │
          REST API Requests (HTTPS)
                        │
                        ▼
           Express.js Backend (Render)
                        │
                        ▼
          PostgreSQL Database (Supabase)
```

---

# Installation

## Clone the repository

```bash
git clone https://github.com/samplify-gigs/SamplifyBNPL.git
```

---

## Install Frontend

```bash
cd frontend
npm install
```

---

## Install Backend

```bash
cd backend
npm install
```

---

# Environment Variables

## Frontend

Create a `.env.local`

```env
NEXT_PUBLIC_BASE_URL=http://localhost:8080
```

---

## Backend

Create a `.env`

```env
PORT=8080

DATABASE_URL=

JWT_SECRET=

RESEND_API_KEY=

FRONTEND_URL=http://localhost:3000
```

---

# Running the Project

## Backend

```bash
npm run dev
```

Runs the Express server.

---

## Frontend

```bash
npm run dev
```

Runs the Next.js application.

---

# Production Build

Backend

```bash
npm run build
```

```bash
npm start
```

Frontend

```bash
npm run build
```

---

# API Modules

## Authentication

* Merchant Registration
* Merchant Login
* Email Verification

## Merchant

* Merchant Dashboard
* Merchant Profile

## Products

* Create Product Payment Link
* Retrieve Payment Link

## Customer

* Customer Payment Session

---

# Security

This project implements:

* HTTP-only authentication cookies
* JWT authentication
* Password hashing with bcrypt
* Input validation using Zod
* Environment variable protection
* Secure CORS configuration

---

# Future Roadmap

* Credit scoring integration
* Multiple BNPL providers
* Admin dashboard
* Merchant analytics
* Repayment reminders
* Customer dashboard
* File uploads
* Role-based permissions
* Two-factor authentication
* API documentation (Swagger)
* NestJS microservice migration

---

## Challenges & Lessons Learned

One of the biggest technical challenges encountered during development was implementing a reliable authentication flow across different browsers and mobile devices.

Initially, the application relied entirely on **HTTP-only cookies** for session management. While this worked consistently on desktop browsers, differences in how mobile browsers—particularly on **iOS** and some **Android** devices—handle cookies resulted in inconsistent authentication behavior during testing.

To ensure a smoother user experience while continuing development, the authentication strategy was adjusted:

* Desktop browsers continue to use **HTTP-only cookies** for session management.
* A **localStorage-based** authentication approach was implemented for iOS devices where cookie handling proved unreliable during testing.

This decision was made as a practical workaround for the prototype and demonstration phase. For a production-grade application, the authentication flow should be revisited to implement a more robust cross-platform solution that maintains strong security while ensuring compatibility across all browsers and devices.

This challenge provided valuable experience in understanding browser-specific behavior, cross-origin authentication, CORS configuration, cookie policies (`SameSite`, `Secure`, `HttpOnly`), and the trade-offs between different client-side authentication strategies.


# Screenshots

## Landing Page

> ![Dashboard](samplify-images\dashboard.png)

---

## Merchant login

---

> ![merchant login](samplify-images\login.png)


## Merchant Registration

> ![Merchant registration](samplify-images\signup.png)

---

## Merchant Dashboard

> ![merchant dashboard](samplify-images\dashboard.png)

---

## Customer Payment Link

> ![customer](samplify-images\paymentlink.png)

---

## Payment 

> ![payment](samplify-images\payment.png)

---

# Learning Goals

This project was built to deepen understanding of:

* Full-stack TypeScript development
* Express.js backend architecture
* Authentication using JWT and Cookies
* PostgreSQL database design
* REST API development
* Deployment using Vercel, Render, and Supabase
* Production environment configuration

---

# Author

**Samplify**
samplify@gmail.com

GitHub: https://github.com/samplify-gigs

---

# License

This project is licensed under the MIT License.

