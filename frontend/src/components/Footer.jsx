import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHotel, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart, FaCheckCircle } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubscribeStatus({ type: 'error', message: 'Please enter a valid email address' });
      setTimeout(() => setSubscribeStatus({ type: '', message: '' }), 3000);
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setSubscribeStatus({ type: 'success', message: data.message || '🎉 Successfully subscribed! Check your inbox.' });
        setEmail('');
        setTimeout(() => setSubscribeStatus({ type: '', message: '' }), 5000);
      } else {
        setSubscribeStatus({ type: 'error', message: data.message || 'Failed to subscribe. Please try again.' });
        setTimeout(() => setSubscribeStatus({ type: '', message: '' }), 3000);
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setSubscribeStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
      setTimeout(() => setSubscribeStatus({ type: '', message: '' }), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 py-12">
        <div className="container mx-auto px-4">
          <div className="md:flex items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-3xl font-bold mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-blue-100">Get exclusive deals and updates delivered to your inbox!</p>
            </div>
            <div className="max-w-md w-full">
              <form onSubmit={handleNewsletterSubmit} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
                  required
                />
                <button 
                  type="submit"
                  disabled={loading}
                  className={`px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-r-lg transition-all ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
              {subscribeStatus.message && (
                <div className={`mt-3 p-3 rounded-lg flex items-center gap-2 animate-fadeIn ${
                  subscribeStatus.type === 'success' 
                    ? 'bg-green-500 bg-opacity-20 border border-green-300' 
                    : 'bg-red-500 bg-opacity-20 border border-red-300'
                }`}>
                  {subscribeStatus.type === 'success' && <FaCheckCircle className="text-green-300" />}
                  <span className="text-sm">{subscribeStatus.message}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                <FaHotel className="text-white text-2xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">HotelBooking</h3>
                <p className="text-xs text-gray-400">Your Perfect Stay</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Discover and book the best budget hotels across India. Experience comfort, quality, and affordability all in one place.
            </p>
            <div className="flex space-x-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-700 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-700 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-700 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-700 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary-400 transition-colors flex items-center">
                  <span className="mr-2">›</span> Home
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-300 hover:text-primary-400 transition-colors flex items-center">
                  <span className="mr-2">›</span> Search Hotels
                </Link>
              </li>
              <li>
                <Link to="/my-bookings" className="text-gray-300 hover:text-primary-400 transition-colors flex items-center">
                  <span className="mr-2">›</span> My Bookings
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary-400 transition-colors flex items-center">
                  <span className="mr-2">›</span> Contact Us
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-300 hover:text-primary-400 transition-colors flex items-center">
                  <span className="mr-2">›</span> My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h4 className="text-xl font-bold mb-6">Popular Destinations</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/search?city=Mumbai" className="text-gray-300 hover:text-primary-400 transition-colors flex items-center">
                  <span className="mr-2">›</span> Mumbai Hotels
                </Link>
              </li>
              <li>
                <Link to="/search?city=Delhi" className="text-gray-300 hover:text-primary-400 transition-colors flex items-center">
                  <span className="mr-2">›</span> Delhi Hotels
                </Link>
              </li>
              <li>
                <Link to="/search?city=Bangalore" className="text-gray-300 hover:text-primary-400 transition-colors flex items-center">
                  <span className="mr-2">›</span> Bangalore Hotels
                </Link>
              </li>
              <li>
                <Link to="/search?city=Goa" className="text-gray-300 hover:text-primary-400 transition-colors flex items-center">
                  <span className="mr-2">›</span> Goa Hotels
                </Link>
              </li>
              <li>
                <Link to="/search?city=Jaipur" className="text-gray-300 hover:text-primary-400 transition-colors flex items-center">
                  <span className="mr-2">›</span> Jaipur Hotels
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-primary-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-300">123 Hotel Street, Sirmour 400001, Himachal Pradesh, India</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-primary-400 mr-3 flex-shrink-0" />
                <span className="text-gray-300">+91 9876543210</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-primary-400 mr-3 flex-shrink-0" />
                <span className="text-gray-300">info@hotelbooking.com</span>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-300 mb-2">📞 24/7 Customer Support</p>
              <p className="text-primary-400 font-semibold">Available anytime</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="md:flex justify-between items-center text-center md:text-left">
            <p className="text-gray-400 mb-4 md:mb-0">
              © {currentYear} HotelBooking. All rights reserved.
            </p>
            <div className="flex justify-center md:justify-end space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-primary-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-primary-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/refund" className="text-gray-400 hover:text-primary-400 transition-colors">
                Refund Policy
              </Link>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm mt-4">
            Made with <FaHeart className="inline text-red-500 mx-1" /> for travelers across India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
