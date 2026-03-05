import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const statusColors = {
  confirmed: 'text-green-400 bg-green-900/30 border-green-700',
  pending: 'text-yellow-400 bg-yellow-900/30 border-yellow-700',
  cancelled: 'text-red-400 bg-red-900/30 border-red-700',
};

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get('/api/bookings/my');
      setBookings(res.data || []);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-500">
      <Navbar />
      <div className="pt-24 max-w-5xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">📋 My Bookings</h1>
          <button
            onClick={() => navigate('/home')}
            className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
          >
            + New Booking
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-amber-400">Loading bookings...</div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🗺️</div>
            <h2 className="text-xl font-semibold text-white mb-2">No bookings yet!</h2>
            <p className="text-gray-400 mb-6">Start exploring Karnataka's amazing destinations</p>
            <button
              onClick={() => navigate('/home')}
              className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Explore Places
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-dark-300 border border-gray-800 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-colors">
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="sm:w-48 h-36 sm:h-auto">
                    <img
                      src={booking.place_image}
                      alt={booking.place_name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800'; }}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-white font-bold text-lg">{booking.place_name}</h3>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${statusColors[booking.status] || statusColors.confirmed}`}>
                        {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">📍 {booking.place_name}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500 text-xs">Travel Date</p>
                        <p className="text-gray-200 font-medium">{booking.booking_date}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">People</p>
                        <p className="text-gray-200 font-medium">{booking.num_people} {booking.num_people === 1 ? 'Person' : 'People'}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Total Paid</p>
                        <p className="text-amber-400 font-bold">₹{booking.total_price?.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Booked On</p>
                        <p className="text-gray-200 font-medium text-xs">{new Date(booking.created_at).toLocaleDateString('en-IN')}</p>
                      </div>
                    </div>
                    {booking.special_requests && (
                      <p className="text-gray-400 text-xs mt-2">📝 {booking.special_requests}</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="sm:w-32 p-4 flex sm:flex-col gap-2 items-center justify-center border-t sm:border-t-0 sm:border-l border-gray-700">
                    <button
                      onClick={() => navigate(`/place/${booking.place_id}`)}
                      className="text-amber-400 hover:text-amber-300 text-sm font-medium text-center"
                    >
                      View Place
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
