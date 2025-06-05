import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, createCategory, deleteCategory, clearError, updateCategory } from '../../store/slices/categoriesSlice';
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

const Categories = () => {
    const dispatch = useDispatch();
    const { items: categories, loading, error } = useSelector((state) => state.categories);
    const [showForm, setShowForm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: null,
        isActive: true
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [imageError, setImageError] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
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
        if (e.target.name === 'isActive') {
            setFormData({
                ...formData,
                isActive: e.target.checked
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.image && !selectedCategory) {
            setImageError('Please select an image');
            return;
        }

        try {
            setIsUploading(true);
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('isActive', formData.isActive);
            
            if (formData.image) {
                formDataToSend.append('image', formData.image);
            }

            let result;
            if (selectedCategory) {
                result = await dispatch(updateCategory({
                    categoryId: selectedCategory._id,
                    categoryData: formDataToSend
                }));
            } else {
                result = await dispatch(createCategory(formDataToSend));
            }

            if (!result.error) {
                setShowForm(false);
                setFormData({
                    name: '',
                    description: '',
                    image: null,
                    isActive: true
                });
                setImagePreview(null);
                setImageError('');
                setSelectedCategory(null);
            }
        } catch (err) {
            setImageError('Error uploading image. Please try again.');
            console.error('Upload error:', err);
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (categoryId) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            dispatch(deleteCategory(categoryId));
        }
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setFormData({
            name: category.name,
            description: category.description,
            image: null,
            isActive: category.isActive
        });
        setImagePreview(category.image);
        setShowForm(true);
    };

    // Pagination logic
    const totalPages = Math.ceil(categories.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedCategories = categories.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Categories Management</h1>
                <div className="flex gap-2">
                    <button
                        onClick={() => dispatch(fetchCategories())}
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
                            setSelectedCategory(null);
                            setFormData({
                                name: '',
                                description: '',
                                image: null,
                                isActive: true
                            });
                            setImagePreview(null);
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        {showForm ? 'Cancel' : 'Create New Category'}
                    </button>
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
                <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                    <h2 className="text-xl font-bold mb-4">
                        {selectedCategory ? 'Edit Category' : 'Create New Category'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
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
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={formData.isActive}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-900">Active</label>
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
                                    selectedCategory ? 'Update Category' : 'Create Category'
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedCategories.map((category) => (
                            <tr key={category._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="h-12 w-12 object-cover rounded-lg"
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{category.name}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900">{category.description}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${category.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {category.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => handleCategorySelect(category)}
                                        className="text-blue-600 hover:text-blue-900 mr-4"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(category._id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
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
                                    {Math.min(startIndex + itemsPerPage, categories.length)}
                                </span>{' '}
                                of <span className="font-medium">{categories.length}</span> results
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

export default Categories; 