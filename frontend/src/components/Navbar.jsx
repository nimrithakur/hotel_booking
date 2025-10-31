import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHotel, FaBars, FaTimes, FaUser, FaSignOutAlt, FaSearch } from 'react-icons/fa';
import { isAuthenticated, logout, getUser } from '../utils/auth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search-results?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <FaHotel className="text-primary-600 text-2xl" />
            </div>
            <div>
              <span className="text-2xl font-bold text-white tracking-tight">HotelBooking</span>
              <p className="text-xs text-blue-100">Your Perfect Stay Awaits</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white font-medium hover:text-blue-100 transition-colors duration-200">
              Home
            </Link>
            <Link to="/my-bookings" className="text-white font-medium hover:text-blue-100 transition-colors duration-200">
              My Bookings
            </Link>
            <Link to="/contact" className="text-white font-medium hover:text-blue-100 transition-colors duration-200">
              Contact
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated() ? (
              <>
                {/* Search Bar */}
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search hotels..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-72 px-5 py-2.5 pr-12 border-2 border-white border-opacity-40 bg-white bg-opacity-20 backdrop-blur-sm rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:border-opacity-60 text-white placeholder-blue-50 focus:bg-opacity-30 transition-all duration-300 font-medium"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-50 hover:text-white transition-colors duration-200"
                  >
                    <FaSearch className="text-xl" />
                  </button>
                </form>

                <Link
                  to="/profile"
                  className="flex items-center space-x-2 px-5 py-2.5 bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 rounded-full transition-all duration-200 text-white font-semibold border-2 border-white border-opacity-30"
                >
                  <FaUser className="text-lg" />
                  <span>{user?.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-5 py-2.5 bg-white text-primary-600 hover:bg-blue-50 rounded-full transition-all duration-200 font-bold shadow-lg hover:shadow-xl"
                >
                  <FaSignOutAlt className="text-lg" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-6 py-2.5 text-white font-semibold hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200 border-2 border-white border-opacity-30"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2.5 bg-white text-primary-600 hover:bg-blue-50 rounded-full transition-all duration-200 font-bold shadow-lg hover:shadow-xl"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white text-2xl focus:outline-none"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-fadeIn">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="px-4 py-3">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search hotels, cities..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-blue-100 focus:bg-white focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none transition-all"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-100" />
              </div>
            </form>

            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="px-4 py-3 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-all"
                onClick={toggleMenu}
              >
                Home
              </Link>
              {isAuthenticated() && (
                <Link
                  to="/my-bookings"
                  className="px-4 py-3 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-all"
                  onClick={toggleMenu}
                >
                  My Bookings
                </Link>
              )}
              <Link
                to="/contact"
                className="px-4 py-3 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-all"
                onClick={toggleMenu}
              >
                Contact
              </Link>
              
              <div className="border-t border-white border-opacity-20 pt-2 mt-2">
                {isAuthenticated() ? (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-3 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-all"
                      onClick={toggleMenu}
                    >
                      <FaUser />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMenu();
                      }}
                      className="w-full flex items-center space-x-2 px-4 py-3 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-all text-left"
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-3 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-all"
                      onClick={toggleMenu}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-3 bg-white text-primary-600 hover:bg-blue-50 rounded-lg transition-all font-semibold mt-2 text-center"
                      onClick={toggleMenu}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
