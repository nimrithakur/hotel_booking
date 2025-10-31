# Hotel Booking Website - Professional Features

## 🎉 New Professional Features Added

### 1. **Unique Images for Every Hotel**
- ✅ Each hotel now has **5 unique, high-quality images** from Unsplash
- ✅ No repeating images across different hotels
- ✅ Images are professionally categorized by hotel type (Luxury, Boutique, Budget, Business, Beach)
- ✅ Hotel details page shows main hero image + 4 additional gallery images

### 2. **Professional Navigation (Navbar)**
- ✅ Gradient blue header with modern design
- ✅ Fully responsive mobile menu with hamburger icon
- ✅ Links: Home, Search Hotels, My Bookings, Contact, Profile
- ✅ Dynamic user greeting with name display
- ✅ Smooth hover effects and transitions
- ✅ Sticky navbar that stays on top while scrolling

### 3. **Contact Page**
- ✅ Professional contact form with validation
  - Full Name (required)
  - Email Address (required)
  - Phone Number (optional)
  - Subject (required)
  - Message (required)
- ✅ Contact information cards with:
  - 📍 Physical address
  - 📞 Phone numbers
  - 📧 Email addresses
  - 🕐 Business hours
- ✅ Social media links (Facebook, Twitter, Instagram, LinkedIn)
- ✅ Map placeholder for future integration
- ✅ Success/error message feedback
- ✅ Backend API endpoint: `POST /api/contact`

### 4. **My Bookings Page**
- ✅ View all your hotel bookings in one place
- ✅ Filter tabs: All, Upcoming, Past, Cancelled
- ✅ Each booking shows:
  - Hotel image and details
  - Check-in and check-out dates
  - Number of nights
  - Total price
  - Booking status (Confirmed, Pending, Cancelled)
  - Booking date
- ✅ Status badges with color coding:
  - ✅ Green: Confirmed
  - ⏳ Yellow: Pending
  - ❌ Red: Cancelled
- ✅ "View Hotel" button to go back to hotel details
- ✅ "Cancel Booking" option for upcoming reservations
- ✅ Backend API endpoint: `GET /api/bookings/my-bookings`

### 5. **Professional Footer**
- ✅ Multi-column layout with sections:
  - **Company Info**: Logo, description, social media links
  - **Quick Links**: Home, Search, My Bookings, Contact, Profile
  - **Popular Destinations**: Mumbai, Delhi, Bangalore, Goa, Jaipur
  - **Contact Info**: Address, phone, email, 24/7 support badge
- ✅ Newsletter subscription section with email input
- ✅ Footer bottom with:
  - Copyright notice
  - Privacy Policy, Terms of Service, Refund Policy links
  - "Made with ❤️" message
- ✅ Gradient design with smooth hover effects

### 6. **Enhanced HomePage**
- ✅ Hero section with background hotel image
- ✅ Search functionality for specific cities
- ✅ "Search All Hotels Across India" button
- ✅ City cards showing hotel counts per city
- ✅ Budget deals highlight section
- ✅ Responsive grid layout

## 📊 Database

### Hotels in Database
- **Total Hotels**: 100+ professional listings
- **Cities Covered**: Mumbai (15), Delhi (15), Bangalore (15), Kolkata (15), Chennai (10), Hyderabad (10), Pune (10), Jaipur (8), Goa (7), Agra (5)
- **Price Range**: ₹1,200 - ₹3,500 per night
- **Star Ratings**: 2-4 stars
- **Each Hotel Includes**:
  - 5 unique images
  - Detailed description
  - Amenities list
  - Accurate pricing
  - City and address information

## 🎨 Design Improvements

### Colors & Styling
- Professional gradient blue theme (#2563eb, #1d4ed8)
- Shadow effects for depth (shadow-lg, shadow-xl, shadow-2xl)
- Rounded corners for modern look (rounded-lg, rounded-xl, rounded-2xl)
- Smooth transitions and hover effects
- Responsive breakpoints (mobile, tablet, desktop)

### Typography
- Clear font hierarchy
- Readable text sizes
- Proper contrast for accessibility
- Font weights: normal (400), medium (500), semibold (600), bold (700)

## 🚀 How to Use

### Start the Application

1. **Start Backend Server**:
```bash
cd /home/sama/Desktop/Hotel_booking/backend
npm start
```
Backend runs on: http://localhost:5000

2. **Start Frontend**:
```bash
cd /home/sama/Desktop/Hotel_booking/frontend
npm run dev
```
Frontend runs on: http://localhost:3000

### Navigate the Website

1. **Home Page** (`/`):
   - Browse featured cities
   - Search hotels by city
   - View all hotels across India

2. **Search Results** (`/search` or `/search-results`):
   - Filter by budget categories
   - View special offers
   - See popular budget hotels
   - Click on hotel cards to view details

3. **Hotel Details** (`/hotel/:id`):
   - View 5 unique hotel images
   - Read full description
   - Check amenities
   - See pricing per night
   - Book your stay (requires login)

4. **Contact Page** (`/contact`):
   - Send inquiries via contact form
   - View contact information
   - Find business hours
   - Connect on social media

5. **My Bookings** (`/my-bookings`) *Protected - Login Required*:
   - View all your bookings
   - Filter by status (Upcoming/Past/Cancelled)
   - Check booking details
   - Cancel upcoming reservations
   - View hotel information

6. **Profile** (`/profile`) *Protected - Login Required*:
   - View your account information
   - Update profile details
   - Manage preferences

## 🔐 Authentication

- **Register**: Create new account with name, email, password
- **Login**: Access your account
- **Protected Routes**: My Bookings and Profile require login
- **JWT Token**: Secure authentication with 7-day expiration

## 📱 Responsive Design

All pages are fully responsive:
- **Mobile** (< 768px): Stacked layout, hamburger menu
- **Tablet** (768px - 1024px): 2-column grids
- **Desktop** (> 1024px): Multi-column layouts, expanded menu

## 🛠️ Technical Stack

### Frontend
- React 18 with Vite
- React Router for navigation
- Tailwind CSS for styling
- React Icons (FaIcons)
- Axios for API calls

### Backend
- Node.js + Express
- MongoDB with Mongoose
- JWT authentication
- Express Validator
- CORS enabled

### Database Structure
- **Users**: name, email, password (hashed)
- **Hotels**: name, city, address, description, price, starRating, amenities, images (array), owner
- **Bookings**: user, hotel, checkInDate, checkOutDate, guests, totalPrice, status

## 🎯 Key Features Summary

✅ **100+ hotels** with unique images
✅ **Professional navigation** with mobile menu
✅ **Contact page** with form submission
✅ **My Bookings** page with filtering
✅ **Professional footer** with all links
✅ **Unique images** for every hotel (no repeats)
✅ **Responsive design** for all devices
✅ **Budget-friendly** pricing (₹1,200-₹3,500)
✅ **Search & filter** functionality
✅ **User authentication** with JWT
✅ **Booking system** with confirmation
✅ **Status tracking** for bookings

## 🎨 Color Scheme

- **Primary**: Blue gradient (#2563eb → #1d4ed8)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)
- **Background**: Light gray (#f9fafb) with blue tint
- **Text**: Gray scale (#111827 → #6b7280)

## 📞 Support

For any issues or questions, use the Contact Page to reach out!

---

**Made with ❤️ for travelers across India**
