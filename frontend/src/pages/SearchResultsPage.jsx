import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaFilter, FaSearch } from 'react-icons/fa';
import HotelCard from '../components/HotelCard';
import { hotelAPI } from '../services/api';

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [filters, setFilters] = useState({
    city: searchParams.get('city') || '',
    state: searchParams.get('state') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    checkIn: searchParams.get('checkIn') || '',
    checkOut: searchParams.get('checkOut') || '',
    search: searchParams.get('search') || '',
  });

  const [showFilters, setShowFilters] = useState(false);

  // Fetch hotels based on search parameters
  useEffect(() => {
    fetchHotels();
  }, [searchParams]);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        city: searchParams.get('city'),
        state: searchParams.get('state'),
        minPrice: searchParams.get('minPrice'),
        maxPrice: searchParams.get('maxPrice'),
        checkIn: searchParams.get('checkIn'),
        checkOut: searchParams.get('checkOut'),
        search: searchParams.get('search'),
      };

      // Remove empty params
      Object.keys(params).forEach((key) => {
        if (!params[key]) delete params[key];
      });

      const response = await hotelAPI.search(params);
      let hotelsData = response.data.data;

      // Filter by search query if provided
      if (params.search) {
        const searchLower = params.search.toLowerCase();
        hotelsData = hotelsData.filter(hotel => 
          hotel.name.toLowerCase().includes(searchLower) ||
          hotel.city.toLowerCase().includes(searchLower) ||
          hotel.address.toLowerCase().includes(searchLower) ||
          hotel.description.toLowerCase().includes(searchLower)
        );
      }

      setHotels(hotelsData);
    } catch (err) {
      console.error('Error fetching hotels:', err);
      setError(err.response?.data?.message || 'Error fetching hotels');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const applyFilters = (e) => {
    e.preventDefault();

    // Build new search params
    const newParams = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        newParams[key] = filters[key];
      }
    });

    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setFilters({
      city: '',
      state: '',
      minPrice: '',
      maxPrice: '',
      checkIn: '',
      checkOut: '',
    });
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {searchParams.get('search') 
              ? `Search Results for "${searchParams.get('search')}"` 
              : searchParams.get('city') 
              ? `Hotels in ${searchParams.get('city')}` 
              : '🌍 All Hotels Across India'}
          </h1>
          {searchParams.get('search') ? (
            <p className="text-gray-600">
              Found {hotels.length} hotel{hotels.length !== 1 ? 's' : ''} matching your search
            </p>
          ) : searchParams.get('city') ? (
            <p className="text-gray-600">
              Showing hotels in{' '}
              <span className="font-semibold">{searchParams.get('city')}</span>
              {searchParams.get('checkIn') && searchParams.get('checkOut') && (
                <>
                  {' '}
                  from {searchParams.get('checkIn')} to{' '}
                  {searchParams.get('checkOut')}
                </>
              )}
            </p>
          ) : (
            <p className="text-gray-600 text-lg">
              Discover amazing hotels from Mumbai, Delhi, Bangalore, and more! 
              {searchParams.get('checkIn') && searchParams.get('checkOut') && (
                <>
                  <br />
                  <span className="font-semibold">
                    Dates: {searchParams.get('checkIn')} to {searchParams.get('checkOut')}
                  </span>
                </>
              )}
            </p>
          )}
        </div>

        {/* Filter Button (Mobile) */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary w-full"
          >
            <FaFilter className="inline mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div
            className={`md:w-1/4 ${
              showFilters ? 'block' : 'hidden md:block'
            }`}
          >
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
              <h2 className="text-xl font-bold mb-4">Filters</h2>
              <form onSubmit={applyFilters} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={filters.city}
                    onChange={handleFilterChange}
                    placeholder="e.g., Mumbai"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={filters.state}
                    onChange={handleFilterChange}
                    placeholder="e.g., Maharashtra"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Min Price (₹)
                  </label>
                  <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    placeholder="0"
                    className="input-field"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Max Price (₹)
                  </label>
                  <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    placeholder="10000"
                    className="input-field"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Check-in
                  </label>
                  <input
                    type="date"
                    name="checkIn"
                    value={filters.checkIn}
                    onChange={handleFilterChange}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Check-out
                  </label>
                  <input
                    type="date"
                    name="checkOut"
                    value={filters.checkOut}
                    onChange={handleFilterChange}
                    className="input-field"
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  <FaSearch className="inline mr-2" />
                  Apply Filters
                </button>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="btn-secondary w-full"
                >
                  Clear Filters
                </button>
              </form>
            </div>
          </div>

          {/* Results */}
          <div className="md:w-3/4">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                <p className="mt-4 text-gray-600">Loading hotels...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            ) : hotels.length === 0 ? (
              <div className="bg-white p-12 rounded-lg shadow-md text-center">
                <p className="text-xl text-gray-600 mb-4">
                  No hotels found matching your criteria
                </p>
                <button onClick={clearFilters} className="btn-primary">
                  Clear Filters and Search Again
                </button>
              </div>
            ) : (
              <>
                {/* Budget Categories Quick Filter */}
                <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6 mb-6 shadow-md">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    💰 Budget Categories
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button
                      onClick={() => {
                        setFilters({ ...filters, minPrice: '', maxPrice: '1500' });
                        setSearchParams({ ...Object.fromEntries(searchParams), maxPrice: '1500' });
                      }}
                      className="bg-white hover:bg-green-50 border-2 border-green-500 text-green-700 px-4 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-md"
                    >
                      <div className="text-sm">Super Budget</div>
                      <div className="text-xs mt-1">Under ₹1,500</div>
                    </button>
                    <button
                      onClick={() => {
                        setFilters({ ...filters, minPrice: '1500', maxPrice: '2500' });
                        setSearchParams({ ...Object.fromEntries(searchParams), minPrice: '1500', maxPrice: '2500' });
                      }}
                      className="bg-white hover:bg-blue-50 border-2 border-blue-500 text-blue-700 px-4 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-md"
                    >
                      <div className="text-sm">Budget</div>
                      <div className="text-xs mt-1">₹1,500 - ₹2,500</div>
                    </button>
                    <button
                      onClick={() => {
                        setFilters({ ...filters, minPrice: '2500', maxPrice: '3500' });
                        setSearchParams({ ...Object.fromEntries(searchParams), minPrice: '2500', maxPrice: '3500' });
                      }}
                      className="bg-white hover:bg-purple-50 border-2 border-purple-500 text-purple-700 px-4 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-md"
                    >
                      <div className="text-sm">Mid-Range</div>
                      <div className="text-xs mt-1">₹2,500 - ₹3,500</div>
                    </button>
                    <button
                      onClick={() => {
                        setFilters({ ...filters, minPrice: '', maxPrice: '' });
                        setSearchParams({ city: searchParams.get('city') || '' });
                      }}
                      className="bg-white hover:bg-gray-50 border-2 border-gray-400 text-gray-700 px-4 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-md"
                    >
                      <div className="text-sm">All Hotels</div>
                      <div className="text-xs mt-1">Any Price</div>
                    </button>
                  </div>
                </div>

                {/* Special Offers Banner */}
                {hotels.some(h => h.price <= 2000) && (
                  <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-xl p-6 mb-6 shadow-xl text-white animate-fadeIn">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">🎉 Exclusive Budget Deals!</h3>
                        <p className="text-lg md:text-xl opacity-95">
                          {hotels.filter(h => h.price <= 2000).length} hotels under ₹2,000 
                          {hotels.filter(h => h.price <= 1500).length > 0 && (
                            <> • {hotels.filter(h => h.price <= 1500).length} super budget options!</>
                          )}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold">
                            ⚡ Book Now
                          </span>
                          <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold">
                            💯 Best Prices Guaranteed
                          </span>
                          <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold">
                            🏆 Top Rated
                          </span>
                        </div>
                      </div>
                      <div className="hidden md:block text-7xl animate-bounce">🏷️</div>
                    </div>
                  </div>
                )}

                {/* Results Count and Sort */}
                <div className="flex justify-between items-center mb-4">
                  <p className="text-gray-600 font-medium">
                    Found {hotels.length} hotel{hotels.length !== 1 ? 's' : ''}
                    {hotels.filter(h => h.price <= 2500).length > 0 && (
                      <span className="ml-2 text-green-600 font-semibold">
                        • {hotels.filter(h => h.price <= 2500).length} Budget Options
                      </span>
                    )}
                  </p>
                </div>

                {/* Popular Budget Hotels Section */}
                {hotels.filter(h => h.price <= 2000 && h.starRating >= 3).length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                      ⭐ Popular Budget Hotels
                      <span className="ml-3 text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                        Best Value
                      </span>
                    </h3>
                    <div className="space-y-6">
                      {hotels
                        .filter(h => h.price <= 2000 && h.starRating >= 3)
                        .slice(0, 3)
                        .map((hotel) => (
                          <HotelCard
                            key={hotel._id}
                            hotel={hotel}
                            checkIn={searchParams.get('checkIn')}
                            checkOut={searchParams.get('checkOut')}
                            showOffer={true}
                          />
                        ))}
                    </div>
                  </div>
                )}

                {/* All Hotels */}
                <h3 className="text-2xl font-bold text-gray-800 mb-4">All Available Hotels</h3>
                <div className="space-y-6">
                  {hotels.map((hotel) => (
                    <HotelCard
                      key={hotel._id}
                      hotel={hotel}
                      checkIn={searchParams.get('checkIn')}
                      checkOut={searchParams.get('checkOut')}
                      showOffer={hotel.price <= 2000}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
