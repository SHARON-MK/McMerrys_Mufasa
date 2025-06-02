import React from 'react';

const ConcertBookingForm = ({ event, bookingData, handleInputChange, handleSubmit }) => (
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
    </div>

    {/* Ticket Information */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#fff700]">Ticket Information</h3>
      <div>
        <label className="block text-sm font-medium mb-1">Seating Preference</label>
        <select
          name="seatingPreference"
          value={bookingData.seatingPreference}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        >
          <option value="">Select seating preference</option>
          <option value="vip">VIP</option>
          <option value="premium">Premium</option>
          <option value="standard">Standard</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Number of Tickets</label>
        <input
          type="number"
          name="ticketCount"
          value={bookingData.ticketCount}
          onChange={handleInputChange}
          required
          min="1"
          max="6"
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        />
        <p className="text-sm text-gray-400 mt-1">Maximum 6 tickets per booking</p>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Special Requirements</label>
        <textarea
          name="specialRequirements"
          value={bookingData.specialRequirements}
          onChange={handleInputChange}
          rows="3"
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
          placeholder="Any special requirements or accommodations needed"
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
          <option value="social">Social Media</option>
          <option value="friend">Friend/Family</option>
          <option value="search">Search Engine</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Questions or Comments</label>
        <textarea
          name="comments"
          value={bookingData.comments}
          onChange={handleInputChange}
          rows="3"
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
          placeholder="Any questions or comments about the concert"
        />
      </div>
    </div>

    <button
      type="submit"
      className="w-full bg-[#fff700] text-black font-bold py-3 px-4 rounded-md hover:bg-[#e6e000] transition-colors"
    >
      Get Tickets
    </button>
  </form>
);

export default ConcertBookingForm; 