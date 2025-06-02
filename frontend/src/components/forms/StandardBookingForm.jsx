import React from 'react';

const StandardBookingForm = ({ event, bookingData, handleInputChange, handleSubmit }) => (
  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label className="block text-sm font-medium mb-1">Name</label>
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
      <label className="block text-sm font-medium mb-1">Phone</label>
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
      <label className="block text-sm font-medium mb-1">Number of Tickets</label>
      <input
        type="number"
        name="numberOfTickets"
        value={bookingData.numberOfTickets}
        onChange={handleInputChange}
        min="1"
        required
        className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
      />
    </div>
    <div className="pt-4">
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-400">Price per ticket:</span>
        <span className="text-[#fff700]">${event.price}</span>
      </div>
      <div className="flex justify-between items-center mb-4 text-lg font-semibold">
        <span>Total:</span>
        <span className="text-[#fff700]">${(event.price * bookingData.numberOfTickets).toFixed(2)}</span>
      </div>
      <button
        type="submit"
        className="w-full bg-[#fff700] text-black font-bold py-3 px-4 rounded-md hover:bg-[#e6e000] transition-colors"
      >
        Book Now
      </button>
    </div>
  </form>
);

export default StandardBookingForm; 