import { useRef } from 'react';
import PlaceCard from './PlaceCard';

const ScrollRow = ({ title, places, icon }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction * 280, behavior: 'smooth' });
    }
  };

  if (!places || places.length === 0) return null;

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
          <span>{icon}</span>
          <span>{title}</span>
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll(-1)}
            className="w-8 h-8 bg-dark-200 border border-gray-700 rounded-full hover:border-amber-500 hover:text-amber-400 text-white text-sm flex items-center justify-center transition-colors"
          >
            ‹
          </button>
          <button
            onClick={() => scroll(1)}
            className="w-8 h-8 bg-dark-200 border border-gray-700 rounded-full hover:border-amber-500 hover:text-amber-400 text-white text-sm flex items-center justify-center transition-colors"
          >
            ›
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-container pb-2"
      >
        {places.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </div>
  );
};

export default ScrollRow;
