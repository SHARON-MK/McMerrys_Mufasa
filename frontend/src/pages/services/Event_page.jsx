import React from 'react';
import { useSearchParams } from 'react-router-dom';

const events = [
  // Social Events
  {
    name: 'Naming Ceremony',
    description: 'Celebrate the precious moment of naming a newborn with elegant decorations and traditional rituals.',
    image: 'https://example.com/images/naming_ceremony.jpg',
    category: 'Social',
  },
  {
    name: 'Baby Showers',
    description: 'Make baby showers memorable with themed decor, games, and joyful moments.',
    image: 'https://example.com/images/baby_shower.jpg',
    category: 'Social',
  },
  {
    name: 'Family Reunions',
    description: 'Bringing generations together with activities, food, and nostalgic vibes.',
    image: 'https://example.com/images/family_reunion.jpg',
    category: 'Social',
  },

  // Corporate Events
  {
    name: 'Conferences and Seminars',
    description: 'Organizing impactful corporate conferences with stage setup, AV, and logistics.',
    image: 'https://example.com/images/conference_seminar.jpg',
    category: 'Corporate',
  },
  {
    name: 'Product Launches',
    description: 'Create a buzz with stunning launch events for your next big innovation.',
    image: 'https://example.com/images/product_launch.jpg',
    category: 'Corporate',
  },
  {
    name: 'Team Building Activity',
    description: 'Boost employee morale and collaboration with curated team activities.',
    image: 'https://example.com/images/team_building.jpg',
    category: 'Corporate',
  },

  // School Events
  {
    name: 'School Annual Day',
    description: 'Celebrate academic and extracurricular achievements with grand annual day functions.',
    image: 'https://example.com/images/school_annual_day.jpg',
    category: 'School',
  },
  {
    name: 'Special Festive Days Decorations',
    description: 'Decorating schools to celebrate national and cultural festivals in style.',
    image: 'https://example.com/images/festive_school_decor.jpg',
    category: 'School',
  },
  {
    name: 'Youth Festivals',
    description: 'Exciting inter-school youth festivals full of talent, enthusiasm, and energy.',
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
    <div className="min-h-screen bg-[#fff700] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 capitalize text-gray-900">
            {categoryParam} Events
          </h1>
          <div className="w-24 h-1 bg-[#fff700] mx-auto rounded-full"></div>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <img src={event.image} alt={event.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-2 h-8 bg-[#fff700] rounded-full mr-3"></div>
                    <h2 className="text-xl font-bold text-gray-900">{event.name}</h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{event.description}</p>
                  <button className="mt-4 w-full bg-[#fff700] text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-[#fff700]/90 transition-colors duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No events found for "{categoryParam}".</p>
            <button className="mt-4 bg-[#fff700] text-gray-900 font-semibold py-2 px-6 rounded-lg hover:bg-[#fff700]/90 transition-colors duration-300">
              View All Events
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventPage;
