import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings, confirmBooking, deleteBooking, clearError } from '../../store/slices/bookingsSlice';

const Bookings = () => {
    const dispatch = useDispatch();
    const { items: bookings, loading, error } = useSelector((state) => state.bookings);

    useEffect(() => {
        dispatch(fetchBookings());
    }, [dispatch]);

    const handleConfirm = async (bookingId) => {
        if (window.confirm('Are you sure you want to confirm this booking?')) {
            dispatch(confirmBooking(bookingId));
        }
    };

    const handleDelete = async (bookingId) => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            dispatch(deleteBooking(bookingId));
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold">Bookings Management</h1>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm sm:text-base">
                    {error}
                    <button
                        onClick={() => dispatch(clearError())}
                        className="float-right text-red-700 hover:text-red-900"
                    >
                        ×
                    </button>
                </div>
            )}

            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Event</th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {bookings.map((booking) => (
                            <tr key={booking._id} className="hover:bg-gray-50">
                                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base">
                                    {booking.customerName}
                                </td>
                                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base">
                                    {booking.eventName}
                                </td>
                                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base">
                                    {new Date(booking.date).toLocaleDateString()}
                                </td>
                                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 inline-flex text-xs sm:text-sm leading-5 font-semibold rounded-full ${
                                        booking.status === 'confirmed' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base">
                                    <div className="flex space-x-2">
                                        {booking.status !== 'confirmed' && (
                                            <button
                                                onClick={() => handleConfirm(booking._id)}
                                                className="text-green-600 hover:text-green-900"
                                            >
                                                Confirm
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(booking._id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Bookings; 