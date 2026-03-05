import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onSearch }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
    setShowDropdown(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-400/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/home')}
        >
          <span className="text-2xl">🗺️</span>
          <span className="text-xl font-bold text-amber-400">NearbyPlace</span>
          <span className="text-xs text-gray-400 hidden sm:block">Karnataka Tourism</span>
        </div>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md hidden md:flex">
          <div className="flex w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search places, destinations..."
              className="flex-1 bg-dark-200 border border-gray-700 rounded-l-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded-r-lg text-black font-semibold text-sm transition-colors"
            >
              🔍
            </button>
          </div>
        </form>

        {/* Nav links */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/my-bookings')}
            className="text-gray-300 hover:text-amber-400 text-sm font-medium transition-colors hidden sm:block"
          >
            My Bookings
          </button>

          {/* User dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 bg-dark-200 border border-gray-700 rounded-full px-3 py-1.5 hover:border-amber-500 transition-colors"
            >
              <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold text-xs">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <span className="text-sm text-white hidden sm:block">{user?.name?.split(' ')[0] || 'User'}</span>
              <span className="text-gray-400 text-xs">▼</span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-dark-200 border border-gray-700 rounded-xl shadow-2xl py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-700">
                  <p className="text-white font-medium text-sm">{user?.name}</p>
                  <p className="text-gray-400 text-xs">{user?.email}</p>
                </div>
                <button
                  onClick={() => { navigate('/my-bookings'); setShowDropdown(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-amber-400 hover:bg-dark-100 transition-colors"
                >
                  📋 My Bookings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-dark-100 transition-colors"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
