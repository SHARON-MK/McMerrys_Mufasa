import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings } from '../../store/slices/bookingsSlice';
import { fetchEvents } from '../../store/slices/eventsSlice';
import { fetchCategories } from '../../store/slices/categoriesSlice';
import { RefreshCw, Users, Calendar, Tag, DollarSign } from 'lucide-react';

const LoadingSpinner = () => (
    <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
);

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items: bookings, loading: bookingsLoading } = useSelector((state) => state.bookings);
    const { items: events, loading: eventsLoading } = useSelector((state) => state.events);
    const { items: categories, loading: categoriesLoading } = useSelector((state) => state.categories);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        fetchAllData();
    }, [dispatch]);

    const fetchAllData = async () => {
        setIsRefreshing(true);
        try {
            await Promise.all([
                dispatch(fetchBookings()),
                dispatch(fetchEvents()),
                dispatch(fetchCategories())
            ]);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setIsRefreshing(false);
        }
    };

    const stats = {
        totalBookings: bookings?.length || 0,
        pendingBookings: bookings?.filter(b => b.status === 'pending').length || 0,
        totalEvents: events?.length || 0,
        totalCategories: categories?.length || 0
    };

    const recentBookings = bookings?.slice(0, 5) || [];

    if (bookingsLoading || eventsLoading || categoriesLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <button
                    onClick={fetchAllData}
                    disabled={isRefreshing}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2 disabled:opacity-50"
                >
                    <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                    Refresh
                </button>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-gray-500 text-sm">Total Bookings</h3>
                            <p className="text-2xl font-bold mt-1">{stats.totalBookings}</p>
                        </div>
                        <Users className="w-8 h-8 text-blue-500" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-gray-500 text-sm">Pending Bookings</h3>
                            <p className="text-2xl font-bold mt-1">{stats.pendingBookings}</p>
                        </div>
                        <Calendar className="w-8 h-8 text-yellow-500" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-gray-500 text-sm">Total Events</h3>
                            <p className="text-2xl font-bold mt-1">{stats.totalEvents}</p>
                        </div>
                        <Tag className="w-8 h-8 text-green-500" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-gray-500 text-sm">Categories</h3>
                            <p className="text-2xl font-bold mt-1">{stats.totalCategories}</p>
                        </div>
                        <DollarSign className="w-8 h-8 text-purple-500" />
                    </div>
                </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Recent Bookings</h2>
                    <button 
                        onClick={() => navigate('/admin/bookings')}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                    >
                        View All
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {recentBookings.length > 0 ? (
                                recentBookings.map((booking) => (
                                    <tr key={booking._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {booking._id.slice(-6)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {booking.eventType}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {booking.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                                booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                                                'bg-gray-100 text-gray-800'}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            ${booking.budgetRange || 'N/A'}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                        No recent bookings found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                    onClick={() => navigate('/admin/events')}
                    className="bg-blue-600 text-white p-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                    <Calendar className="w-6 h-6" />
                    <span>Manage Events</span>
                </button>
                <button 
                    onClick={() => navigate('/admin/categories')}
                    className="bg-green-600 text-white p-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                    <Tag className="w-6 h-6" />
                    <span>Manage Categories</span>
                </button>
                <button 
                    onClick={() => navigate('/admin/bookings')}
                    className="bg-purple-600 text-white p-6 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                >
                    <Users className="w-6 h-6" />
                    <span>Manage Bookings</span>
                </button>
            </div>
        </div>
    );
};

export default Dashboard; 