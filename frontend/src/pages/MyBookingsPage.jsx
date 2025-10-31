import { useState, useEffect } from 'react';
import { FaCalendar, FaMapMarkerAlt, FaStar, FaClock, FaCheckCircle, FaTimesCircle, FaHourglassHalf } from 'react-icons/fa';
import { formatCurrency } from '../utils/helpers';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, upcoming, past, cancelled

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      const response = await fetch('http://localhost:5000/api/bookings/my-bookings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        // API returns { success: true, data: bookings }
        setBookings(result.data || result);
      } else {
        console.error('Failed to fetch bookings:', response.status);
        setBookings([]);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}/cancel`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const result = await response.json();
        alert('Booking cancelled successfully!');
        // Refresh bookings
        fetchBookings();
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to cancel booking');
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('Failed to cancel booking. Please try again.');
    }
  };

  const getStatusBadge = (status) => {
    // Normalize status to lowercase for comparison
    const normalizedStatus = status?.toLowerCase() || 'pending';
    
    const badges = {
      confirmed: {
        icon: <FaCheckCircle />,
        class: 'bg-green-100 text-green-800 border-green-200',
        label: 'Confirmed'
      },
      pending: {
        icon: <FaHourglassHalf />,
        class: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        label: 'Pending'
      },
      cancelled: {
        icon: <FaTimesCircle />,
        class: 'bg-red-100 text-red-800 border-red-200',
        label: 'Cancelled'
      }
    };

    const badge = badges[normalizedStatus] || badges.pending;

    return (
      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold border ${badge.class}`}>
        {badge.icon}
        {badge.label}
      </span>
    );
  };

  const isUpcoming = (checkIn) => {
    return new Date(checkIn) > new Date();
  };

  const isPast = (checkOut) => {
    return new Date(checkOut) < new Date();
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'all') return true;
    const status = booking.status?.toLowerCase() || 'pending';
    if (filter === 'upcoming') return isUpcoming(booking.checkInDate) && status !== 'cancelled';
    if (filter === 'past') return isPast(booking.checkOutDate);
    if (filter === 'cancelled') return status === 'cancelled';
    return true;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const calculateNights = (checkIn, checkOut) => {
    const diff = new Date(checkOut) - new Date(checkIn);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center h-64"
        style={{
          backgroundImage: 'linear-gradient(rgba(37, 99, 235, 0.85), rgba(29, 78, 216, 0.85)), url(https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&q=80)',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">My Bookings</h1>
            <p className="text-xl">Manage and view all your hotel reservations</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-md p-2 mb-8 inline-flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              filter === 'all'
                ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              filter === 'upcoming'
                ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Upcoming ({bookings.filter(b => isUpcoming(b.checkInDate) && b.status?.toLowerCase() !== 'cancelled').length})
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              filter === 'past'
                ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Past ({bookings.filter(b => isPast(b.checkOutDate)).length})
          </button>
          <button
            onClick={() => setFilter('cancelled')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              filter === 'cancelled'
                ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Cancelled ({bookings.filter(b => b.status?.toLowerCase() === 'cancelled').length})
          </button>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="text-gray-400 mb-4">
              <FaCalendar className="text-6xl mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No bookings found</h2>
            <p className="text-gray-600 mb-6">
              {filter === 'all' 
                ? "You haven't made any bookings yet. Start exploring hotels!" 
                : `No ${filter} bookings found.`}
            </p>
            <a
              href="/"
              className="inline-block px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg"
            >
              Browse Hotels
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all"
              >
                <div className="md:flex">
                  {/* Hotel Image */}
                  <div className="md:w-1/3 relative">
                    <img
                      src={booking.hotel?.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80'}
                      alt={booking.hotel?.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      {getStatusBadge(booking.status)}
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="md:w-2/3 p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                          {booking.hotel?.name}
                        </h2>
                        <div className="flex items-center text-gray-600 mb-2">
                          <FaMapMarkerAlt className="mr-2" />
                          <span>{booking.hotel?.city}</span>
                        </div>
                        <div className="flex items-center text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={i < booking.hotel?.starRating ? 'text-yellow-500' : 'text-gray-300'}
                            />
                          ))}
                          <span className="ml-2 text-gray-600">({booking.hotel?.starRating} stars)</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center text-blue-700 mb-2">
                          <FaCalendar className="mr-2" />
                          <span className="font-semibold">Check-in</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">{formatDate(booking.checkInDate)}</p>
                      </div>

                      <div className="bg-purple-50 rounded-lg p-4">
                        <div className="flex items-center text-purple-700 mb-2">
                          <FaCalendar className="mr-2" />
                          <span className="font-semibold">Check-out</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">{formatDate(booking.checkOutDate)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-6 text-gray-600">
                      <div className="flex items-center">
                        <FaClock className="mr-2" />
                        <span>{calculateNights(booking.checkInDate, booking.checkOutDate)} nights</span>
                      </div>
                      <div className="font-semibold">•</div>
                      <div>
                        Booked on: {formatDate(booking.createdAt)}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                        <p className="text-3xl font-bold text-primary-600">
                          {formatCurrency(booking.totalPrice)}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <a
                          href={`/hotel/${booking.hotel?._id}`}
                          className="px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-all"
                        >
                          View Hotel
                        </a>
                        {booking.status?.toLowerCase() === 'confirmed' && isUpcoming(booking.checkInDate) && (
                          <button
                            onClick={() => handleCancelBooking(booking._id)}
                            className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all"
                          >
                            Cancel Booking
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
