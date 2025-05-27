// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Eye, 
  EyeOff, 
  ChevronRight,
  Star,
  Users,
  Calendar,
  HelpCircle,
  Menu,
  X,
  ArrowRight
} from "lucide-react";
import { ServicesScreen } from "../services/Service";

const Home = () => {

      const [currentScreen, setCurrentScreen] = useState("landing");
  const [showPassword, setShowPassword] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  // Animation state
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

      const screens = {
    landing: {
      title: "MC MERRYS",
      subtitle: "Even more reasons to be part of this",
      bgGradient: "from-yellow-600 via-yellow-600 to-red-500"
    },
    signin: {
      title: "Welcome Back",
      subtitle: "Sign in to your account",
      bgGradient: "from-blue-600 via-purple-600 to-pink-500"
    },
    signup: {
      title: "Join MC MERRYS",
      subtitle: "Create your account today",
      bgGradient: "from-green-600 via-teal-600 to-blue-500"
    },
    services: {
      title: "Our Services",
      subtitle: "Well known services",
      bgGradient: "from-orange-600 via-red-600 to-pink-500"
    },
    help: {
      title: "Help Centre",
      subtitle: "We're here to help",
      bgGradient: "from-indigo-600 via-purple-600 to-pink-500"
    }
  };

  return (
    <>
   <div className={`min-h-screen bg-gradient-to-br ${screens.landing.bgGradient} relative overflow-hidden`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-white/15 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/10 rounded-full animate-bounce"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center p-6">
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="p-2 bg-white/20 rounded-full backdrop-blur-sm"
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
        <div className="text-white text-right">
          <button 
            onClick={() => setCurrentScreen("signin")}
            className="text-sm hover:underline"
          >
            Sign in
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <div className={`transform transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-5xl font-bold text-white mb-4 tracking-wider">
            MC MERRYS
          </h1>
          <p className="text-xl text-white/90 mb-12 max-w-sm">
            Even more reasons to be part of this
          </p>
          
          <div className="space-y-4 w-full max-w-sm">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-6 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            
            <button 
              onClick={() => setCurrentScreen("signup")}
              className="w-full bg-white text-purple-600 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-8">
            <p className="text-white/80 italic text-lg">
              "The right moment calls for the right support"
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-6 w-full px-6">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => setCurrentScreen("services")}
            className="text-white/80 hover:text-white transition-colors"
          >
            Services
          </button>
          <button 
            onClick={() => setCurrentScreen("help")}
            className="text-white/80 hover:text-white transition-colors"
          >
            Help Centre
          </button>
        </div>
      </div>
    </div>
<ServicesScreen/>

    </>
  );
  
};

export default Home;
