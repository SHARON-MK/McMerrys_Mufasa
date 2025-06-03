import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import McMerrysLoader from './components/Loader';
import Landing from './pages/landing/Landing-page';
import EventPage from './pages/services/Event_page';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Events from './pages/admin/Events';
import Bookings from './pages/admin/Bookings';
import Categories from './pages/admin/Categories';
import EventDetails from './components/EventDetails';
import PublicLayout from './layout';

// Protected Route component for admin routes
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
        return <Navigate to="/admin/login" />;
    }
    return <AdminLayout>{children}</AdminLayout>;
};

// Public Route component that redirects to admin dashboard if admin is logged in
const PublicRoute = ({ children }) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
        return <Navigate to="/admin/dashboard" />;
    }
    return children;
};

function App() {
    const [loading, setLoading] = useState(true);
    const { token } = useSelector((state) => state.auth);
    const isAdminRoute = window.location.pathname.startsWith('/admin');

    useEffect(() => {
        // Only show loader for public routes
        if (!isAdminRoute) {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 4000);
            return () => clearTimeout(timer);
        } else {
            setLoading(false);
        }
    }, [isAdminRoute]);

    if (loading && !isAdminRoute) {
        return <McMerrysLoader />;
    }

    return (
        <Router>
            <Routes>
                {/* User Routes - No Authentication Required */}
                <Route
                    path="/"
                    element={
                        <PublicRoute>
                            <PublicLayout>
                            <Landing />
                            </PublicLayout>
                        </PublicRoute>
                    }
                />
                <Route
                    path="/event"
                    element={
                        <PublicRoute>
                            <PublicLayout>
                            <EventPage />
                            </PublicLayout>
                        </PublicRoute>
                    }
                />
                 <Route
                    path="/event-details/:id"
                    element={
                        <PublicRoute>
                            <PublicLayout>
                            <EventDetails />
                            </PublicLayout>
                        </PublicRoute>
                    }
                />

                {/* Admin Routes - Authentication Required */}
                <Route
                    path="/admin/login"
                    element={
                        token ? <Navigate to="/admin/dashboard" /> : <AdminLogin />
                    }
                />
                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/events"
                    element={
                        <ProtectedRoute>
                            <Events />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/categories"
                    element={
                        <ProtectedRoute>
                            <Categories />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/bookings"
                    element={
                        <ProtectedRoute>
                            <Bookings />
                        </ProtectedRoute>
                    }
                />

                {/* Catch all route - redirect to home or admin dashboard based on auth status */}
                <Route
                    path="*"
                    element={
                        token ? <Navigate to="/admin/dashboard" /> : <Navigate to="/" />
                    }
                />
            </Routes>
           
        </Router>
    );
}

export default App;
