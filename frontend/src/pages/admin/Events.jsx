import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, createEvent, updateEvent, deleteEvent, clearError } from '../../store/slices/eventsSlice';
import { fetchCategories } from '../../store/slices/categoriesSlice';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const LoadingSpinner = () => (
    <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
);

const ImageUpload = ({ onImageSelect, preview, error }) => {
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onImageSelect(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            onImageSelect(e.target.files[0]);
        }
    };

    return (
        <div className="space-y-2">
            <div
                className={`relative border-2 border-dashed rounded-lg p-6 text-center ${
                    dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    onChange={handleChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="space-y-2">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                    >
                        <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <div className="text-sm text-gray-600">
                        <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                            <span>Upload an image</span>
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF, WEBP up to 5MB</p>
                </div>
            </div>
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
            {preview && (
                <div className="mt-2">
                    <img
                        src={preview}
                        alt="Preview"
                        className="h-32 w-32 object-cover rounded-lg mx-auto"
                    />
                </div>
            )}
        </div>
    );
};

const EventDetailsModal = ({ event, onClose }) => {
    if (!event) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold">{event.name || event.title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div className="space-y-4">
                    <div className="aspect-w-16 aspect-h-9">
                        <img
                            src={event.image}
                            alt={event.name || event.title}
                            className="w-full h-64 object-cover rounded-lg"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Category</h3>
                            <p className="text-gray-600">{event.category?.name || 'N/A'}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Description</h3>
                        <p className="text-gray-600 whitespace-pre-wrap">{event.description}</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Features</h3>
                        <div className="flex flex-wrap gap-2">
                            {event.features?.map((feature, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                                >
                                    {feature}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Events = () => {
    const dispatch = useDispatch();
    const { items: events, loading, error } = useSelector((state) => state.events);
    const { items: categories } = useSelector((state) => state.categories);
    const [showForm, setShowForm] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedEventForView, setSelectedEventForView] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        image: null,
        features: [],
        isActive: true
    });
    const [newFeature, setNewFeature] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [imageError, setImageError] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        dispatch(fetchEvents());
        dispatch(fetchCategories());
    }, [dispatch]);

    const validateImage = (file) => {
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!validTypes.includes(file.type)) {
            setImageError('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
            return false;
        }

        if (file.size > maxSize) {
            setImageError('Image size should be less than 5MB');
            return false;
        }

        setImageError('');
        return true;
    };

    const handleImageSelect = (file) => {
        if (file && validateImage(file)) {
            setFormData({
                ...formData,
                image: file
            });
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleAddFeature = () => {
        if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
            setFormData({
                ...formData,
                features: [...formData.features, newFeature.trim()]
            });
            setNewFeature('');
        }
    };

    const handleRemoveFeature = (featureToRemove) => {
        setFormData({
            ...formData,
            features: formData.features.filter(feature => feature !== featureToRemove)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.image && !selectedEvent) {
            setImageError('Please select an image');
            return;
        }

        try {
            setIsUploading(true);
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('features', JSON.stringify(formData.features));
            formDataToSend.append('isActive', formData.isActive);
            
            if (formData.image) {
                formDataToSend.append('image', formData.image);
            }

            let result;
            if (selectedEvent) {
                result = await dispatch(updateEvent({
                    eventId: selectedEvent._id,
                    eventData: formDataToSend
                }));
            } else {
                result = await dispatch(createEvent(formDataToSend));
            }

            if (!result.error) {
                setShowForm(false);
                setFormData({
                    title: '',
                    description: '',
                    category: '',
                    image: null,
                    features: [],
                    isActive: true
                });
                setImagePreview(null);
                setImageError('');
                setSelectedEvent(null);
            }
        } catch (err) {
            setImageError('Error uploading image. Please try again.');
            console.error('Upload error:', err);
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (eventId) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            dispatch(deleteEvent(eventId));
        }
    };

    const handleEventSelect = (event) => {
        setSelectedEvent(event);
        setFormData({
            title: event.title,
            description: event.description,
            category: event.category,
            image: null,
            features: event.features || [],
            isActive: event.isActive ?? true
        });
        setImagePreview(event.image);
        setShowForm(true);
        
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const filteredEvents = events.filter(event => {
        const matchesSearch = (event.name || event.title || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !categoryFilter || 
            (event.category?._id === categoryFilter) || 
            (event.category === categoryFilter);
        return matchesSearch && matchesCategory;
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedEvents = filteredEvents.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Events Management</h1>
                <div className="flex gap-2">
                    <button
                        onClick={() => dispatch(fetchEvents())}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2"
                    >
                        <svg 
                            className="w-5 h-5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                            />
                        </svg>
                        Refresh
                    </button>
                    <button
                        onClick={() => {
                            setShowForm(!showForm);
                            setSelectedEvent(null);
                            setFormData({
                                title: '',
                                description: '',
                                category: '',
                                image: null,
                                features: [],
                                isActive: true
                            });
                            setImagePreview(null);
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        {showForm ? 'Cancel' : 'Create New Event'}
                    </button>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="mb-6 bg-white p-4 rounded-lg shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Search Events</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by event name..."
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Category</label>
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="">All Categories</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
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

            {showForm && (
                <div ref={formRef} className="bg-white p-6 rounded-lg shadow-lg mb-6">
                    <h2 className="text-xl font-bold mb-4">
                        {selectedEvent ? 'Edit Event' : 'Create New Event'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Features</label>
                            <div className="mt-1 flex gap-2">
                                <input
                                    type="text"
                                    value={newFeature}
                                    onChange={(e) => setNewFeature(e.target.value)}
                                    placeholder="Add a feature"
                                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddFeature}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {formData.features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                                    >
                                        <span>{feature}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveFeature(feature)}
                                            className="text-gray-500 hover:text-red-500"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                            <ImageUpload
                                onImageSelect={handleImageSelect}
                                preview={imagePreview}
                                error={imageError}
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                <span className="ml-3 text-sm font-medium text-gray-700">Active</span>
                            </label>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isUploading}
                                className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 ${
                                    isUploading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                {isUploading ? (
                                    <div className="flex items-center">
                                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                                        Uploading...
                                    </div>
                                ) : (
                                    selectedEvent ? 'Update Event' : 'Create Event'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Features</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedEvents.map((event) => (
                            <tr key={event._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="h-12 w-12 object-cover rounded-lg"
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{event.name || event.title}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {event.category?.name || categories.find(cat => cat._id === event.category)?.name || 'N/A'}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {event.features?.map((feature, index) => (
                                            <span
                                                key={index}
                                                className="bg-gray-100 px-2 py-1 rounded-full text-xs"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => setSelectedEventForView(event)}
                                        className="text-green-600 hover:text-green-900 mr-4"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => handleEventSelect(event)}
                                        className="text-blue-600 hover:text-blue-900 mr-4"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(event._id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredEvents.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No events found matching your search criteria
                    </div>
                )}

                {/* Pagination */}
                {filteredEvents.length > 0 && (
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
                                        {Math.min(startIndex + itemsPerPage, filteredEvents.length)}
                                    </span>{' '}
                                    of <span className="font-medium">{filteredEvents.length}</span> results
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
                )}
            </div>

            {selectedEventForView && (
                <EventDetailsModal
                    event={selectedEventForView}
                    onClose={() => setSelectedEventForView(null)}
                />
            )}
        </div>
    );
};

export default Events; 