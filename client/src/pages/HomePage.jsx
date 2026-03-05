import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import HeroCarousel from '../components/HeroCarousel';
import ScrollRow from '../components/ScrollRow';
import PlaceCard from '../components/PlaceCard';

const categories = [
  { id: 'Hill Stations & Nature', icon: '🏔️' },
  { id: 'Palaces & Heritage', icon: '🏛️' },
  { id: 'Wildlife & Parks', icon: '🐾' },
  { id: 'Temples & Spiritual', icon: '🛕' },
  { id: 'Beaches & Waterfalls', icon: '🏖️' },
];

const HomePage = () => {
  const [allPlaces, setAllPlaces] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllPlaces();
  }, []);

  const fetchAllPlaces = async () => {
    try {
      const res = await axios.get('/api/places');
      setAllPlaces(res.data || []);
    } catch (err) {
      console.error('Error fetching places:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (!query && !selectedCategory) {
      setSearchResults(null);
      return;
    }
    try {
      const params = {};
      if (query) params.search = query;
      if (selectedCategory) params.category = selectedCategory;
      params.minPrice = priceRange[0];
      params.maxPrice = priceRange[1];
      const res = await axios.get('/api/places', { params });
      setSearchResults(res.data || []);
    } catch (err) {
      console.error('Error searching:', err);
    }
  };

  const handleFilter = async () => {
    try {
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (selectedCategory) params.category = selectedCategory;
      params.minPrice = priceRange[0];
      params.maxPrice = priceRange[1];
      const res = await axios.get('/api/places', { params });
      setSearchResults(res.data || []);
    } catch (err) {
      console.error('Error filtering:', err);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setPriceRange([0, 5000]);
    setSearchResults(null);
  };

  const getPlacesByCategory = (category) =>
    allPlaces.filter((p) => p.category === category);

  return (
    <div className="min-h-screen bg-dark-500">
      <Navbar onSearch={handleSearch} />

      {/* Hero Carousel */}
      <div className="pt-16">
        <HeroCarousel />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search & Filter Panel */}
        <div className="bg-dark-300 border border-gray-800 rounded-2xl p-6 mb-10">
          <h3 className="text-white font-semibold text-lg mb-4">🔍 Search & Filter</h3>
          <div className="flex flex-wrap gap-4 items-end">
            {/* Search input */}
            <div className="flex-1 min-w-48">
              <label className="text-gray-400 text-sm mb-1 block">Search Places</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
                placeholder="e.g. Mysore, Hampi, Coorg..."
                className="w-full bg-dark-200 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 text-sm"
              />
            </div>

            {/* Category filter */}
            <div className="flex-1 min-w-48">
              <label className="text-gray-400 text-sm mb-1 block">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-dark-200 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 text-sm"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.id}
                  </option>
                ))}
              </select>
            </div>

            {/* Price range */}
            <div className="flex-1 min-w-48">
              <label className="text-gray-400 text-sm mb-1 block">Max Price: ₹{priceRange[1].toLocaleString()}</label>
              <input
                type="range"
                min={0}
                max={5000}
                step={100}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full accent-amber-500"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleFilter}
                className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
              >
                Apply Filters
              </button>
              {searchResults !== null && (
                <button
                  onClick={clearFilters}
                  className="bg-dark-200 hover:bg-dark-100 border border-gray-700 text-gray-300 font-semibold px-4 py-2.5 rounded-lg transition-colors text-sm"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Search Results */}
        {searchResults !== null && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">
              🔍 Search Results ({searchResults.length} places found)
            </h2>
            {searchResults.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {searchResults.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <p className="text-4xl mb-4">🔍</p>
                <p className="text-xl">No places found</p>
                <p className="text-sm mt-2">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        )}

        {/* Netflix-style rows */}
        {searchResults === null && (
          <>
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-amber-400 text-lg">Loading amazing places...</div>
              </div>
            ) : (
              categories.map((cat) => (
                <ScrollRow
                  key={cat.id}
                  title={cat.id}
                  icon={cat.icon}
                  places={getPlacesByCategory(cat.id)}
                />
              ))
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p className="mb-2">🗺️ <span className="text-amber-400 font-semibold">NearbyPlace</span> - Discover Karnataka's Hidden Gems</p>
          <p>© 2024 NearbyPlace · Karnataka Tourism · All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
