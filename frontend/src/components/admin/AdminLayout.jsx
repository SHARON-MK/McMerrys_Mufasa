import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AdminLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { 
            path: '/admin', 
            label: 'Dashboard', 
            icon: '📊',
            description: 'Overview and statistics'
        },
        { 
            path: '/admin/events', 
            label: 'Events', 
            icon: '🎉',
            description: 'Manage events'
        },
        { 
            path: '/admin/categories', 
            label: 'Categories', 
            icon: '📁',
            description: 'Manage categories'
        },
        { 
            path: '/admin/bookings', 
            label: 'Bookings', 
            icon: '📝',
            description: 'Manage bookings'
        }
    ];

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/');
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div 
                className={`${isSidebarOpen ? 'w-64' : 'w-20'} 
                    bg-white shadow-lg transition-all duration-300 
                    flex flex-col h-full`}
            >
                {/* Logo and Toggle */}
                <div className="p-2.5 px-4 border-b">
                    <div className="flex items-center justify-between">
                        <h1 className={`font-bold ${isSidebarOpen ? 'text-xl' : 'text-lg'}`}>
                            {isSidebarOpen ? 'McMerrys' : 'MM'}
                        </h1>
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 rounded-lg hover:bg-gray-100"
                        >
                            {isSidebarOpen ? '←' : '→'}
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center p-3 mb-2 mx-2 rounded-lg transition-colors
                                ${location.pathname === item.path
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'hover:bg-gray-50'
                                }`}
                        >
                            <span className="text-xl mr-3">{item.icon}</span>
                            {isSidebarOpen && (
                                <div>
                                    <div className="font-medium">{item.label}</div>
                                    <div className="text-xs text-gray-500">{item.description}</div>
                                </div>
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Logout Button */}
                <div className="p-4 border-t">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full p-3 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                        <span className="text-xl mr-3">🚪</span>
                        {isSidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="px-6 py-4 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-800">
                            {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
                        </h2>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">
                                Welcome, Admin
                            </span>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-auto bg-gray-100">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout; 