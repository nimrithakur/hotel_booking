import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { getTodayDate, getTomorrowDate } from '../utils/helpers';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    city: '',
    checkIn: getTodayDate(),
    checkOut: getTomorrowDate(),
  });

  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchData.city) {
      alert('Please enter a city');
      return;
    }

    if (!searchData.checkIn || !searchData.checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }

    if (new Date(searchData.checkIn) >= new Date(searchData.checkOut)) {
      alert('Check-out date must be after check-in date');
      return;
    }

    // Navigate to search results with query parameters
    const params = new URLSearchParams({
      city: searchData.city,
      checkIn: searchData.checkIn,
      checkOut: searchData.checkOut,
    });

    navigate(`/search-results?${params.toString()}`);
  };

  // Search all hotels across India
  const handleSearchAllHotels = () => {
    if (!searchData.checkIn || !searchData.checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }

    if (new Date(searchData.checkIn) >= new Date(searchData.checkOut)) {
      alert('Check-out date must be after check-in date');
      return;
    }

    // Navigate to search results with only dates (no city filter)
    const params = new URLSearchParams({
      checkIn: searchData.checkIn,
      checkOut: searchData.checkOut,
    });

    navigate(`/search-results?${params.toString()}`);
  };

  // Popular cities in India (Tourist destinations)
  const popularCities = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Kolkata',
    'Chennai',
    'Hyderabad',
    'Pune',
    'Jaipur',
    'Goa',
    'Agra',
  ];

  // All 29 Indian States with hotel counts
  const indianStates = [
    { name: 'Andhra Pradesh', city: 'Visakhapatnam', hotels: 8 },
    { name: 'Arunachal Pradesh', city: 'Itanagar', hotels: 3 },
    { name: 'Assam', city: 'Guwahati', hotels: 6 },
    { name: 'Bihar', city: 'Patna', hotels: 5 },
    { name: 'Chhattisgarh', city: 'Raipur', hotels: 4 },
    { name: 'Goa', city: 'Panaji', hotels: 12 },
    { name: 'Gujarat', city: 'Ahmedabad', hotels: 10 },
    { name: 'Haryana', city: 'Gurugram', hotels: 9 },
    { name: 'Himachal Pradesh', city: 'Shimla', hotels: 8 },
    { name: 'Jharkhand', city: 'Ranchi', hotels: 4 },
    { name: 'Karnataka', city: 'Bangalore', hotels: 15 },
    { name: 'Kerala', city: 'Kochi', hotels: 10 },
    { name: 'Madhya Pradesh', city: 'Indore', hotels: 7 },
    { name: 'Maharashtra', city: 'Mumbai', hotels: 20 },
    { name: 'Manipur', city: 'Imphal', hotels: 3 },
    { name: 'Meghalaya', city: 'Shillong', hotels: 5 },
    { name: 'Mizoram', city: 'Aizawl', hotels: 3 },
    { name: 'Nagaland', city: 'Kohima', hotels: 3 },
    { name: 'Odisha', city: 'Bhubaneswar', hotels: 6 },
    { name: 'Punjab', city: 'Amritsar', hotels: 8 },
    { name: 'Rajasthan', city: 'Jaipur', hotels: 12 },
    { name: 'Sikkim', city: 'Gangtok', hotels: 5 },
    { name: 'Tamil Nadu', city: 'Chennai', hotels: 15 },
    { name: 'Telangana', city: 'Hyderabad', hotels: 12 },
    { name: 'Tripura', city: 'Agartala', hotels: 3 },
    { name: 'Uttar Pradesh', city: 'Lucknow', hotels: 10 },
    { name: 'Uttarakhand', city: 'Dehradun', hotels: 7 },
    { name: 'West Bengal', city: 'Kolkata', hotels: 12 },
  ];

  const handleCityClick = (city) => {
    // Navigate to search results with city and default dates
    const params = new URLSearchParams({
      city: city,
      checkIn: searchData.checkIn,
      checkOut: searchData.checkOut,
    });
    navigate(`/search-results?${params.toString()}`);
  };

  const handleStateClick = (stateName, city) => {
    // Navigate to search results with state's main city
    const params = new URLSearchParams({
      city: city,
      checkIn: searchData.checkIn,
      checkOut: searchData.checkOut,
    });
    navigate(`/search-results?${params.toString()}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <div 
        className="relative bg-cover bg-center bg-no-repeat py-24 md:py-32"
        style={{
          backgroundImage: 'linear-gradient(rgba(37, 99, 235, 0.85), rgba(29, 78, 216, 0.85)), url(https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80)',
          minHeight: '600px'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
              Discover India's Best Budget Hotels
            </h1>
            <p className="text-xl md:text-2xl text-white drop-shadow-md">
              🌟 Premium Stays at Affordable Prices | 100+ Hotels Across India
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-5xl mx-auto">
            <form
              onSubmit={handleSearch}
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 backdrop-blur-sm bg-opacity-98 border border-white border-opacity-20"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* City Input */}
                <div className="relative">
                  <label className="flex items-center text-gray-700 font-bold mb-3 text-sm uppercase tracking-wider">
                    <FaMapMarkerAlt className="mr-2 text-blue-600 text-lg" />
                    Destination
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={searchData.city}
                    onChange={handleChange}
                    placeholder="e.g., Mumbai, Delhi, Goa"
                    className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-base font-medium text-gray-700 placeholder-gray-400"
                  />
                </div>

                {/* Check-in Date */}
                <div>
                  <label className="flex items-center text-gray-700 font-bold mb-3 text-sm uppercase tracking-wider">
                    <FaCalendarAlt className="mr-2 text-blue-600 text-lg" />
                    Check-in
                  </label>
                  <input
                    type="date"
                    name="checkIn"
                    value={searchData.checkIn}
                    onChange={handleChange}
                    min={getTodayDate()}
                    className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-base font-medium text-gray-700"
                    required
                  />
                </div>

                {/* Check-out Date */}
                <div>
                  <label className="flex items-center text-gray-700 font-bold mb-3 text-sm uppercase tracking-wider">
                    <FaCalendarAlt className="mr-2 text-blue-600 text-lg" />
                    Check-out
                  </label>
                  <input
                    type="date"
                    name="checkOut"
                    value={searchData.checkOut}
                    onChange={handleChange}
                    min={searchData.checkIn || getTomorrowDate()}
                    className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-base font-medium text-gray-700"
                    required
                  />
                </div>
              </div>

              {/* Search Buttons */}
              <div className="space-y-4">
                <button 
                  type="submit" 
                  className="w-full py-4 text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center"
                >
                  <FaSearch className="mr-3 text-xl" />
                  Search Hotels in Selected City
                </button>
                
                {/* Search All Hotels Button */}
                <button 
                  type="button"
                  onClick={handleSearchAllHotels}
                  className="w-full py-4 text-lg font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center"
                >
                  <span className="text-xl mr-3">🌍</span>
                  Search All Hotels Across India
                </button>
                
                <p className="text-center text-gray-600 text-sm mt-3 font-medium">
                  <span className="inline-block mr-2">💡</span>
                  Tip: Select dates and search all hotels to find best deals nationwide
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
````````````
      {/* Exclusive Budget Deals Banner */}
      <div className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => {
              // Navigate to search results with budget filter (maxPrice=2000)
              const params = new URLSearchParams({
                checkIn: searchData.checkIn,
                checkOut: searchData.checkOut,
                maxPrice: '2000',
              });
              navigate(`/search-results?${params.toString()}`);
            }}
            className="w-full group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02]"
          >
            {/* Gradient Background */}
            <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-pink-600 p-8 md:p-12">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24 group-hover:scale-150 transition-transform duration-700"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between flex-wrap gap-6">
                  {/* Left Side - Main Message */}
                  <div className="flex-1 min-w-[280px]">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-5xl animate-bounce">🎉</span>
                      <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                        Exclusive Budget Deals!
                      </h2>
                    </div>
                    <p className="text-lg md:text-xl text-white font-semibold mb-6 drop-shadow-md">
                      145 hotels under ₹2,000 • Super budget options available!
                    </p>
                    
                    {/* Feature Pills */}
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold border border-white border-opacity-30 group-hover:bg-opacity-30 transition-all">
                        ⚡ Book Now
                      </span>
                      <span className="inline-flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold border border-white border-opacity-30 group-hover:bg-opacity-30 transition-all">
                        💰 Best Prices Guaranteed
                      </span>
                      <span className="inline-flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold border border-white border-opacity-30 group-hover:bg-opacity-30 transition-all">
                        🏆 Top Rated
                      </span>
                    </div>
                  </div>

                  {/* Right Side - Price Tag Icon */}
                  <div className="flex-shrink-0">
                    <div className="relative transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                      <div className="text-8xl opacity-90 drop-shadow-2xl">
                        🏷️
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Info */}
                <div className="mt-6 pt-6 border-t border-white border-opacity-30">
                  <p className="text-white text-sm font-medium flex items-center gap-2">
                    <span>👉</span>
                    <span>Click to view all budget deals under ₹2,000 per night</span>
                  </p>
                </div>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-all duration-1000"></div>
            </div>
          </button>
        </div>
      </div>

      {/* Popular Cities Section with Cards */}
      <div className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Popular Destinations
            </h2>
            <p className="text-xl text-gray-600">
              Explore our best hotels in India's most loved cities
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {popularCities.map((city) => (
              <button
                key={city}
                onClick={() => handleCityClick(city)}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-52 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 border-2 border-blue-500 border-opacity-0 hover:border-opacity-100"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40 group-hover:opacity-30 transition-all duration-300"></div>
                <div className="relative h-full flex flex-col items-center justify-center p-6">
                  <div className="mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <FaMapMarkerAlt className="text-6xl text-white drop-shadow-lg" />
                  </div>
                  <span className="text-2xl font-bold text-white mb-2 drop-shadow-md">{city}</span>
                  <span className="text-sm text-blue-100 font-semibold bg-white bg-opacity-20 px-4 py-1.5 rounded-full backdrop-blur-sm">
                    {city === 'Mumbai' ? '15 Hotels' :
                     city === 'Delhi' ? '15 Hotels' :
                     city === 'Bangalore' ? '15 Hotels' :
                     city === 'Kolkata' ? '15 Hotels' :
                     city === 'Chennai' ? '10 Hotels' :
                     city === 'Hyderabad' ? '10 Hotels' :
                     city === 'Pune' ? '10 Hotels' :
                     city === 'Jaipur' ? '8 Hotels' :
                     city === 'Goa' ? '7 Hotels' :
                     '5 Hotels'}
                  </span>
                </div>
                <div className="absolute inset-0 border-2 border-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300"></div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* All 29 Indian States Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Explore All Indian States
            </h2>
            <p className="text-xl text-gray-600">
              Find budget hotels in all 29 states of India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {indianStates.map((state) => (
              <button
                key={state.name}
                onClick={() => handleStateClick(state.name, state.city)}
                className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 p-6 text-left border-2 border-emerald-400 border-opacity-0 hover:border-opacity-100"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30 group-hover:opacity-20 transition-all duration-300"></div>
                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-100 transition-colors">
                        {state.name}
                      </h3>
                      <p className="text-emerald-100 text-sm flex items-center">
                        <FaMapMarkerAlt className="mr-1 text-xs" />
                        {state.city}
                      </p>
                    </div>
                    <div className="bg-white bg-opacity-25 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <span className="text-white font-bold text-sm">{state.hotels}+</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white border-opacity-20">
                    <span className="text-emerald-50 text-sm font-medium">
                      {state.hotels} Hotels Available
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 transform translate-x-4 translate-y-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <FaMapMarkerAlt className="text-8xl text-white" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Budget Deals Highlight Section */}
      <div className="py-16 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            💎 100+ Budget Hotels Across India
          </h2>
          <p className="text-xl md:text-2xl mb-6 opacity-90">
            Starting from just ₹1,200/night • Best Deals • Top Locations
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-full font-semibold text-lg">
              ⚡ Instant Booking
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-full font-semibold text-lg">
              🎯 No Hidden Charges
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-full font-semibold text-lg">
              🏆 Verified Hotels
            </div>
          </div>
          <button
            onClick={() => navigate('/search-results?checkIn=' + getTodayDate() + '&checkOut=' + getTomorrowDate())}
            className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-2xl"
          >
            View All Hotels →
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ✨ Why Book With Us?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-blue-50 to-primary-50 shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Best Prices
              </h3>
              <p className="text-gray-600 text-lg">
                Budget-friendly hotels starting from ₹1,200/night with no hidden charges
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-4">🏨</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                100+ Hotels
              </h3>
              <p className="text-gray-600 text-lg">
                Wide selection across India's top cities with verified reviews
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Instant Booking
              </h3>
              <p className="text-gray-600 text-lg">
                Quick and easy booking process with instant confirmation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
