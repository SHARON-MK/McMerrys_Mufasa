import React, { useState, useEffect } from 'react';
import { Plus, Image as ImageIcon, X, Edit2, Trash2 } from 'lucide-react';
import axios from 'axios';
import { ADMIN_ENDPOINTS } from '../../constants/api';
import axiosInstance from '../../utils/axios'

const Advertisements = () => {
    const [ads, setAds] = useState([]);
    const [isAddingAd, setIsAddingAd] = useState(false);
    const [isEditingAd, setIsEditingAd] = useState(false);
    const [selectedAd, setSelectedAd] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [newAd, setNewAd] = useState({
        title: '',
        description: '',
        image: null,
        imagePreview: null
    });

    useEffect(() => {
        fetchAds();
    }, []);

    const fetchAds = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get(ADMIN_ENDPOINTS.LIST);
            setAds(response.data);
        } catch (error) {
            console.error('Error fetching advertisements:', error);
            setError('Failed to fetch advertisements');
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewAd({
                ...newAd,
                image: file,
                imagePreview: URL.createObjectURL(file)
            });
        }
    };

  

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            setError('');

            const formData = new FormData();
            formData.append('title', newAd.title);
            formData.append('description', newAd.description);
            
            if (newAd.image instanceof File) {
                formData.append('image', newAd.image);
            }

            if (isEditingAd) {
                await axiosInstance.put(ADMIN_ENDPOINTS.UPDATE(selectedAd._id), formData);
            } else {
                await axiosInstance.post(ADMIN_ENDPOINTS.CREATE_AD, formData, );
            }

            await fetchAds();
            resetForm();
        } catch (error) {
            console.error('Error saving advertisement:', error);
            setError(error.response?.data?.message || 'Failed to save advertisement');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (ad) => {
        setSelectedAd(ad);
        setNewAd({
            title: ad.title,
            description: ad.description,
            image: null,
            imagePreview: ad.image
        });
        setIsEditingAd(true);
        setIsAddingAd(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this advertisement?')) {
            return;
        }
        console.log(id);
        

        try {
            setIsLoading(true);
            await axiosInstance.delete(ADMIN_ENDPOINTS.DELETE(id));
            await fetchAds();
        } catch (error) {
            console.error('Error deleting advertisement:', error);
            setError('Failed to delete advertisement');
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setNewAd({
            title: '',
            description: '',
            image: null,
            imagePreview: null
        });
        setIsAddingAd(false);
        setIsEditingAd(false);
        setSelectedAd(null);
        setError('');
    };

    if (isLoading && !isAddingAd) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
            </div>
        );
    }

    return (
        <div className="p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Advertisements</h1>
                        <p className="text-gray-600 mt-1">Manage your promotional content</p>
                    </div>
                    <button
                        onClick={() => setIsAddingAd(true)}
                        className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Create New Ad
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Ads Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {!ads || ads.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-lg">
                            <ImageIcon className="w-16 h-16 text-gray-400 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Advertisements</h3>
                            <p className="text-gray-500 text-center max-w-md">
                                There are no advertisements yet. Click the "Create New Ad" button to add your first advertisement.
                            </p>
                        </div>
                    ) : (
                        Array.isArray(ads) && ads.map((ad) => (
                            <div key={ad?._id || Math.random()} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                {ad?.image && (
                                    <div className="relative h-48">
                                        <img
                                            src={ad.image}
                                            alt={ad?.title || 'Advertisement'}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-2 right-2 flex gap-2">
                                            <button
                                                onClick={() => handleEdit(ad)}
                                                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(ad._id)}
                                                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{ad?.title || 'Untitled'}</h3>
                                    <p className="text-gray-600 text-sm">{ad?.description || 'No description available'}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Add/Edit Ad Modal */}
                {isAddingAd && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold text-gray-800">
                                        {isEditingAd ? 'Edit Advertisement' : 'Create New Advertisement'}
                                    </h2>
                                    <button
                                        onClick={resetForm}
                                        className="p-2 hover:bg-gray-100 rounded-lg"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            value={newAd.title}
                                            onChange={(e) => setNewAd({ ...newAd, title: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Description
                                        </label>
                                        <textarea
                                            value={newAd.description}
                                            onChange={(e) => setNewAd({ ...newAd, description: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                                            rows="4"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Image
                                        </label>
                                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                                            <div className="space-y-1 text-center">
                                                {newAd.imagePreview ? (
                                                    <div className="relative">
                                                        <img
                                                            src={newAd.imagePreview}
                                                            alt="Preview"
                                                            className="mx-auto h-32 w-auto object-cover"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setNewAd({ ...newAd, image: null, imagePreview: null })}
                                                            className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                                            disabled={isLoading}
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                                        <div className="flex text-sm text-gray-600">
                                                            <label
                                                                htmlFor="image-upload"
                                                                className="relative cursor-pointer bg-white rounded-md font-medium text-yellow-600 hover:text-yellow-500 focus-within:outline-none"
                                                            >
                                                                <span>Upload a file</span>
                                                                <input
                                                                    id="image-upload"
                                                                    name="image-upload"
                                                                    type="file"
                                                                    className="sr-only"
                                                                    accept="image/*"
                                                                    onChange={handleImageChange}
                                                                    required={!isEditingAd}
                                                                    disabled={isLoading}
                                                                />
                                                            </label>
                                                            <p className="pl-1">or drag and drop</p>
                                                        </div>
                                                        <p className="text-xs text-gray-500">
                                                            PNG, JPG, GIF up to 10MB
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-4 mt-6">
                                        <button
                                            type="button"
                                            onClick={resetForm}
                                            className="px-4 py-2 text-gray-700 hover:text-gray-900"
                                            disabled={isLoading}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className={`px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 ${
                                                isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                            }`}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-black"></div>
                                                    <span>{isEditingAd ? 'Updating...' : 'Creating...'}</span>
                                                </div>
                                            ) : (
                                                isEditingAd ? 'Update Ad' : 'Create Ad'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Advertisements; 