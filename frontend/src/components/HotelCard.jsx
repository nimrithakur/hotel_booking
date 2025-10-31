import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { formatCurrency } from '../utils/helpers';

const HotelCard = ({ hotel, checkIn, checkOut, showOffer = false }) => {
  // Use actual hotel image or fallback to a proper hotel image
  const getHotelImage = () => {
    // First check if hotel has images from database
    if (hotel.images && hotel.images.length > 0) {
      return hotel.images[0];
    }
    // Check for imageUrls field
    if (hotel.imageUrls && hotel.imageUrls.length > 0) {
      return hotel.imageUrls[0];
    }
    // Check for single image field
    if (hotel.image) {
      return hotel.image;
    }
    // Fallback to ONLY hotel images - various types for diversity
    const hotelImages = [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', // Luxury hotel exterior
      'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80', // Hotel bedroom
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80', // Modern hotel building
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80', // Hotel exterior night
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80', // Beach resort hotel
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80', // Hotel lobby interior
      'https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=800&q=80', // Modern hotel suite
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80', // Hotel rooftop
    ];
    // Use hotel ID or name to consistently assign same fallback image
    const index = (hotel._id || hotel.name || '').length % hotelImages.length;
    return hotelImages[index];
  };

  const hotelImage = getHotelImage();

  // Determine budget category
  const getBudgetBadge = (price) => {
    if (price <= 1500) {
      return { label: 'Super Budget', color: 'bg-green-500', icon: '💚' };
    } else if (price <= 2500) {
      return { label: 'Budget Friendly', color: 'bg-blue-500', icon: '💙' };
    } else if (price <= 3500) {
      return { label: 'Mid-Range', color: 'bg-purple-500', icon: '💜' };
    }
    return null;
  };

  const budgetBadge = getBudgetBadge(hotel.price);

  return (
    <Link
      to={`/hotel/${hotel._id}${checkIn && checkOut ? `?checkIn=${checkIn}&checkOut=${checkOut}` : ''}`}
      className="group block bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 relative"
    >
      {/* Special Offer Banner */}
      {showOffer && hotel.price <= 2000 && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 px-4 z-10 flex items-center justify-center font-bold text-sm shadow-md">
          <span className="mr-2">🔥</span>
          SPECIAL OFFER - LIMITED TIME!
          <span className="ml-2">🔥</span>
        </div>
      )}

      <div className={`flex flex-col md:flex-row ${showOffer && hotel.price <= 2000 ? 'mt-10' : ''}`}>
        {/* Hotel Image */}
        <div className="md:w-2/5 relative overflow-hidden">
          <img
            src={hotelImage}
            alt={hotel.name}
            className="w-full h-64 md:h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              // Fallback if image fails to load
              e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80';
            }}
          />
          
          {/* Star Rating Badge */}
          {hotel.starRating && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-3 py-1.5 rounded-lg font-bold shadow-md flex items-center">
              <FaStar className="mr-1" />
              <span>{hotel.starRating} Star</span>
            </div>
          )}

          {/* Budget Badge */}
          {budgetBadge && (
            <div className={`absolute top-4 right-4 ${budgetBadge.color} text-white px-3 py-1.5 rounded-lg font-bold shadow-md text-sm`}>
              {budgetBadge.icon} {budgetBadge.label}
            </div>
          )}

          {/* Discount Badge for Special Offers */}
          {showOffer && hotel.price <= 1800 && (
            <div className="absolute bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold shadow-lg animate-pulse">
              SAVE 20%
            </div>
          )}
        </div>

        {/* Hotel Details */}
        <div className="md:w-3/5 p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                {hotel.name}
              </h3>
              {hotel.averageRating > 0 && (
                <div className="flex items-center bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1.5 rounded-lg shadow-md">
                  <FaStar className="mr-1" />
                  <span className="font-bold">{hotel.averageRating.toFixed(1)}</span>
                </div>
              )}
            </div>

            <div className="flex items-center text-gray-600 mb-3">
              <FaMapMarkerAlt className="mr-2 text-primary-600 text-lg" />
              <span className="text-lg">{hotel.city}</span>
            </div>

            <p className="text-gray-600 mb-4 line-clamp-2 text-base leading-relaxed">
              {hotel.description}
            </p>

            {/* Amenities */}
            {hotel.amenities && hotel.amenities.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {hotel.amenities.slice(0, 4).map((amenity, index) => (
                  <span
                    key={index}
                    className="text-sm bg-gradient-to-r from-blue-50 to-primary-50 text-primary-700 px-3 py-1.5 rounded-lg font-medium"
                  >
                    {amenity}
                  </span>
                ))}
                {hotel.amenities.length > 4 && (
                  <span className="text-sm text-gray-500 font-medium">
                    +{hotel.amenities.length - 4} more
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Price and Action */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <div>
              <div className="text-sm text-gray-500 mb-1">
                {showOffer && hotel.price <= 2000 ? (
                  <span className="text-red-500 font-semibold">🔥 Special Offer Price!</span>
                ) : (
                  'Starting from'
                )}
              </div>
              <div className="flex items-baseline">
                {showOffer && hotel.price <= 1800 && (
                  <span className="text-lg text-gray-400 line-through mr-2">
                    {formatCurrency(Math.floor(hotel.price * 1.25))}
                  </span>
                )}
                <span className="text-3xl font-bold text-primary-600">
                  {formatCurrency(hotel.price)}
                </span>
                <span className="text-gray-600 ml-2 text-sm">/night</span>
              </div>
              {showOffer && hotel.price <= 2000 && (
                <div className="mt-1 text-green-600 font-semibold text-sm">
                  ✓ Best Value Deal
                </div>
              )}
            </div>
            <button className="btn-primary px-6 py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              {showOffer ? 'Book Now →' : 'View Details →'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
