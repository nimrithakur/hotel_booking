# Hotel Booking Application - MERN Stack

A fullstack hotel booking web application for India built with MongoDB, Express.js, React, and Node.js.

## 🌟 Features

### Backend
- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **Hotel Management**: Search hotels by city, state, price range, and availability
- **Booking System**: Create, view, and cancel bookings with date validation
- **Database Models**: Well-structured Mongoose schemas for Users, Hotels, and Bookings

### Frontend
- **Modern UI**: Beautiful, responsive design using Tailwind CSS
- **Hotel Search**: Search hotels by city with date range selection
- **Hotel Details**: Detailed hotel views with images, amenities, and reviews
- **User Profile**: View and manage bookings
- **Protected Routes**: Secure routes requiring authentication

## 📁 Project Structure

```
Hotel_booking/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Hotel.js
│   │   └── Booking.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── hotelRoutes.js
│   │   └── bookingRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── HotelCard.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   ├── SearchResultsPage.jsx
    │   │   ├── HotelDetailsPage.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   └── ProfilePage.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── utils/
    │   │   ├── auth.js
    │   │   └── helpers.js
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hotel_booking
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

4. Start MongoDB (if running locally):
```bash
mongod
```

5. Start the backend server:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📝 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Hotel Routes (Public)
- `GET /api/hotels/search` - Search hotels with filters
- `GET /api/hotels/:id` - Get hotel details
- `GET /api/hotels` - Get all hotels

### Booking Routes (Protected)
- `POST /api/bookings/create` - Create a new booking
- `GET /api/bookings/my-bookings` - Get user's bookings
- `PUT /api/bookings/:bookingId/cancel` - Cancel a booking
- `GET /api/bookings/:bookingId` - Get booking details

## 🎨 Frontend Pages

1. **Home Page** - Search bar with city and date inputs
2. **Search Results** - List of hotels matching search criteria
3. **Hotel Details** - Detailed hotel information with booking modal
4. **Login/Register** - User authentication forms
5. **Profile** - User's bookings with cancel functionality

## 🔐 Authentication Flow

1. User registers or logs in
2. JWT token is generated and stored in localStorage
3. Token is sent with protected API requests via Authorization header
4. Backend middleware validates the token

## 💾 Database Models

### User Schema
- username (String, unique)
- email (String, unique)
- password (String, hashed)
- bookings (Array of Booking references)

### Hotel Schema
- name, city, state, address, description
- pricePerNight (Number)
- amenities (Array of Strings)
- imageUrls (Array of Strings)
- reviews (Array of review objects)
- averageRating (Number)

### Booking Schema
- user (Reference to User)
- hotel (Reference to Hotel)
- checkInDate, checkOutDate (Date)
- totalPrice (Number)
- status (Enum: Pending, Confirmed, Cancelled)

## 🛠️ Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- express-validator
- CORS

### Frontend
- React 18
- React Router DOM
- Vite
- Tailwind CSS
- Axios
- React Icons

## 📦 Additional Features

- Date validation for bookings
- Availability checking (prevents double bookings)
- Responsive design for mobile and desktop
- Loading states and error handling
- Protected routes for authenticated users
- User-friendly error messages

## 🧪 Testing the Application

1. Register a new user account
2. Login with your credentials
3. Search for hotels by city (e.g., "Mumbai", "Delhi")
4. View hotel details
5. Book a hotel (requires login)
6. View your bookings in the Profile page
7. Cancel upcoming bookings

## 🔧 Development Tips

- Make sure MongoDB is running before starting the backend
- Use different terminal windows for backend and frontend
- Check browser console for debugging frontend issues
- Check terminal logs for backend API responses

## 📄 License

This project is open source and available for educational purposes.

## 👥 Contributing

Feel free to fork this project and submit pull requests for improvements!
# hotel_booking
