import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import StarRating from '../components/StarRating';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [formData, setFormData] = useState({
    booking_date: '',
    num_people: 1,
    special_requests: '',
  });
  const [error, setError] = useState('');

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

  const totalPrice = place ? place.price * formData.num_people : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.booking_date) { setError('Please select a date'); return; }
    setError('');
    setSubmitting(true);
    try {
      const res = await axios.post('/api/bookings', {
        place_id: id,
        booking_date: formData.booking_date,
        num_people: formData.num_people,
        special_requests: formData.special_requests,
      });
      setBookingData(res.data);
      setConfirmed(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-500 flex items-center justify-center">
        <div className="text-amber-400 text-xl">Loading...</div>
      </div>
    );
  }

  if (confirmed && bookingData) {
    return (
      <div className="min-h-screen bg-dark-500">
        <Navbar />
        <div className="pt-24 max-w-lg mx-auto px-4 text-center">
          <div className="bg-dark-300 border border-green-700 rounded-2xl p-8">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-2xl font-bold text-green-400 mb-2">Booking Confirmed!</h1>
            <p className="text-gray-400 mb-6">Your booking has been successfully confirmed.</p>
            <div className="bg-dark-400 rounded-xl p-4 text-left space-y-2 mb-6">
              <p className="text-gray-300"><span className="text-amber-400">Place:</span> {place?.name}</p>
              <p className="text-gray-300"><span className="text-amber-400">Date:</span> {formData.booking_date}</p>
              <p className="text-gray-300"><span className="text-amber-400">People:</span> {formData.num_people}</p>
              <p className="text-gray-300"><span className="text-amber-400">Total:</span> ₹{totalPrice.toLocaleString()}</p>
              <p className="text-gray-300"><span className="text-amber-400">Status:</span> <span className="text-green-400">✓ Confirmed</span></p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/my-bookings')}
                className="flex-1 bg-amber-500 hover:bg-amber-400 text-black font-bold py-2.5 rounded-xl transition-colors"
              >
                View My Bookings
              </button>
              <button
                onClick={() => navigate('/home')}
                className="flex-1 bg-dark-200 border border-gray-700 text-white font-semibold py-2.5 rounded-xl transition-colors hover:border-amber-500"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-500">
      <Navbar />
      <div className="pt-24 max-w-5xl mx-auto px-4 pb-12">
        <h1 className="text-2xl font-bold text-white mb-8">🎫 Book Your Trip</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <div className="bg-dark-300 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Trip Details</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-gray-300 text-sm font-medium mb-1 block">Travel Date *</label>
                <input
                  type="date"
                  value={formData.booking_date}
                  onChange={(e) => setFormData({ ...formData, booking_date: e.target.value })}
                  min={today}
                  className="w-full bg-dark-200 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 text-sm"
                  required
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm font-medium mb-1 block">Number of People *</label>
                <select
                  value={formData.num_people}
                  onChange={(e) => setFormData({ ...formData, num_people: parseInt(e.target.value) })}
                  className="w-full bg-dark-200 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 text-sm"
                >
                  {[1,2,3,4,5,6,7,8,9,10].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-gray-300 text-sm font-medium mb-1 block">Special Requests (optional)</label>
                <textarea
                  value={formData.special_requests}
                  onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                  placeholder="Any special requirements or requests..."
                  rows={3}
                  className="w-full bg-dark-200 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 text-sm resize-none"
                />
              </div>

              {error && (
                <div className="bg-red-900/50 border border-red-700 rounded-lg px-4 py-2 text-red-300 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-bold py-3 rounded-xl transition-all hover:scale-[1.02] shadow-lg"
              >
                {submitting ? '⏳ Processing...' : `✅ Confirm Booking · ₹${totalPrice.toLocaleString()}`}
              </button>
            </form>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            {/* Place card */}
            {place && (
              <div className="bg-dark-300 border border-gray-800 rounded-2xl overflow-hidden">
                <img
                  src={place.image_url}
                  alt={place.name}
                  className="w-full h-40 object-cover"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800'; }}
                />
                <div className="p-4">
                  <h3 className="text-white font-bold text-lg">{place.name}</h3>
                  <p className="text-gray-400 text-sm mb-2">📍 {place.city}, {place.district}</p>
                  <StarRating rating={place.rating} />
                </div>
              </div>
            )}

            {/* Price breakdown */}
            <div className="bg-dark-300 border border-gray-800 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">💰 Price Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>Per person</span>
                  <span>₹{place?.price?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>× {formData.num_people} {formData.num_people === 1 ? 'person' : 'people'}</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Service fee</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="border-t border-gray-700 pt-2 mt-2 flex justify-between">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-amber-400 font-bold text-lg">₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="bg-dark-300 border border-gray-800 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-3">📋 Booking Info</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Instant confirmation</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Free cancellation up to 24 hours</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 24/7 customer support</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Secure payment</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
