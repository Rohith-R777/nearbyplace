import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import PlaceDetailPage from './pages/PlaceDetailPage';
import BookingPage from './pages/BookingPage';
import MyBookingsPage from './pages/MyBookingsPage';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen bg-dark-500 flex items-center justify-center">
      <div className="text-amber-400 text-xl animate-pulse">Loading NearbyPlace...</div>
    </div>
  );
  if (!user) return <Navigate to="/auth" replace />;
  return children;
};

const AppRoutes = () => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen bg-dark-500 flex items-center justify-center">
      <div className="text-amber-400 text-xl animate-pulse">Loading NearbyPlace...</div>
    </div>
  );

  return (
    <Routes>
      <Route path="/auth" element={user ? <Navigate to="/home" replace /> : <AuthPage />} />
      <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/place/:id" element={<ProtectedRoute><PlaceDetailPage /></ProtectedRoute>} />
      <Route path="/book/:id" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
      <Route path="/my-bookings" element={<ProtectedRoute><MyBookingsPage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to={user ? '/home' : '/auth'} replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

