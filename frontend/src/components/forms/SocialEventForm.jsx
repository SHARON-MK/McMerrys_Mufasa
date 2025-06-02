import React from 'react';

const SocialEventForm = ({ event, bookingData, handleInputChange, handleSubmit }) => (
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
        <label className="block text-sm font-medium mb-1">WhatsApp Number</label>
        <input
          type="tel"
          name="whatsapp"
          value={bookingData.whatsapp}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Alternative Contact Number</label>
        <input
          type="tel"
          name="alternativePhone"
          value={bookingData.alternativePhone}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Alternative Contact Person</label>
        <input
          type="text"
          name="alternativeContact"
          value={bookingData.alternativeContact}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        />
      </div>
    </div>

    {/* Event Details */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#fff700]">Event Details</h3>
      <div>
        <label className="block text-sm font-medium mb-1">Occasion</label>
        <select
          name="occasion"
          value={bookingData.occasion}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        >
          <option value="">Select occasion</option>
          <option value="naming">Naming Ceremony</option>
          <option value="anniversary">Anniversary</option>
          <option value="babyShower">Baby Shower</option>
          <option value="getTogether">Friends' Get-together</option>
          <option value="reunion">Family Reunion</option>
          <option value="housewarming">Housewarming</option>
          <option value="preWedding">Pre-wedding</option>
          <option value="haldi">Haldi Event</option>
          <option value="religious">Religious Event</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Expected Number of Guests</label>
        <input
          type="number"
          name="guestCount"
          value={bookingData.guestCount}
          onChange={handleInputChange}
          required
          min="1"
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Venue Preference</label>
        <select
          name="venuePreference"
          value={bookingData.venuePreference}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        >
          <option value="">Select venue preference</option>
          <option value="indoor">Indoor Venue</option>
          <option value="outdoor">Outdoor Venue</option>
          <option value="both">Open to Both</option>
        </select>
      </div>
    </div>

    {/* Theme & Entertainment */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#fff700]">Theme & Entertainment</h3>
      <div>
        <label className="block text-sm font-medium mb-1">Event Vibe</label>
        <select
          name="eventVibe"
          value={bookingData.eventVibe}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        >
          <option value="">Select vibe</option>
          <option value="casual">Casual</option>
          <option value="classy">Classy</option>
          <option value="fun">Fun</option>
          <option value="elegant">Elegant</option>
          <option value="tropical">Tropical</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Must-Have Features</label>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="features"
              value="dj"
              onChange={handleInputChange}
              className="form-checkbox text-[#fff700]"
            />
            <span>DJ</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="features"
              value="games"
              onChange={handleInputChange}
              className="form-checkbox text-[#fff700]"
            />
            <span>Games</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="features"
              value="photoBooth"
              onChange={handleInputChange}
              className="form-checkbox text-[#fff700]"
            />
            <span>Photo Booth</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="features"
              value="foodStations"
              onChange={handleInputChange}
              className="form-checkbox text-[#fff700]"
            />
            <span>Food Stations</span>
          </label>
        </div>
      </div>
    </div>

    {/* Food & Budget */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#fff700]">Food & Budget</h3>
      <div>
        <label className="block text-sm font-medium mb-1">Food & Drinks</label>
        <select
          name="foodType"
          value={bookingData.foodType}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        >
          <option value="">Select food type</option>
          <option value="plated">Plated Dinner</option>
          <option value="buffet">Buffet</option>
          <option value="snacks">Snacks & Appetizers</option>
          <option value="cocktails">Cocktails & Mocktails</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Budget Range</label>
        <select
          name="budgetRange"
          value={bookingData.budgetRange}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        >
          <option value="">Select budget range</option>
          <option value="budget">Budget Friendly</option>
          <option value="moderate">Moderate</option>
          <option value="premium">Premium</option>
          <option value="luxury">Luxury</option>
        </select>
      </div>
    </div>

    {/* Additional Services */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#fff700]">Additional Services</h3>
      <div>
        <label className="block text-sm font-medium mb-1">Additional Services Needed</label>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="additionalServices"
              value="invites"
              onChange={handleInputChange}
              className="form-checkbox text-[#fff700]"
            />
            <span>Invitations</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="additionalServices"
              value="decor"
              onChange={handleInputChange}
              className="form-checkbox text-[#fff700]"
            />
            <span>Decor</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="additionalServices"
              value="entertainment"
              onChange={handleInputChange}
              className="form-checkbox text-[#fff700]"
            />
            <span>Entertainment</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="additionalServices"
              value="coordination"
              onChange={handleInputChange}
              className="form-checkbox text-[#fff700]"
            />
            <span>Event Coordination</span>
          </label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Special Requests</label>
        <textarea
          name="specialRequests"
          value={bookingData.specialRequests}
          onChange={handleInputChange}
          rows="3"
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
          placeholder="Any special requests or things to avoid"
        />
      </div>
    </div>

    <button
      type="submit"
      className="w-full bg-[#fff700] text-black font-bold py-3 px-4 rounded-md hover:bg-[#e6e000] transition-colors"
    >
      Submit Event Request
    </button>
  </form>
);

export default SocialEventForm; 