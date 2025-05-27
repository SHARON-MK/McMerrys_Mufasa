import React from 'react';

const services = [
  {
    title: "Premium Support",
    description: "24/7 dedicated support for all your needs",
    image: "https://source.unsplash.com/random/400x300?support"
  },
  {
    title: "Expert Solutions",
    description: "Professional solutions tailored to your requirements",
    image: "https://source.unsplash.com/random/400x300?business"
  },
  {
    title: "Innovative Technology",
    description: "Cutting-edge technology for modern solutions",
    image: "https://source.unsplash.com/random/400x300?technology"
  }
];

const Services = () => {
  return (
    <section className="py-16 bg-[#fff700]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-black">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-black/50 rounded-lg overflow-hidden border border-[#fff700]/20">
              <img 
                src={service.image} 
                alt={service.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#fff700]">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 