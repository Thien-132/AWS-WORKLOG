---
title: "Project Report: Music Instrument Store Web Application"
date: 2026-07-10
weight: 1
chapter: false
pre: " <b> 6.1. </b> "
---

# PROJECT REPORT: DESIGN & DEVELOPMENT OF MUSIC INSTRUMENT STORE WEB APPLICATION

---

## 1. Project Overview

**Music Instrument Store** is an e-commerce web application dedicated to selling musical instruments and audio equipment (Guitars, Pianos, Drums, Violins, Audio Interface, and accessories).

The primary objective of this project is to build a modern, high-performance online shopping platform. It enables customers to easily browse instruments, listen to audio demos, place orders, and manage purchases. Furthermore, the system is designed to integrate seamlessly with **AWS Cloud** infrastructure to ensure scalability, high availability, and data security.

---

## 2. System Architecture & Tech Stack

### 2.1. Technology Stack

| Layer | Technologies / Services | Description |
| :--- | :--- | :--- |
| **Frontend** | React.js / HTML5, CSS3, JavaScript | Responsive UI, optimized for user experience and performance across devices. |
| **Backend API** | Node.js (Express.js) | RESTful API server handling business logic, authentication, and database requests. |
| **Database** | PostgreSQL / MySQL / MongoDB | Relational/Document DB storing product catalogs, user accounts, and orders. |
| **AWS Cloud Infrastructure** | S3, CloudFront, EC2, RDS, IAM | Static media hosting, CDN distribution, managed DB, and access control. |

### 2.2. AWS Infrastructure Overview

- **Amazon S3 & CloudFront**: Hosts static media assets (instrument images, sound demo audio files) with global CDN caching.
- **AWS EC2 / App Runner**: Hosts the backend application and RESTful API endpoints.
- **Amazon RDS (PostgreSQL/MySQL)**: Managed relational database deployed inside a private subnet for data security and automated backup.
- **AWS IAM**: Enforces Least Privilege access policies across all cloud services.

---

## 3. Key Features

### 3.1. Client / Customer Portal
1. **Homepage & Catalog Browsing**: Featured banners, category categorization (String, Keyboard, Percussion, Wind), top sellers, and promotions.
2. **Advanced Search & Filtering**: Filter instruments by brand (Fender, Yamaha, Roland, Gibson...), price range, and specs.
3. **Product Detail Page**: High-resolution image galleries, detailed specifications, customer reviews, and audio demo playback.
4. **Shopping Cart & Checkout**: Interactive cart management, total price calculation, and checkout workflows.
5. **User Management**: Registration, JWT-based login, order history tracking, and wishlist management.

### 3.2. Administrator Dashboard
1. **Product Management**: CRUD operations for instruments, stock inventory tracking, and price updates.
2. **Order Fulfillment**: Order review and status updates (Pending -> Shipping -> Completed).
3. **Analytics & Reports**: Monthly sales summary, best-selling products, and new user metrics.

---

## 4. Local Development Setup

### 4.1. Prerequisites
- **Node.js**: Version 18.x or higher
- **npm** or **yarn**
- **Git**

### 4.2. Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Thien-132/music-instrument-store.git
   cd music-instrument-store
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables (`.env`):**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   DATABASE_URL=postgres://user:password@localhost:5432/music_store_db
   JWT_SECRET=your_jwt_secret_key
   AWS_S3_BUCKET_NAME=your-music-store-bucket
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   The backend API will run on `http://localhost:5000` and the frontend on `http://localhost:3000`.

---

## 5. Future Enhancements

- Integration of AR (Augmented Reality) for 3D instrument preview.
- Integration of online payment gateways (Stripe / PayPal / Momo).
- Automated CI/CD deployment pipeline using GitHub Actions and AWS CodePipeline.

---

## 6. Source Code Repository

🔗 **Official GitHub Repository Link:**  
[https://github.com/Thien-132/music-instrument-store.git](https://github.com/Thien-132/music-instrument-store.git)
