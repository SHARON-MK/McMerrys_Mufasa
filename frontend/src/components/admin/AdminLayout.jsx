import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LayoutDashboard, Calendar, Tag, BookOpen, Mail, Megaphone, LogOut } from 'lucide-react';

const AdminLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Close mobile menu when screen size changes
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const menuItems = [
        { 
            path: '/admin', 
            label: 'Dashboard', 
            icon: <LayoutDashboard className="w-5 h-5" />,
            description: 'Overview and statistics'
        },
        { 
            path: '/admin/events', 
            label: 'Events', 
            icon: <Calendar className="w-5 h-5" />,
            description: 'Manage events'
        },
        { 
            path: '/admin/categories', 
            label: 'Categories', 
            icon: <Tag className="w-5 h-5" />,
            description: 'Manage categories'
        },
        { 
            path: '/admin/bookings', 
            label: 'Bookings', 
            icon: <BookOpen className="w-5 h-5" />,
            description: 'Manage bookings'
        },
        { 
            path: '/admin/ads', 
            label: 'Advertisements', 
            icon: <Megaphone className="w-5 h-5" />,
            description: 'Manage ads and promotions'
        },
        { 
            path: '/admin/inquiries', 
            label: 'Inquiries', 
            icon: <Mail className="w-5 h-5" />,
            description: 'View email submissions'
        }
    ];

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/');
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div 
                className={`fixed lg:static inset-y-0 left-0 z-30
                    ${isSidebarOpen ? 'w-64' : 'w-20'} 
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
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
                            className="p-2 rounded-lg hover:bg-gray-100 hidden lg:block"
                        >
                            {isSidebarOpen ? '←' : '→'}
                        </button>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center p-3 mb-2 mx-2 rounded-lg transition-colors
                                ${location.pathname === item.path
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'hover:bg-gray-50 text-gray-700'
                                }`}
                        >
                            <span className="text-gray-500">{item.icon}</span>
                            {isSidebarOpen && (
                                <div className="ml-3">
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
                        <LogOut className="w-5 h-5" />
                        {isSidebarOpen && <span className="ml-3">Logout</span>}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="px-4 lg:px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
                            >
                                <Menu className="w-5 h-5" />
                            </button>
                            <h2 className="text-xl font-semibold text-gray-800">
                                {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
                            </h2>
                        </div>
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