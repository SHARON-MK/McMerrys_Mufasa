import React from 'react';

const BirthdayPartyForm = ({ event, bookingData, handleInputChange, handleSubmit }) => (
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
        <label className="block text-sm font-medium mb-1">Are you the birthday person?</label>
        <select
          name="isBirthdayPerson"
          value={bookingData.isBirthdayPerson}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        >
          <option value="">Select option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
    </div>

    {/* Birthday Star Information */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#fff700]">Birthday Star Information</h3>
      <div>
        <label className="block text-sm font-medium mb-1">Birthday Person's Name</label>
        <input
          type="text"
          name="birthdayPersonName"
          value={bookingData.birthdayPersonName}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Age</label>
        <input
          type="number"
          name="age"
          value={bookingData.age}
          onChange={handleInputChange}
          required
          min="1"
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Favorite Colors/Themes</label>
        <input
          type="text"
          name="favoriteColors"
          value={bookingData.favoriteColors}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
          placeholder="e.g., Blue, Space, Dinosaurs"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Desired Vibe</label>
        <select
          name="desiredVibe"
          value={bookingData.desiredVibe}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        >
          <option value="">Select vibe</option>
          <option value="fun">Fun & Playful</option>
          <option value="elegant">Elegant & Sophisticated</option>
          <option value="adventure">Adventure & Excitement</option>
          <option value="relaxed">Relaxed & Casual</option>
        </select>
      </div>
    </div>

    {/* Event Details */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#fff700]">Event Details</h3>
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

    {/* Entertainment & Food */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#fff700]">Entertainment & Food</h3>
      <div>
        <label className="block text-sm font-medium mb-1">Entertainment Preferences</label>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="entertainment"
              value="games"
              onChange={handleInputChange}
              className="form-checkbox text-[#fff700]"
            />
            <span>Games & Activities</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="entertainment"
              value="music"
              onChange={handleInputChange}
              className="form-checkbox text-[#fff700]"
            />
            <span>Music & DJ</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="entertainment"
              value="magic"
              onChange={handleInputChange}
              className="form-checkbox text-[#fff700]"
            />
            <span>Magic Show</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="entertainment"
              value="facePainting"
              onChange={handleInputChange}
              className="form-checkbox text-[#fff700]"
            />
            <span>Face Painting</span>
          </label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Food Preferences</label>
        <select
          name="foodPreference"
          value={bookingData.foodPreference}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        >
          <option value="">Select food preference</option>
          <option value="snacks">Snacks & Finger Foods</option>
          <option value="buffet">Buffet</option>
          <option value="plated">Plated Dinner</option>
          <option value="custom">Custom Menu</option>
        </select>
      </div>
    </div>

    {/* Budget & Special Requests */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#fff700]">Budget & Special Requests</h3>
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
      Book Birthday Party
    </button>
  </form>
);

export default BirthdayPartyForm; 