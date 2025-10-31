import { useState, useEffect } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaHotel, FaUser, FaEnvelope, FaIdCard } from 'react-icons/fa';
import { bookingAPI } from '../services/api';
import { getUser } from '../utils/auth';
import {
  formatCurrency,
  formatDateForDisplay,
  calculateNights,
} from '../utils/helpers';

const ProfilePage = () => {
  const user = getUser();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await bookingAPI.getMyBookings();
      setBookings(response.data.data || []);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError(err.response?.data?.message || 'Error fetching bookings');
      setBookings([]); // Ensure bookings is always an array
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      setCancellingId(bookingId);
      await bookingAPI.cancel(bookingId);

      // Update bookings list
      setBookings(
        bookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: 'Cancelled' }
            : booking
        )
      );

      alert('Booking cancelled successfully');
    } catch (err) {
      console.error('Error cancelling booking:', err);
      alert(err.response?.data?.message || 'Error cancelling booking');
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isUpcoming = (checkInDate) => {
    return new Date(checkInDate) > new Date();
  };

  const upcomingBookings = bookings?.filter(
    (booking) => isUpcoming(booking.checkInDate) && booking.status !== 'Cancelled'
  ) || [];
  const pastBookings = bookings?.filter(
    (booking) => !isUpcoming(booking.checkInDate) || booking.status === 'Cancelled'
  ) || [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Profile Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="px-8 py-10">
            <div className="flex items-center space-x-6">
              {/* Profile Avatar */}
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                <FaUser className="text-primary-600 text-5xl" />
              </div>
              
              {/* Profile Info */}
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-white mb-3">
                  Welcome back, {user?.name || 'User'}!
                </h1>
                <div className="space-y-2">
                  <div className="flex items-center text-blue-50">
                    <FaIdCard className="mr-3 text-lg" />
                    <span className="font-medium text-lg">{user?.name}</span>
                  </div>
                  <div className="flex items-center text-blue-50">
                    <FaEnvelope className="mr-3 text-lg" />
                    <span className="font-medium text-lg">{user?.email}</span>
                  </div>
                </div>
              </div>

              {/* Stats Card */}
              <div className="hidden lg:block bg-white bg-opacity-20 backdrop-blur-sm rounded-xl px-6 py-4 text-center border-2 border-white border-opacity-30">
                <div className="text-3xl font-bold text-white">{bookings.length}</div>
                <div className="text-blue-100 font-medium">Total Bookings</div>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Upcoming Bookings */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Upcoming Bookings
            </h2>
            <span className="px-4 py-2 bg-primary-100 text-primary-700 font-semibold rounded-full">
              {upcomingBookings.length} {upcomingBookings.length === 1 ? 'Booking' : 'Bookings'}
            </span>
          </div>
          {upcomingBookings.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl shadow-lg text-center">
              <FaCalendarAlt className="mx-auto text-6xl text-gray-300 mb-4" />
              <p className="text-xl text-gray-600 font-medium">No upcoming bookings</p>
              <p className="text-gray-500 mt-2">Start planning your next adventure!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {upcomingBookings.map((booking) => (
                <BookingCard
                  key={booking._id}
                  booking={booking}
                  onCancel={handleCancelBooking}
                  isCancelling={cancellingId === booking._id}
                  getStatusColor={getStatusColor}
                />
              ))}
            </div>
          )}
        </div>

        {/* Past Bookings */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Past Bookings
            </h2>
            <span className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-full">
              {pastBookings.length} {pastBookings.length === 1 ? 'Booking' : 'Bookings'}
            </span>
          </div>
          {pastBookings.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl shadow-lg text-center">
              <FaHotel className="mx-auto text-6xl text-gray-300 mb-4" />
              <p className="text-xl text-gray-600 font-medium">No past bookings</p>
              <p className="text-gray-500 mt-2">Your booking history will appear here</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {pastBookings.map((booking) => (
                <BookingCard
                  key={booking._id}
                  booking={booking}
                  onCancel={handleCancelBooking}
                  isCancelling={cancellingId === booking._id}
                  getStatusColor={getStatusColor}
                  isPast={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Booking Card Component
const BookingCard = ({
  booking,
  onCancel,
  isCancelling,
  getStatusColor,
  isPast = false,
}) => {
  const nights = calculateNights(booking.checkInDate, booking.checkOutDate);
  const canCancel =
    !isPast &&
    booking.status !== 'Cancelled' &&
    new Date(booking.checkInDate) > new Date();

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Hotel Image */}
        <div className="md:w-1/3 relative">
          <img
            src={
              booking.hotel?.imageUrls?.[0] ||
              booking.hotel?.image ||
              'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop'
            }
            alt={booking.hotel?.name || 'Hotel'}
            className="w-full h-64 md:h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <span
              className={`px-4 py-2 rounded-full font-bold shadow-lg ${getStatusColor(
                booking.status
              )}`}
            >
              {booking.status}
            </span>
          </div>
        </div>

        {/* Booking Details */}
        <div className="md:w-2/3 p-6">
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              <FaHotel className="inline mr-2 text-primary-600" />
              {booking.hotel?.name}
            </h3>
            <div className="flex items-center text-gray-600">
              <FaMapMarkerAlt className="mr-2 text-primary-600" />
              <span>
                {booking.hotel?.city}, {booking.hotel?.state}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600">
                <FaCalendarAlt className="inline mr-2" />
                Check-in
              </p>
              <p className="font-semibold">
                {formatDateForDisplay(booking.checkInDate)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                <FaCalendarAlt className="inline mr-2" />
                Check-out
              </p>
              <p className="font-semibold">
                {formatDateForDisplay(booking.checkOutDate)}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 rounded-xl mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Nights:</span>
              <span className="font-semibold">{nights}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Guests:</span>
              <span className="font-semibold">{booking.guests || 1}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Price per night:</span>
              <span className="font-semibold">
                {formatCurrency(booking.hotel?.price || 0)}
              </span>
            </div>
            <div className="flex justify-between border-t border-gray-300 pt-2 mt-2">
              <span className="font-bold text-lg">Total Price:</span>
              <span className="font-bold text-xl text-primary-600">
                {formatCurrency(booking.totalPrice)}
              </span>
            </div>
          </div>

          {canCancel && (
            <button
              onClick={() => onCancel(booking._id)}
              disabled={isCancelling}
              className="w-full md:w-auto bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg"
            >
              {isCancelling ? 'Cancelling...' : 'Cancel Booking'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
