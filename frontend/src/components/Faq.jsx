import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqData = [
  {
    id: 1,
    question: "What is MC Merrys?",
    answer: "MC Merrys is one of the fastest-growing and most budget-friendly event management firms based in Bangalore. We take pride in offering end-to-end event solutions, handling every detail with precision and creativity—so you don't have to worry about a thing. From planning to execution, our team does it all, ensuring your event is not only seamless but also unforgettable."
  },
  {
    id: 2,
    question: "What types of events do you manage?",
    answer: "We specialize in organizing a wide range of events including corporate events, weddings, private parties, product launches, conferences, exhibitions, and social gatherings."
  },
  {
    id: 3,
    question: "Can you customize an event according to our theme or requirements?",
    answer: "Absolutely! We work closely with clients to tailor every aspect of the event to match their vision, theme, and budget."
  },
  {
    id: 4,
    question: "How early should we book your services?",
    answer: "For birthday events, bookings must be made at least 24 hours in advance. We recommend booking at least 2–3 months in advance for most events. For larger or more complex events like weddings or corporate conferences, 6 months or more is ideal."
  },
  {
    id: 5,
    question: "What is your pricing structure?",
    answer: "Our pricing varies depending on the type and scale of the event. After understanding your requirements, we provide a detailed quote. We aim to work within your budget while maintaining quality."
  },
  {
    id: 6,
    question: "Can we hire you for specific services only, like decoration or catering?",
    answer: "Yes, we offer modular services. You can hire us for specific elements of your event, such as decor, entertainment, logistics, or catering."
  },
  {
    id: 7,
    question: "How do you ensure the success of an event?",
    answer: "We focus on detailed planning, clear communication, and professional execution. Our experienced team coordinates every element to ensure a smooth and memorable event."
  },
  {
    id: 8,
    question: "Do you provide on-site coordination during the event?",
    answer: "Yes, our event managers and coordinators are present on-site to manage all aspects of the event in real time."
  }
];

const MCMerrysFAQ = () => {
  const [openItems, setOpenItems] = useState(new Set([1])); // First item open by default

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const toggleAll = () => {
    if (openItems.size === faqData.length) {
      setOpenItems(new Set());
    } else {
      setOpenItems(new Set(faqData.map(item => item.id)));
    }
  };

  return (
    <section className="py-16 bg-[#fff700] via-yellow-400 to-orange-400">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-black/10 rounded-full mb-6">
            <HelpCircle className="w-8 h-8 text-black" />
          </div>
          <h2 className="text-4xl font-bold mb-4  text-black">
            Frequently Asked Questions
          </h2>
          <p className="text-xl  text-black/80 mb-6">
            Everything you need to know about Mc Merrys
          </p>
          <button
            onClick={toggleAll}
            className="inline-flex items-center gap-2 bg-black text-[#fff700] px-6 py-2 rounded-lg font-semibold hover:bg-black/90 transition-colors duration-300"
          >
            {openItems.size === faqData.length ? 'Collapse All' : 'Expand All'}
          </button>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item) => {
            const isOpen = openItems.has(item.id);
            
            return (
              <div
                key={item.id}
                className="bg-white/20  backdrop-blur-sm rounded-xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-5 text-left focus:outline-none focus:ring-4 focus:ring-black/20 hover:bg-white/10 transition-colors duration-200"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-black pr-4 leading-relaxed">
                      {item.question}
                    </h3>
                    <div className="flex-shrink-0">
                      <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                        <ChevronDown className="w-6 h-6 text-black" />
                      </div>
                    </div>
                  </div>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-5">
                    <div className="pt-2 border-t border-black/10">
                      <p className="text-black/90 leading-relaxed mt-3">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      

      </div>
    </section>
  );
};

export default MCMerrysFAQ;