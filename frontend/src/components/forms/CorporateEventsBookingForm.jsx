import React from 'react';

const CorporateEventsBookingForm = ({ event, bookingData, handleInputChange, handleSubmit }) => (
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
        <label className="block text-sm font-medium mb-1">Company Name</label>
        <input
          type="text"
          name="companyName"
          value={bookingData.companyName}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Job Title</label>
        <input
          type="text"
          name="jobTitle"
          value={bookingData.jobTitle}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        />
      </div>
    </div>

    {/* Corporate Event Details */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#fff700]">Corporate Event Details</h3>
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
          <option value="conference">Conference</option>
          <option value="seminar">Seminar</option>
          <option value="workshop">Workshop</option>
          <option value="team-building">Team Building</option>
          <option value="product-launch">Product Launch</option>
          <option value="corporate-meeting">Corporate Meeting</option>
          <option value="training">Training Session</option>
          <option value="networking">Networking Event</option>
          <option value="company-party">Company Party</option>
          <option value="other">Other</option>
        </select>
      </div> */}
      <div>
        <label className="block text-sm font-medium mb-1">Expected Number of Attendees</label>
        <input
          type="number"
          name="attendees"
          value={bookingData.attendees}
          onChange={handleInputChange}
          required
          min="1"
          max="1000"
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Preferred Event Date</label>
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
        <label className="block text-sm font-medium mb-1">Event Duration</label>
        <select
          name="duration"
          value={bookingData.duration}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        >
          <option value="">Select duration</option>
          <option value="half-day">Half Day (4 hours)</option>
          <option value="full-day">Full Day (8 hours)</option>
          <option value="multi-day">Multi-Day Event</option>
          <option value="custom">Custom Duration</option>
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
          <option value="client-venue">Client's Venue</option>
          <option value="third-party">Third-Party Venue</option>
          <option value="virtual">Virtual Event</option>
          <option value="hybrid">Hybrid Event</option>
        </select>
      </div>
    </div>

    {/* Services & Requirements */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#fff700]">Services & Requirements</h3>
      <div>
        <label className="block text-sm font-medium mb-1">Budget Range</label>
        <select
          name="budgetRange"
          value={bookingData.budgetRange}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        >
          <option value="">Select budget range</option>
          <option value="under-5k">Under $5,000</option>
          <option value="5k-15k">$5,000 - $15,000</option>
          <option value="15k-30k">$15,000 - $30,000</option>
          <option value="30k-50k">$30,000 - $50,000</option>
          <option value="over-50k">Over $50,000</option>
          <option value="discuss">Prefer to Discuss</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Catering Requirements</label>
        <select
          name="catering"
          value={bookingData.catering}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        >
          <option value="">Select catering option</option>
          <option value="none">No Catering</option>
          <option value="coffee-breaks">Coffee Breaks Only</option>
          <option value="light-refreshments">Light Refreshments</option>
          <option value="lunch">Lunch</option>
          <option value="full-catering">Full Day Catering</option>
          <option value="custom">Custom Catering</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Equipment Needs (Check all that apply)</label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {[
            'Audio/Visual Equipment',
            'Microphones',
            'Projectors/Screens',
            'Live Streaming',
            'Photography',
            'Videography',
            'Lighting',
            'Sound System'
          ].map((equipment) => (
            <label key={equipment} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="equipment"
                value={equipment.toLowerCase().replace(/[^a-z0-9]/g, '-')}
                checked={bookingData.equipment?.includes(equipment.toLowerCase().replace(/[^a-z0-9]/g, '-')) || false}
                onChange={handleInputChange}
                className="rounded border-gray-600 text-[#fff700] focus:ring-[#fff700]"
              />
              <span className="text-sm">{equipment}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Special Requirements</label>
        <textarea
          name="specialRequirements"
          value={bookingData.specialRequirements}
          onChange={handleInputChange}
          rows="3"
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
          placeholder="Any special requirements, accessibility needs, or specific requests"
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
          <option value="website">Company Website</option>
          <option value="social-media">Social Media</option>
          <option value="referral">Business Referral</option>
          <option value="linkedin">LinkedIn</option>
          <option value="google">Google Search</option>
          <option value="industry-event">Industry Event</option>
          <option value="partner">Partner Company</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Event Goals & Objectives</label>
        <textarea
          name="eventGoals"
          value={bookingData.eventGoals}
          onChange={handleInputChange}
          rows="3"
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
          placeholder="What are the main goals and objectives for this corporate event?"
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
          placeholder="Any additional information or questions about your corporate event"
        />
      </div>
    </div>

    <button
      type="submit"
      className="w-full bg-[#fff700] text-black font-bold py-3 px-4 rounded-md hover:bg-[#e6e000] transition-colors"
    >
      Submit Corporate Event Request
    </button>
  </form>
);

export default CorporateEventsBookingForm;