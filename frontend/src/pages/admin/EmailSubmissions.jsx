import React, { useEffect, useState } from 'react';
import { Mail, Send, CheckCircle2, Search, Filter, Download, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import { ADMIN_ENDPOINTS } from '../../constants/api';

const EmailSubmissions = () => {
    const navigate = useNavigate();
    const [submissions, setSubmissions] = useState([
        {
            id: 1,
            email: 'john@example.com',
            date: '2024-03-15T10:30:00',
            status: 'new'
        },
        {
            id: 2,
            email: 'sarah@example.com',
            date: '2024-03-14T15:45:00',
            status: 'sent'
        }
    ]);
  const [error, setError] = useState('');
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState({ start: '', end: '' });

    const handleSendReply = (email) => {
        setSubmissions(submissions.map(sub => {
            if (sub.email === email) {
                return {
                    ...sub,
                    status: 'sent'
                };
            }
            return sub;
        }));
        setSelectedEmail(null);
        setReplyText('');
    };

 useEffect(() => {
    const fetchEmailData = async () => {
      try {
        const response = await axiosInstance.get(ADMIN_ENDPOINTS.FETCH_EMAIL_DATA);
        setSubmissions(response.data);
      } catch (error) {
        console.error('Failed to fetch email data:', error);
        setError(error.response?.data?.message || 'Something went wrong');
      }
    };

    fetchEmailData();
  }, []);





    const handleViewDetails = (id) => {
        navigate(`/admin/email-submissions/${id}`);
    };

    const handleDownloadExcel = () => {
        // Create CSV content
        const headers = ['Email', 'Date', 'Status'];
        const csvContent = [
            headers.join(','),
            ...submissions.map(sub => [
                sub.email,
                new Date(sub.date).toLocaleDateString(),
                sub.status
            ].join(','))
        ].join('\n');

        // Create and download file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `email-submissions-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    };

    const handleDownloadPDF = () => {
        // This would typically use a PDF generation library
        // For now, we'll just show an alert
        alert('PDF download functionality would be implemented here');
    };

    const filteredSubmissions = submissions.filter(sub => {
        const matchesSearch = sub.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDate = (!dateFilter.start || new Date(sub.date) >= new Date(dateFilter.start)) &&
                          (!dateFilter.end || new Date(sub.date) <= new Date(dateFilter.end));
        return matchesSearch && matchesDate;
    });

    return (
        <div className="p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header with Count and Download Buttons */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Email Submissions</h1>
                        <p className="text-gray-600 mt-1">Total Submissions: {submissions.length}</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleDownloadExcel}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Excel
                        </button>
                        <button
                            onClick={handleDownloadPDF}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            PDF
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search by email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
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
                                    onChange={(e) => setDateFilter({ ...dateFilter, start: e.target.value })}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                                />
                            </div>
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="date"
                                    value={dateFilter.end}
                                    onChange={(e) => setDateFilter({ ...dateFilter, end: e.target.value })}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Email List */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredSubmissions.map((submission) => (
                                    <tr key={submission.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{submission.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                {new Date(submission.date).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                {submission.status === 'sent' ? (
                                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                                ) : (
                                                    <Mail className="w-5 h-5 text-yellow-500" />
                                                )}
                                                <span className="ml-2 text-sm text-gray-500 capitalize">
                                                    {submission.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleViewDetails(submission.id)}
                                                    className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    View
                                                </button>
                                                {submission.status === 'new' && (
                                                    <button
                                                        onClick={() => setSelectedEmail(submission.email)}
                                                        className="text-yellow-600 hover:text-yellow-900 flex items-center gap-1"
                                                    >
                                                        <Send className="w-4 h-4" />
                                                        Reply
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Send Email Modal */}
                {selectedEmail && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">Send Reply</h2>
                                        <p className="text-gray-600 mt-1">{selectedEmail}</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setSelectedEmail(null);
                                            setReplyText('');
                                        }}
                                        className="text-gray-400 hover:text-gray-500"
                                    >
                                        <span className="sr-only">Close</span>
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Your Reply
                                    </label>
                                    <textarea
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                                        rows="6"
                                        placeholder="Type your reply here..."
                                    />
                                </div>
                                <div className="flex justify-end gap-4">
                                    <button
                                        onClick={() => {
                                            setSelectedEmail(null);
                                            setReplyText('');
                                        }}
                                        className="px-4 py-2 text-gray-700 hover:text-gray-900"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => handleSendReply(selectedEmail)}
                                        className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 flex items-center gap-2"
                                    >
                                        <Send className="w-4 h-4" />
                                        Send Reply
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmailSubmissions; 