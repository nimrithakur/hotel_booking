import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaStar,
  FaWifi,
  FaParking,
  FaSwimmingPool,
  FaTimes,
} from 'react-icons/fa';
import { hotelAPI, bookingAPI } from '../services/api';
import { isAuthenticated } from '../utils/auth';
import {
  formatCurrency,
  formatDateForDisplay,
  calculateNights,
  getTodayDate,
  getTomorrowDate,
} from '../utils/helpers';

const HotelDetailsPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    checkInDate: searchParams.get('checkIn') || getTodayDate(),
    checkOutDate: searchParams.get('checkOut') || getTomorrowDate(),
    guests: 1,
  });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  // Smart image handler for hotel images
  const getHotelImage = (index = 0) => {
    if (!hotel) return '';
    
    // Check multiple field names for images
    const images = hotel.images || hotel.imageUrls || [];
    if (images.length > index) {
      return images[index];
    }
    
    // Single image field
    if (index === 0 && hotel.image) {
      return hotel.image;
    }
    
    // ONLY professional hotel images - NO food, products, or random images
    const hotelOnlyImages = [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80', // Luxury hotel exterior
      'https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200&q=80', // Hotel bedroom
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80', // Modern hotel building
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80', // Hotel exterior night
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80', // Beach resort hotel
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80', // Hotel lobby
      'https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=1200&q=80', // Hotel suite
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80', // Hotel rooftop
    ];
    
    // Use hotel ID to consistently assign fallback images
    const baseIndex = (hotel._id || hotel.name || '').length % hotelOnlyImages.length;
    const imageIndex = (baseIndex + index) % hotelOnlyImages.length;
    return hotelOnlyImages[imageIndex];
  };

  useEffect(() => {
    fetchHotelDetails();
  }, [id]);

  const fetchHotelDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await hotelAPI.getById(id);
      setHotel(response.data.data);
    } catch (err) {
      console.error('Error fetching hotel:', err);
      setError(err.response?.data?.message || 'Error fetching hotel details');
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    if (!isAuthenticated()) {
      // Redirect to login with return URL
      navigate(`/login?redirect=/hotel/${id}`);
      return;
    }
    setShowBookingModal(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    try {
      setBookingLoading(true);
      setBookingError(null);

      const response = await bookingAPI.create({
        hotelId: id,
        checkInDate: bookingData.checkInDate,
        checkOutDate: bookingData.checkOutDate,
        guests: bookingData.guests,
      });

      alert('Booking confirmed successfully!');
      setShowBookingModal(false);
      navigate('/profile');
    } catch (err) {
      console.error('Booking error:', err);
      setBookingError(
        err.response?.data?.message || 'Error creating booking'
      );
    } finally {
      setBookingLoading(false);
    }
  };

  const nights = calculateNights(
    bookingData.checkInDate,
    bookingData.checkOutDate
  );
  const totalPrice = hotel ? nights * hotel.price : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading hotel details...</p>
        </div>
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded">
          {error || 'Hotel not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hotel Images Gallery */}
        <div className="mb-8">
          {/* Main Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-4 group">
            <img
              src={getHotelImage(0)}
              alt={hotel.name}
              className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">
                {hotel.name}
              </h1>
              <div className="flex items-center text-xl">
                <FaMapMarkerAlt className="mr-2" />
                <span>{hotel.city}</span>
              </div>
            </div>
            {hotel.starRating && (
              <div className="absolute top-6 right-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-4 py-2 rounded-full font-bold shadow-lg flex items-center text-lg">
                <FaStar className="mr-2" />
                <span>{hotel.starRating} Star Hotel</span>
              </div>
            )}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="relative rounded-xl overflow-hidden shadow-lg group">
                <img
                  src={getHotelImage(index)}
                  alt={`${hotel.name} view ${index + 1}`}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    // ONLY hotel images for fallback
                    const hotelFallbacks = [
                      'https://images.unsplash.com/photo-1455587734955-081b22074882?w=600&q=80', // Hotel bedroom
                      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80', // Hotel exterior
                      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80', // Hotel lobby
                      'https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=600&q=80'  // Hotel suite
                    ];
                    e.target.src = hotelFallbacks[index - 1];
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Hotel Details */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-2xl shadow-lg mb-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h2 className="text-3xl font-bold text-gray-900">
                      {hotel.name}
                    </h2>
                    {hotel.starRating && (
                      <div className="flex items-center bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg font-semibold">
                        <FaStar className="mr-1" />
                        {hotel.starRating}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center text-gray-600 text-lg">
                    <FaMapMarkerAlt className="mr-2 text-primary-600" />
                    <span>{hotel.address}</span>
                  </div>
                  <div className="mt-2 text-gray-500">
                    {hotel.city}
                  </div>
                </div>
                {hotel.averageRating > 0 && (
                  <div className="flex flex-col items-center bg-gradient-to-br from-green-500 to-green-600 text-white px-6 py-4 rounded-2xl shadow-lg">
                    <div className="flex items-center mb-1">
                      <FaStar className="mr-1 text-xl" />
                      <span className="text-3xl font-bold">
                        {hotel.averageRating.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-xs opacity-90">Guest Rating</span>
                  </div>
                )}
              </div>

              <div className="border-t pt-6">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">About This Hotel</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {hotel.description}
                </p>
              </div>
            </div>

            {/* Amenities */}
            {hotel.amenities && hotel.amenities.length > 0 && (
              <div className="bg-white p-8 rounded-2xl shadow-lg mb-6">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                  <span className="text-3xl mr-3">✨</span>
                  Amenities & Facilities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hotel.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center bg-gradient-to-r from-primary-50 to-blue-50 p-4 rounded-xl">
                      <span className="text-primary-600 mr-3 text-xl font-bold">✓</span>
                      <span className="text-gray-800 font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            {hotel.reviews && hotel.reviews.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Guest Reviews</h2>
                <div className="space-y-4">
                  {hotel.reviews.map((review, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">
                          {review.user?.username || 'Anonymous'}
                        </span>
                        <div className="flex items-center text-yellow-500">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <FaStar key={i} />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
              <div className="mb-6">
                <span className="text-3xl font-bold text-primary-600">
                  {formatCurrency(hotel.price)}
                </span>
                <span className="text-gray-600 ml-2">per night</span>
              </div>

              <button onClick={handleBookNow} className="btn-primary w-full mb-4">
                Book Now
              </button>

              <div className="text-sm text-gray-600 text-center">
                {isAuthenticated()
                  ? 'Click to book your stay'
                  : 'Login to book this hotel'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Confirm Booking</h2>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={24} />
              </button>
            </div>

            {bookingError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {bookingError}
              </div>
            )}

            <form onSubmit={handleBookingSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Check-in Date
                </label>
                <input
                  type="date"
                  value={bookingData.checkInDate}
                  onChange={(e) =>
                    setBookingData({
                      ...bookingData,
                      checkInDate: e.target.value,
                    })
                  }
                  min={getTodayDate()}
                  className="input-field"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Check-out Date
                </label>
                <input
                  type="date"
                  value={bookingData.checkOutDate}
                  onChange={(e) =>
                    setBookingData({
                      ...bookingData,
                      checkOutDate: e.target.value,
                    })
                  }
                  min={bookingData.checkInDate}
                  className="input-field"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Number of Guests
                </label>
                <input
                  type="number"
                  value={bookingData.guests}
                  onChange={(e) =>
                    setBookingData({
                      ...bookingData,
                      guests: parseInt(e.target.value) || 1,
                    })
                  }
                  min="1"
                  max="10"
                  className="input-field"
                  required
                />
              </div>

              {/* Booking Summary */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between mb-2">
                  <span>Hotel:</span>
                  <span className="font-semibold">{hotel.name}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Check-in:</span>
                  <span>{formatDateForDisplay(bookingData.checkInDate)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Check-out:</span>
                  <span>{formatDateForDisplay(bookingData.checkOutDate)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Guests:</span>
                  <span>{bookingData.guests}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Nights:</span>
                  <span>{nights}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
                  <span>Total Price:</span>
                  <span className="text-primary-600">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={bookingLoading || nights <= 0}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {bookingLoading ? 'Confirming...' : 'Confirm Booking'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelDetailsPage;
