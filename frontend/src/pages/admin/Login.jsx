import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, AlertCircle, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, clearError } from '../../store/slices/authSlice';
import logo from '../../../public/logo/logo.png';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token, loading, error } = useSelector((state) => state.auth);
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    useEffect(() => {
        if (token) {
            navigate('/admin/dashboard');
        }
    }, [token, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(login(formData));
        if (!result.error) {
            navigate('/admin/dashboard');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <div className="min-h-screen bg-yellow-300 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-30 blur-xl"></div>
                <div className="absolute top-1/4 -right-16 w-40 h-40 bg-yellow-300 rounded-full opacity-20 blur-xl"></div>
                <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-yellow-200 rounded-full opacity-25 blur-xl"></div>
            </div>

            <div className="w-full max-w-sm relative">
                {/* Brand Header */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-17 h-16 bg-black rounded-xl shadow-lg mb-3 border-2 border-black">
                        <img 
                            src={logo} 
                            alt="MC MERRYS Logo" 
                            className="h-8 sm:h-8 md:h-10 w-24"
                        />
                    </div>
                    <p className="text-gray-700 text-sm font-medium">Admin Login</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl shadow-xl border-2 border-black p-6 relative">
                    {/* Loading State */}
                    {loading && (
                        <div className="absolute inset-0 bg-yellow-50 rounded-2xl flex items-center justify-center z-10 border-2 border-black">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3 border border-black">
                                    <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                </div>
                                <p className="text-black font-bold text-sm">Signing in...</p>
                            </div>
                        </div>
                    )}

                    <h2 className="text-xl font-bold text-black text-center mb-5">
                        Welcome Back
                    </h2>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-3 mb-4 flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                                <p className="text-red-700 text-xs font-medium">{error}</p>
                            </div>
                            <button
                                onClick={() => dispatch(clearError())}
                                className="text-red-400 hover:text-red-600 transition-colors"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email Field */}
                        <div className="space-y-1">
                            <label htmlFor="email" className="block text-xs font-bold text-black uppercase tracking-wide">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className={`w-4 h-4 transition-colors ${
                                        focusedField === 'email' ? 'text-yellow-500' : 'text-gray-400'
                                    }`} />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    onKeyPress={handleKeyPress}
                                    className="w-full pl-10 pr-3 py-2.5 border-2 border-black rounded-lg bg-white focus:bg-yellow-50 focus:border-yellow-400 transition-all duration-200 text-black placeholder-gray-500 focus:outline-none text-sm"
                                    placeholder="admin@mcmerrys.com"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-1">
                            <label htmlFor="password" className="block text-xs font-bold text-black uppercase tracking-wide">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className={`w-4 h-4 transition-colors ${
                                        focusedField === 'password' ? 'text-yellow-500' : 'text-gray-400'
                                    }`} />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    onKeyPress={handleKeyPress}
                                    className="w-full pl-10 pr-10 py-2.5 border-2 border-black rounded-lg bg-white focus:bg-yellow-50 focus:border-yellow-400 transition-all duration-200 text-black placeholder-gray-500 focus:outline-none text-sm"
                                    placeholder="Enter password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-black transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-2.5 px-4 rounded-lg border-2 border-black shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm mt-5"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                    <span>Signing in...</span>
                                </div>
                            ) : (
                                'SIGN IN'
                            )}
                        </button>
                    </form>
                </div>

                {/* Simple Footer */}
                <div className="text-center mt-4">
                    <p className="text-gray-600 text-xs">
                        © 2025 MC Merrys
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login; 