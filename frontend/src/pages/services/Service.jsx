import { ArrowLeft, ChevronRight } from "lucide-react"; // adjust if icons differ
import { useState } from "react";

export const ServicesScreen = () => {
  const [currentScreen, setCurrentScreen] = useState("services");

  const screens = {
    landing: {
      title: "MC MERRYS",
      subtitle: "Even more reasons to be part of this",
      bgGradient: "from-yellow-600 via-yellow-600 to-red-500",
    },
    signin: {
      title: "Welcome Back",
      subtitle: "Sign in to your account",
      bgGradient: "from-blue-600 via-purple-600 to-pink-500",
    },
    signup: {
      title: "Join MC MERRYS",
      subtitle: "Create your account today",
      bgGradient: "from-green-600 via-teal-600 to-blue-500",
    },
    services: {
      title: "Our Services",
      subtitle: "Well known services",
      bgGradient: "from-yellow-600 via--600 to-pink-500",
    },
  };

  const services = [
    {
      title: "Event Planning",
      description: "Professional event planning services for any occasion.",
      icon: "🎉",
    },
    {
      title: "Catering",
      description: "Delicious catering tailored to your event needs.",
      icon: "🍽️",
    },
    {
      title: "Photography",
      description: "Capture every moment with our photography team.",
      icon: "📸",
    },
  ];

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${screens.services.bgGradient} relative`}
    >
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <button
            onClick={() => setCurrentScreen("landing")}
            className="p-2 bg-white/20 rounded-full backdrop-blur-sm"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">Services</h1>
          <div className="w-10"></div>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 py-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Our Services</h2>
            <p className="text-white/80">Well known services</p>
          </div>

          <div className="space-y-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30 hover:bg-white/30 transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{service.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {service.title}
                    </h3>
                    <p className="text-white/80">{service.description}</p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-white/60" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/90 transform hover:scale-105 transition-all duration-200">
              Book a Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
