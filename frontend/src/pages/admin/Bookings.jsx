import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings, confirmBooking, deleteBooking, clearError } from '../../store/slices/bookingsSlice';
import { Search, Filter, Download, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Bookings = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items: bookings, loading, error } = useSelector((state) => state.bookings);
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState({ start: '', end: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        dispatch(fetchBookings());
    }, [dispatch]);

     
   

    const handleDelete = async (bookingId) => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            dispatch(deleteBooking(bookingId));
        }
    };

    const handleViewDetails = (bookingId) => {
        navigate(`/admin/bookings/${bookingId}`);
    };

    const handleDownloadExcel = () => {
        // Create CSV content
        const headers = ['Event Type', 'Customer Name', 'Email', 'Event Date', 'Status'];
        const csvContent = [
            headers.join(','),
            ...filteredBookings.map(booking => [
                booking.eventType,
                booking.customerName,
                booking.email,
                new Date(booking.eventDate).toLocaleDateString(),
                booking.status
            ].join(','))
        ].join('\n');

        // Create and download file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `bookings-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    };

    const handleDownloadPDF = () => {
        // This would typically use a PDF generation library
        // For now, we'll just show an alert
        alert('PDF download functionality would be implemented here');
    };

    const filteredBookings = bookings.filter(booking => {
        // Search term filtering
        const searchTermLower = searchTerm.toLowerCase();
        const matchesSearch = 
            (booking.name && booking.name.toLowerCase().includes(searchTermLower)) ||
            (booking.email && booking.email.toLowerCase().includes(searchTermLower)) ||
            (booking.eventType && booking.eventType.toLowerCase().includes(searchTermLower)) ||
            (booking.phone && booking.phone.toLowerCase().includes(searchTermLower));

        // Date filtering
        const eventDate = new Date(booking.eventDate);
        const startDate = dateFilter.start ? new Date(dateFilter.start) : null;
        const endDate = dateFilter.end ? new Date(dateFilter.end) : null;

        const matchesDate = 
            (!startDate || eventDate >= startDate) &&
            (!endDate || eventDate <= endDate);

        return matchesSearch && matchesDate;
    });

    // Sort bookings by event date (most recent first)
    const sortedBookings = [...filteredBookings].sort((a, b) => 
        new Date(b.eventDate) - new Date(a.eventDate)
    );

    // Pagination logic
    const totalPages = Math.ceil(sortedBookings.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedBookings = sortedBookings.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Bookings Management</h1>
                <div className="flex gap-2">
                    <button
                        onClick={handleDownloadExcel}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2"
                    >
                        <Download className="w-4 h-4" />
                        Excel
                    </button>
                    {/* <button
                        onClick={handleDownloadPDF}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center gap-2"
                    >
                        <Download className="w-4 h-4" />
                        PDF
                    </button> */}
                </div>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                    <button
                        onClick={() => dispatch(clearError())}
                        className="float-right text-red-700 hover:text-red-900"
                    >
                        ×
                    </button>
                </div>
            )}

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by name, email, event type, or phone..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1); // Reset to first page on search
                                }}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                            />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="date"
                                value={dateFilter.start}
                                onChange={(e) => {
                                    setDateFilter({ ...dateFilter, start: e.target.value });
                                    setCurrentPage(1); // Reset to first page on filter change
                                }}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                            />
                        </div>
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="date"
                                value={dateFilter.end}
                                onChange={(e) => {
                                    setDateFilter({ ...dateFilter, end: e.target.value });
                                    setCurrentPage(1); // Reset to first page on filter change
                                }}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                            />
                        </div>
                        {(dateFilter.start || dateFilter.end) && (
                            <button
                                onClick={() => {
                                    setDateFilter({ start: '', end: '' });
                                    setCurrentPage(1);
                                }}
                                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                            >
                                Clear Dates
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedBookings.map((booking) => (
                            <tr key={booking._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{booking.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{booking.eventType}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {new Date(booking.eventDate).toLocaleDateString()}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {new Date(booking.createdAt).toLocaleDateString()}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        booking.status === 'confirmed'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleViewDetails(booking._id)}
                                            className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View
                                        </button>
                                        {/* {booking.status !== 'confirmed' && (
                                            <button
                                                onClick={() => handleConfirm(booking._id)}
                                                className="text-green-600 hover:text-green-900 flex items-center gap-1"
                                            >
                                                Confirm
                                            </button>
                                        )} */}
                                        <button
                                            onClick={() => handleDelete(booking._id)}
                                            className="text-red-600 hover:text-red-900 flex items-center gap-1"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                                <span className="font-medium">
                                    {Math.min(startIndex + itemsPerPage, sortedBookings.length)}
                                </span>{' '}
                                of <span className="font-medium">{sortedBookings.length}</span> results
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                            currentPage === index + 1
                                                ? 'z-10 bg-yellow-50 border-yellow-500 text-yellow-600'
                                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bookings; 