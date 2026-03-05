import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import StarRating from '../components/StarRating';

const sampleReviews = [
  { name: 'Rajesh Kumar', rating: 5, comment: 'Absolutely stunning! One of the best experiences of my life. The views were breathtaking.', date: '2 weeks ago' },
  { name: 'Priya Sharma', rating: 4, comment: 'Beautiful place with great ambiance. Slightly crowded on weekends but worth the visit.', date: '1 month ago' },
  { name: 'Amit Patel', rating: 5, comment: 'Must visit place! The natural beauty is unparalleled. Will definitely come back.', date: '2 months ago' },
  { name: 'Sunita Rao', rating: 4, comment: 'Great experience overall. The local guides were very helpful and knowledgeable.', date: '3 months ago' },
];

const PlaceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchPlace();
  }, [id]);

  const fetchPlace = async () => {
    try {
      const res = await axios.get(`/api/places/${id}`);
      setPlace(res.data);
    } catch (err) {
      console.error('Error fetching place:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-500 flex items-center justify-center">
        <div className="text-amber-400 text-xl">Loading...</div>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="min-h-screen bg-dark-500 flex items-center justify-center">
        <div className="text-white text-xl">Place not found</div>
      </div>
    );
  }

  const galleryImages = (() => {
    try { return JSON.parse(place.gallery_images || '[]'); } catch { return []; }
  })();
  const highlights = (() => {
    try { return JSON.parse(place.highlights || '[]'); } catch { return []; }
  })();
  const allImages = [place.image_url, ...galleryImages];

  const categoryIcons = {
    'Hill Stations & Nature': '🏔️',
    'Palaces & Heritage': '🏛️',
    'Wildlife & Parks': '🐾',
    'Temples & Spiritual': '🛕',
    'Beaches & Waterfalls': '🏖️',
  };

  return (
    <div className="min-h-screen bg-dark-500">
      <Navbar />

      {/* Hero Image */}
      <div className="pt-16">
        <div className="relative h-[60vh]">
          <img
            src={allImages[selectedImage]}
            alt={place.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 bg-black/60 hover:bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
          >
            ← Back
          </button>

          {/* Place info overlay */}
          <div className="absolute bottom-8 left-0 right-0 px-6 md:px-16">
            <div className="max-w-4xl">
              <span className="bg-amber-500/20 text-amber-400 text-xs font-semibold px-3 py-1 rounded-full mb-3 inline-block">
                {categoryIcons[place.category]} {place.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{place.name}</h1>
              <div className="flex flex-wrap items-center gap-4">
                <p className="text-gray-300 flex items-center gap-1">
                  <span>📍</span> {place.city}, {place.district}
                </p>
                <StarRating rating={place.rating} size="lg" />
                <span className="text-gray-400 text-sm">{place.num_reviews?.toLocaleString()} reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Photo Gallery */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">📸 Photo Gallery</h2>
              <div className="grid grid-cols-4 gap-2">
                {allImages.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`cursor-pointer rounded-lg overflow-hidden h-20 ${i === selectedImage ? 'ring-2 ring-amber-500' : 'opacity-70 hover:opacity-100'} transition-all`}
                  >
                    <img
                      src={img}
                      alt={`Gallery ${i + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800'; }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">📖 About This Place</h2>
              <p className="text-gray-300 leading-relaxed text-base">{place.description}</p>
            </div>

            {/* Highlights */}
            {highlights.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-4">⭐ Key Highlights</h2>
                <div className="flex flex-wrap gap-2">
                  {highlights.map((h, i) => (
                    <span key={i} className="bg-amber-500/10 border border-amber-500/30 text-amber-300 px-3 py-1.5 rounded-full text-sm">
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Location */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">📍 Location</h2>
              <div className="bg-dark-300 border border-gray-800 rounded-xl p-4">
                <p className="text-gray-300 mb-2"><span className="text-amber-400 font-semibold">Address:</span> {place.location}</p>
                <p className="text-gray-300 mb-2"><span className="text-amber-400 font-semibold">City:</span> {place.city}, {place.district}</p>
                {place.latitude && place.longitude && (
                  <p className="text-gray-300"><span className="text-amber-400 font-semibold">Coordinates:</span> {place.latitude}°N, {place.longitude}°E</p>
                )}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">💬 Reviews</h2>
              <div className="space-y-4">
                {sampleReviews.map((review, i) => (
                  <div key={i} className="bg-dark-300 border border-gray-800 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                          {review.name[0]}
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">{review.name}</p>
                          <p className="text-gray-500 text-xs">{review.date}</p>
                        </div>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-gray-300 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-dark-300 border border-gray-800 rounded-2xl p-6 sticky top-20">
              <div className="mb-4">
                <span className="text-gray-400 text-sm">Per Person</span>
                <p className="text-3xl font-bold text-amber-400">₹{place.price?.toLocaleString()}</p>
              </div>
              <button
                onClick={() => navigate(`/book/${place.id}`)}
                className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 rounded-xl transition-all hover:scale-[1.02] shadow-lg text-base"
              >
                🎫 Book Now
              </button>
              <p className="text-center text-gray-500 text-xs mt-3">Instant confirmation · Free cancellation</p>
            </div>

            {/* Key Info */}
            <div className="bg-dark-300 border border-gray-800 rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4">ℹ️ Essential Info</h3>
              <div className="space-y-3">
                {[
                  { icon: '🎟️', label: 'Entry Fee', value: place.entry_fee },
                  { icon: '⏰', label: 'Timings', value: place.timings },
                  { icon: '📅', label: 'Best Time', value: place.best_time },
                  { icon: '🚌', label: 'How to Reach', value: place.how_to_reach },
                ].map((info) => info.value && (
                  <div key={info.label} className="flex gap-3">
                    <span className="text-xl">{info.icon}</span>
                    <div>
                      <p className="text-gray-500 text-xs">{info.label}</p>
                      <p className="text-gray-200 text-sm">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetailPage;
