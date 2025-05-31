import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalBookings: 0,
        pendingBookings: 0,
        totalEvents: 0,
        totalCategories: 0
    });
    const [recentBookings, setRecentBookings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const headers = { Authorization: `Bearer ${token}` };

            // Fetch all required data
            const [bookingsRes, eventsRes, categoriesRes] = await Promise.all([
                axios.get('/api/admin/bookings', { headers }),
                axios.get('/api/admin/events', { headers }),
                axios.get('/api/admin/categories', { headers })
            ]);

            // Calculate stats
            const bookings = bookingsRes.data;
            setStats({
                totalBookings: bookings.length,
                pendingBookings: bookings.filter(b => b.status === 'pending').length,
                totalEvents: eventsRes.data.length,
                totalCategories: categoriesRes.data.length
            });

            // Set recent bookings
            setRecentBookings(bookings.slice(0, 5));
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm">Total Bookings</h3>
                    <p className="text-2xl font-bold">{stats.totalBookings}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm">Pending Bookings</h3>
                    <p className="text-2xl font-bold">{stats.pendingBookings}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm">Total Events</h3>
                    <p className="text-2xl font-bold">{stats.totalEvents}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm">Categories</h3>
                    <p className="text-2xl font-bold">{stats.totalCategories}</p>
                </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Recent Bookings</h2>
                    <button 
                        onClick={() => navigate('/admin/bookings')}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        View All
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
                            {recentBookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {booking._id.slice(-6)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {booking.event.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {booking.contactInfo.name}
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
                                        ${booking.totalAmount}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                    onClick={() => navigate('/admin/events/create')}
                    className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700"
                >
                    Create New Event
                </button>
                <button 
                    onClick={() => navigate('/admin/categories/create')}
                    className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700"
                >
                    Add New Category
                </button>
                <button 
                    onClick={() => navigate('/admin/bookings')}
                    className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700"
                >
                    Manage Bookings
                </button>
            </div>
        </div>
    );
};

export default Dashboard; 