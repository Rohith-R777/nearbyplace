import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';

const categoryIcons = {
  'Hill Stations & Nature': '🏔️',
  'Palaces & Heritage': '🏛️',
  'Wildlife & Parks': '🐾',
  'Temples & Spiritual': '🛕',
  'Beaches & Waterfalls': '🏖️',
};

const PlaceCard = ({ place }) => {
  const navigate = useNavigate();

  return (
    <div
      className="place-card relative w-64 rounded-xl overflow-hidden cursor-pointer bg-dark-300 border border-gray-800 hover:border-amber-500 group"
      onClick={() => navigate(`/place/${place.id}`)}
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={place.image_url}
          alt={place.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800'; }}
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="bg-amber-500 text-black px-4 py-2 rounded-full font-semibold text-sm hover:bg-amber-400">
            View Details
          </button>
        </div>
        {/* Category badge */}
        <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs text-amber-400">
          {categoryIcons[place.category] || '📍'} {place.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-semibold text-white text-sm line-clamp-1 mb-1">{place.name}</h3>
        <p className="text-gray-400 text-xs mb-2 flex items-center gap-1">
          <span>📍</span> {place.city}, {place.district}
        </p>
        <StarRating rating={place.rating} />
        <p className="text-xs text-gray-500 mt-0.5">{place.num_reviews?.toLocaleString()} reviews</p>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500">From</span>
            <p className="text-amber-400 font-bold text-sm">₹{place.price?.toLocaleString()}</p>
          </div>
          <button
            className="bg-amber-500 hover:bg-amber-600 text-black text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
            onClick={(e) => { e.stopPropagation(); navigate(`/place/${place.id}`); }}
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
