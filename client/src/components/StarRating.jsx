const StarRating = ({ rating, size = 'sm' }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const sizeClass = size === 'lg' ? 'text-xl' : size === 'md' ? 'text-base' : 'text-sm';

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<span key={i} className={`text-amber-400 ${sizeClass}`}>★</span>);
    } else if (i === fullStars && hasHalf) {
      stars.push(<span key={i} className={`text-amber-400 ${sizeClass}`}>½</span>);
    } else {
      stars.push(<span key={i} className={`text-gray-600 ${sizeClass}`}>★</span>);
    }
  }

  return (
    <div className="flex items-center gap-0.5">
      {stars}
      <span className={`ml-1 text-amber-400 font-semibold ${sizeClass}`}>{rating}</span>
    </div>
  );
};

export default StarRating;
