import React from 'react';

const SocialEventsBookingForm = ({ event, bookingData, handleInputChange, handleSubmit }) => (
  <form onSubmit={handleSubmit} className="space-y-4">
    {/* Contact Information */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#fff700]">Contact Information</h3>
      <div>
        <label className="block text-sm font-medium mb-1">Your Name</label>
        <input
          type="text"
          name="name"
          value={bookingData.name}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={bookingData.email}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={bookingData.phone}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Relationship to Event</label>
        <select
          name="relationship"
          value={bookingData.relationship}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        >
          <option value="">Select relationship</option>
          <option value="host">Host/Organizer</option>
          <option value="family-member">Family Member</option>
          <option value="friend">Friend</option>
          <option value="event-planner">Event Planner</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>

    {/* Social Event Details */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#fff700]">Social Event Details</h3>
      {/* <div>
        <label className="block text-sm font-medium mb-1">Event Type</label>
        <select
          name="eventType"
          value={bookingData.eventType}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        >
          <option value="">Select event type</option>
          <option value="wedding">Wedding</option>
          <option value="birthday-party">Birthday Party</option>
          <option value="anniversary">Anniversary</option>
          <option value="baby-shower">Baby Shower</option>
          <option value="bridal-shower">Bridal Shower</option>
          <option value="engagement-party">Engagement Party</option>
          <option value="graduation-party">Graduation Party</option>
          <option value="family-reunion">Family Reunion</option>
          <option value="holiday-party">Holiday Party</option>
          <option value="retirement-party">Retirement Party</option>
          <option value="housewarming">Housewarming</option>
          <option value="memorial-service">Memorial Service</option>
          <option value="other">Other</option>
        </select>
      </div> */}
      <div>
        <label className="block text-sm font-medium mb-1">Guest Count</label>
        <input
          type="number"
          name="guestCount"
          value={bookingData.guestCount}
          onChange={handleInputChange}
          required
          min="1"
          max="500"
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Event Date</label>
        <input
          type="date"
          name="eventDate"
          value={bookingData.eventDate}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Event Time</label>
        <select
          name="eventTime"
          value={bookingData.eventTime}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        >
          <option value="">Select time</option>
          <option value="morning">Morning (9 AM - 12 PM)</option>
          <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
          <option value="evening">Evening (5 PM - 10 PM)</option>
          <option value="night">Night (10 PM - 2 AM)</option>
          <option value="all-day">All Day</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Venue Preference</label>
        <select
          name="venuePreference"
          value={bookingData.venuePreference}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        >
          <option value="">Select venue preference</option>
          <option value="our-venue">Our Venue</option>
          <option value="home">Private Home</option>
          <option value="outdoor">Outdoor Venue</option>
          <option value="banquet-hall">Banquet Hall</option>
          <option value="restaurant">Restaurant</option>
          <option value="community-center">Community Center</option>
          <option value="other">Other Location</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Event Theme/Style</label>
        <input
          type="text"
          name="eventTheme"
          value={bookingData.eventTheme}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
          placeholder="e.g., Vintage, Modern, Tropical, Elegant, Casual"
        />
      </div>
    </div>

    {/* Services & Preferences */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#fff700]">Services & Preferences</h3>
      <div>
        <label className="block text-sm font-medium mb-1">Budget Range</label>
        <select
          name="budgetRange"
          value={bookingData.budgetRange}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        >
          <option value="">Select budget range</option>
          <option value="under-1k">Under $1,000</option>
          <option value="1k-3k">$1,000 - $3,000</option>
          <option value="3k-5k">$3,000 - $5,000</option>
          <option value="5k-10k">$5,000 - $10,000</option>
          <option value="10k-20k">$10,000 - $20,000</option>
          <option value="over-20k">Over $20,000</option>
          <option value="discuss">Prefer to Discuss</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Catering Style</label>
        <select
          name="cateringStyle"
          value={bookingData.cateringStyle}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        >
          <option value="">Select catering style</option>
          <option value="none">No Catering</option>
          <option value="cocktail-reception">Cocktail Reception</option>
          <option value="buffet">Buffet Style</option>
          <option value="plated-dinner">Plated Dinner</option>
          <option value="family-style">Family Style</option>
          <option value="appetizers-only">Appetizers Only</option>
          <option value="dessert-only">Dessert Only</option>
          <option value="full-service">Full Service</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Entertainment Options (Check all that apply)</label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {[
            'DJ Services',
            'Live Band',
            'Photographer',
            'Videographer',
            'Photo Booth',
            'Dancing',
            'Games/Activities',
            'Kids Entertainment'
          ].map((entertainment) => (
            <label key={entertainment} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="entertainment"
                value={entertainment.toLowerCase().replace(/[^a-z0-9]/g, '-')}
                checked={bookingData.entertainment?.includes(entertainment.toLowerCase().replace(/[^a-z0-9]/g, '-')) || false}
                onChange={handleInputChange}
                className="rounded border-gray-600 text-[#fff700] focus:ring-[#fff700]"
              />
              <span className="text-sm">{entertainment}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Decoration Preferences</label>
        <select
          name="decorations"
          value={bookingData.decorations}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        >
          <option value="">Select decoration level</option>
          <option value="none">No Decorations</option>
          <option value="minimal">Minimal Decorations</option>
          <option value="standard">Standard Decorations</option>
          <option value="elaborate">Elaborate Decorations</option>
          <option value="custom">Custom Theme Decorations</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Special Dietary Requirements</label>
        <textarea
          name="dietaryRequirements"
          value={bookingData.dietaryRequirements}
          onChange={handleInputChange}
          rows="2"
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
          placeholder="e.g., Vegetarian, Vegan, Gluten-free, Allergies"
        />
      </div>
    </div>

    {/* Guest Information */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#fff700]">Guest Information</h3>
      <div>
        <label className="block text-sm font-medium mb-1">Age Groups Expected (Check all that apply)</label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {[
            'Children (0-12)',
            'Teenagers (13-19)',
            'Young Adults (20-35)',
            'Adults (36-65)',
            'Seniors (65+)'
          ].map((ageGroup) => (
            <label key={ageGroup} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="ageGroups"
                value={ageGroup.toLowerCase().replace(/[^a-z0-9]/g, '-')}
                checked={bookingData.ageGroups?.includes(ageGroup.toLowerCase().replace(/[^a-z0-9]/g, '-')) || false}
                onChange={handleInputChange}
                className="rounded border-gray-600 text-[#fff700] focus:ring-[#fff700]"
              />
              <span className="text-sm">{ageGroup}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Special Accommodations</label>
        <textarea
          name="specialAccommodations"
          value={bookingData.specialAccommodations}
          onChange={handleInputChange}
          rows="2"
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
          placeholder="Accessibility needs, parking requirements, etc."
        />
      </div>
    </div>

    {/* Additional Information */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#fff700]">Additional Information</h3>
      <div>
        <label className="block text-sm font-medium mb-1">How did you hear about us?</label>
        <select
          name="referralSource"
          value={bookingData.referralSource}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        >
          <option value="">Select source</option>
          <option value="social-media">Social Media</option>
          <option value="friend-family">Friend/Family</option>
          <option value="wedding-vendor">Wedding Vendor</option>
          <option value="google-search">Google Search</option>
          <option value="wedding-website">Wedding Website</option>
          <option value="bridal-show">Bridal Show</option>
          <option value="referral">Previous Client Referral</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Event Vision & Goals</label>
        <textarea
          name="eventVision"
          value={bookingData.eventVision}
          onChange={handleInputChange}
          rows="3"
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
          placeholder="Describe your vision for this special event and what you hope to achieve"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Additional Comments</label>
        <textarea
          name="comments"
          value={bookingData.comments}
          onChange={handleInputChange}
          rows="3"
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
          placeholder="Any additional details, special requests, or questions about your event"
        />
      </div>
    </div>

    <button
      type="submit"
      className="w-full bg-[#fff700] text-black font-bold py-3 px-4 rounded-md hover:bg-[#e6e000] transition-colors"
    >
      Submit Social Event Request
    </button>
  </form>
);

export default SocialEventsBookingForm;