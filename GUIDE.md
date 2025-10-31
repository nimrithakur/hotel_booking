# 🏨 Hotel Booking Application - Complete Guide

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Installation](#installation)
6. [API Documentation](#api-documentation)
7. [User Guide](#user-guide)

---

## 🎯 Project Overview

A full-stack hotel booking application for India built with the MERN stack. Users can search for hotels across Indian cities, view detailed hotel information, make bookings, and manage their reservations.

---

## ✨ Features

### User Features
- 🔐 User registration and authentication
- 🔍 Search hotels by city and dates
- 🏨 View detailed hotel information
- 📅 Book hotels with date selection
- 👤 View booking history
- ❌ Cancel upcoming bookings

### Technical Features
- 🔒 JWT-based authentication
- 🔑 Bcrypt password hashing
- ✅ Input validation
- 🚫 Prevent double bookings
- 📱 Responsive design
- ⚡ Real-time availability checking

---

## 🛠 Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router DOM** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Icons** - Icons

---

## 📁 Project Structure

```
Hotel_booking/
│
├── backend/                    # Backend server
│   ├── models/                # Database models
│   │   ├── User.js           # User schema
│   │   ├── Hotel.js          # Hotel schema
│   │   └── Booking.js        # Booking schema
│   │
│   ├── routes/               # API routes
│   │   ├── authRoutes.js    # Authentication routes
│   │   ├── hotelRoutes.js   # Hotel routes
│   │   └── bookingRoutes.js # Booking routes
│   │
│   ├── middleware/           # Custom middleware
│   │   └── authMiddleware.js # JWT authentication
│   │
│   ├── server.js            # Express server setup
│   ├── seed.js              # Database seeding script
│   ├── package.json         # Backend dependencies
│   └── .env                 # Environment variables
│
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── HotelCard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── pages/           # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── SearchResultsPage.jsx
│   │   │   ├── HotelDetailsPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   └── ProfilePage.jsx
│   │   │
│   │   ├── services/        # API services
│   │   │   └── api.js
│   │   │
│   │   ├── utils/           # Utility functions
│   │   │   ├── auth.js
│   │   │   └── helpers.js
│   │   │
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles
│   │
│   ├── index.html           # HTML template
│   ├── vite.config.js       # Vite configuration
│   ├── tailwind.config.js   # Tailwind configuration
│   └── package.json         # Frontend dependencies
│
├── README.md                # Project documentation
├── SETUP.md                 # Setup instructions
└── PROJECT_SUMMARY.md       # Complete feature list
```

---

## 🚀 Installation

### Prerequisites
```bash
Node.js (v14+)
MongoDB (local or Atlas)
npm or yarn
```

### Step-by-Step Setup

#### 1. Clone or navigate to the project
```bash
cd /home/sama/Desktop/Hotel_booking
```

#### 2. Backend Setup
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# The .env file is already created with:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/hotel_booking
# JWT_SECRET=your_jwt_secret_key_here_change_in_production_to_something_secure_and_random
# JWT_EXPIRE=7d
# NODE_ENV=development

# Start MongoDB (if not running)
# mongod

# Seed the database with sample hotels
npm run seed

# Start the backend server
npm run dev
```

Backend will run on: **http://localhost:5000**

#### 3. Frontend Setup
```bash
# Open a new terminal
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Frontend will run on: **http://localhost:3000**

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Routes

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}

Response: 201 Created
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": { "id": "...", "username": "...", "email": "..." },
    "token": "jwt_token_here"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { "id": "...", "username": "...", "email": "..." },
    "token": "jwt_token_here"
  }
}
```

### Hotel Routes (Public)

#### Search Hotels
```http
GET /api/hotels/search?city=Mumbai&checkIn=2024-01-01&checkOut=2024-01-05&minPrice=1000&maxPrice=10000

Response: 200 OK
{
  "success": true,
  "count": 5,
  "data": [ /* array of hotels */ ]
}
```

#### Get Hotel by ID
```http
GET /api/hotels/:id

Response: 200 OK
{
  "success": true,
  "data": { /* hotel object with reviews */ }
}
```

### Booking Routes (Protected - Requires JWT)

#### Create Booking
```http
POST /api/bookings/create
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "hotelId": "hotel_id_here",
  "checkInDate": "2024-01-01",
  "checkOutDate": "2024-01-05"
}

Response: 201 Created
{
  "success": true,
  "message": "Booking created successfully",
  "data": { /* booking object */ }
}
```

#### Get My Bookings
```http
GET /api/bookings/my-bookings
Authorization: Bearer {jwt_token}

Response: 200 OK
{
  "success": true,
  "count": 3,
  "data": [ /* array of bookings */ ]
}
```

#### Cancel Booking
```http
PUT /api/bookings/:bookingId/cancel
Authorization: Bearer {jwt_token}

Response: 200 OK
{
  "success": true,
  "message": "Booking cancelled successfully",
  "data": { /* updated booking */ }
}
```

---

## 👤 User Guide

### 1. Register an Account
1. Click **"Register"** in the navbar
2. Fill in:
   - Username (minimum 3 characters)
   - Email address
   - Password (minimum 6 characters)
   - Confirm password
3. Click **"Register"**
4. You'll be automatically logged in and redirected to the home page

### 2. Search for Hotels
1. On the home page, enter:
   - **City** (e.g., Mumbai, Delhi, Goa)
   - **Check-in date**
   - **Check-out date**
2. Click **"Search Hotels"**
3. Or click on any popular city card

### 3. Filter Results
On the search results page:
- Use the sidebar to filter by:
  - City
  - State
  - Price range
  - Dates
- Click **"Apply Filters"**

### 4. View Hotel Details
1. Click on any hotel card or **"View Details"** button
2. View:
   - Hotel images
   - Description and address
   - Amenities
   - Reviews and ratings
   - Price per night

### 5. Book a Hotel
1. On the hotel details page, click **"Book Now"**
2. If not logged in, you'll be redirected to login
3. In the booking modal:
   - Select check-in and check-out dates
   - Review the booking summary
   - See total price calculation
4. Click **"Confirm Booking"**
5. You'll be redirected to your profile page

### 6. Manage Bookings
1. Click on your username in the navbar
2. View:
   - **Upcoming Bookings** - Future reservations
   - **Past Bookings** - Previous stays
3. To cancel a booking:
   - Find the booking in "Upcoming Bookings"
   - Click **"Cancel Booking"**
   - Confirm the cancellation

### 7. Logout
- Click **"Logout"** in the navbar

---

## 🎨 Sample Data

After running `npm run seed`, you'll have 20 sample hotels across these cities:

**Luxury Hotels:**
- Mumbai (Taj Mahal Palace - ₹15,000/night)
- Delhi (The Oberoi - ₹12,000/night)
- Udaipur (Taj Lake Palace - ₹25,000/night)
- Jaipur (Rambagh Palace - ₹18,000/night)

**Mid-Range Hotels:**
- Bangalore (Hotel Saffron - ₹2,500/night)
- Goa (Sea View Resort - ₹5,000/night)
- Chennai (Marina Beach Hotel - ₹3,800/night)

And many more across Hyderabad, Agra, Kolkata, and other cities!

---

## 🔒 Security Features

- ✅ Passwords hashed with bcrypt (10 rounds)
- ✅ JWT tokens with 7-day expiration
- ✅ Protected API routes
- ✅ Authorization checks (users can only manage their own bookings)
- ✅ Input validation on all forms
- ✅ SQL injection prevention (MongoDB/Mongoose)
- ✅ XSS protection

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running: `mongod`

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change PORT in `.env` or stop the process using the port

### Cannot Login After Registration
**Solution:** 
1. Check browser console for errors
2. Ensure backend is running on port 5000
3. Check if JWT_SECRET is set in `.env`

### Hotels Not Showing
**Solution:** Run the seed script: `npm run seed` in backend directory

---

## 📝 Notes

- The application uses placeholder images from `via.placeholder.com`
- Replace these with real hotel images in production
- Change JWT_SECRET in `.env` to a secure random string in production
- Consider using MongoDB Atlas for production database
- Add HTTPS in production

---

## 🎉 Enjoy Your Hotel Booking Application!

For questions or issues, check the PROJECT_SUMMARY.md for complete feature details.

Happy Coding! 🚀
