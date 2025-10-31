#!/bin/bash

echo "🏨 Hotel Booking Application - Quick Start Script"
echo "=================================================="
echo ""

# Check if MongoDB is running
echo "Checking MongoDB connection..."
if ! mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; then
    echo "⚠️  Warning: MongoDB doesn't seem to be running."
    echo "Please start MongoDB with: mongod"
    echo ""
    read -p "Press Enter once MongoDB is running, or Ctrl+C to exit..."
fi

# Backend setup
echo ""
echo "📦 Setting up Backend..."
cd backend

if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
fi

if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found in backend directory"
    echo "The .env file should already exist. Please check."
fi

echo ""
echo "🌱 Seeding database with sample hotels..."
npm run seed

echo ""
echo "🚀 Starting backend server..."
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Frontend setup
echo ""
echo "📦 Setting up Frontend..."
cd ../frontend

if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

echo ""
echo "🚀 Starting frontend server..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Application is starting!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Backend:  http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for Ctrl+C
trap "echo ''; echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT
wait
