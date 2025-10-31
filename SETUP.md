# 🚀 Quick Setup Guide

Follow these steps to get your hotel booking application up and running:

## Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

## Step 2: Start MongoDB

Make sure MongoDB is running on your system:

```bash
# If using local MongoDB
mongod

# Or if MongoDB is already running as a service, skip this step
```

## Step 3: Seed the Database

Populate the database with sample hotel data:

```bash
cd backend
npm run seed
```

You should see a message: "🎉 Database seeded successfully!"

## Step 4: Start the Backend Server

```bash
cd backend
npm run dev
```

The backend should start on http://localhost:5000

## Step 5: Install Frontend Dependencies

Open a new terminal window:

```bash
cd frontend
npm install
```

## Step 6: Start the Frontend

```bash
cd frontend
npm run dev
```

The frontend should start on http://localhost:3000

## Step 7: Open Your Browser

Navigate to: http://localhost:3000

## 🎯 Test the Application

1. **Register a new account:**
   - Click "Register" in the navbar
   - Fill in the form and create an account

2. **Search for hotels:**
   - On the home page, enter a city (e.g., "Mumbai", "Delhi", "Goa")
   - Select check-in and check-out dates
   - Click "Search Hotels"

3. **View hotel details:**
   - Click on any hotel card to see full details

4. **Book a hotel:**
   - On the hotel details page, click "Book Now"
   - Confirm your booking dates
   - Click "Confirm Booking"

5. **View your bookings:**
   - Click on your username in the navbar
   - You'll see all your upcoming and past bookings

6. **Cancel a booking:**
   - In your profile, find an upcoming booking
   - Click "Cancel Booking"

## 🔧 Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is installed and running
- Check if the MONGODB_URI in `.env` is correct

### Port Already in Use
- Backend: Change PORT in `.env` file
- Frontend: The port will be auto-assigned if 3000 is busy

### Cannot Login After Registration
- Check browser console for errors
- Make sure backend is running on port 5000

## 📱 Sample Cities to Search

Try searching for these Indian cities:
- Mumbai
- Delhi
- Bangalore
- Kolkata
- Chennai
- Hyderabad
- Pune
- Jaipur
- Goa
- Agra
- Udaipur
- Shimla

## 🎨 Technologies Used

- **Frontend:** React, Tailwind CSS, Vite
- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT, bcrypt

## 📚 API Documentation

### Public Endpoints
- `GET /api/hotels/search?city=Mumbai&checkIn=2024-01-01&checkOut=2024-01-05`
- `GET /api/hotels/:id`

### Protected Endpoints (require JWT token)
- `POST /api/bookings/create`
- `GET /api/bookings/my-bookings`
- `PUT /api/bookings/:bookingId/cancel`

Enjoy building and testing your hotel booking application! 🏨✨
