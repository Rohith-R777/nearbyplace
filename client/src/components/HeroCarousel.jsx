import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1600693406636-d2bc70b26d8d?w=1400',
    title: 'Discover Mysore Palace',
    subtitle: 'The Jewel of Karnataka - An architectural masterpiece',
    cta: 'Explore Now',
  },
  {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400',
    title: 'Misty Hills of Coorg',
    subtitle: 'The Scotland of India - Coffee, Nature & Adventure',
    cta: 'Plan Your Trip',
  },
  {
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1400',
    title: 'Majestic Jog Falls',
    subtitle: "India's Second Highest Waterfall - Pure Natural Wonder",
    cta: 'See More',
  },
  {
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400',
    title: 'Pristine Gokarna Beaches',
    subtitle: 'Untouched coastal paradise on the Arabian Sea',
    cta: 'Book Now',
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[current];

  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      {heroSlides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-4">
        <div>
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">
            🗺️ Karnataka Tourism
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            {slide.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto drop-shadow">
            {slide.subtitle}
          </p>
          <button
            onClick={() => navigate('/home')}
            className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-3 rounded-full text-lg transition-all hover:scale-105 shadow-lg"
          >
            {slide.cta}
          </button>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-amber-400 w-6' : 'bg-gray-500'}`}
          />
        ))}
      </div>

      {/* Arrow buttons */}
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl transition-colors"
      >
        ‹
      </button>
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % heroSlides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl transition-colors"
      >
        ›
      </button>
    </div>
  );
};

export default HeroCarousel;
