import React from 'react';
import { useSearchParams } from 'react-router-dom';

const events = [
  // Social Events
  {
    name: 'Naming Ceremony',
    description: 'Celebrate the precious moment of naming a newborn with elegant decorations and rituals.',
    image: 'https://example.com/images/naming_ceremony.jpg',
    category: 'Social',
  },
  {
    name: 'Baby Showers',
    description: 'Cherish the upcoming arrival with themed decor and memorable games.',
    image: 'https://example.com/images/baby_shower.jpg',
    category: 'Social',
  },
  {
    name: 'Family Reunions',
    description: 'Reconnect across generations with fun, food, and warmth.',
    image: 'https://example.com/images/family_reunion.jpg',
    category: 'Social',
  },
  {
    name: 'House Warming',
    description: 'Start new beginnings with beautiful décor and warm wishes.',
    image: 'https://example.com/images/house_warming.jpg',
    category: 'Social',
  },

  // Corporate Events
  {
    name: 'Conferences and Seminars',
    description: 'Professional setups for impactful corporate interactions.',
    image: 'https://example.com/images/conference_seminar.jpg',
    category: 'Corporate',
  },
  {
    name: 'Product Launches',
    description: 'Unveil new ideas with exciting launch experiences.',
    image: 'https://example.com/images/product_launch.jpg',
    category: 'Corporate',
  },
  {
    name: 'Team Building Activity',
    description: 'Boost employee morale through engaging group activities.',
    image: 'https://example.com/images/team_building.jpg',
    category: 'Corporate',
  },

  // School Events
  {
    name: 'School Annual Day',
    description: 'Celebrate milestones and achievements in style.',
    image: 'https://example.com/images/school_annual_day.jpg',
    category: 'School',
  },
  {
    name: 'Festive Day Decorations',
    description: 'Bring vibrance to campus with seasonal themes.',
    image: 'https://example.com/images/festive_school_decor.jpg',
    category: 'School',
  },
  {
    name: 'Youth Festivals',
    description: 'Celebrate youth creativity and energy with vibrant fests.',
    image: 'https://example.com/images/youth_festival.jpg',
    category: 'School',
  },
];

const EventPage = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('name');

  const filteredEvents = events.filter(
    (e) => e.category.toLowerCase() === categoryParam?.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-[#fff700] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 capitalize">
            {categoryParam} Events
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Curated {categoryParam?.toLowerCase()} event experiences.
          </p>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredEvents.map((event, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow hover:shadow-lg transition-transform hover:-translate-y-1"
              >
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-32 object-cover rounded-t-xl"
                />
                <div className="p-3">
                  <div className="flex justify-between items-center mb-1">
                    <h2 className="text-base font-semibold text-gray-800">{event.name}</h2>
                    <span className="text-xs bg-yellow-300 text-gray-900 px-2 py-0.5 rounded-full">
                      {event.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                  <button className="mt-3 w-full text-sm bg-yellow-400 text-gray-900 font-medium py-1.5 rounded hover:bg-yellow-300 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No events found for "{categoryParam}".</p>
            <a
              href="/events"
              className="mt-4 inline-block bg-yellow-400 text-gray-900 font-medium py-2 px-6 rounded hover:bg-yellow-300 transition"
            >
              View All Events
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventPage;
