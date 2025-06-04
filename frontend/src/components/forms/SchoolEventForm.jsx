import React from 'react';

const SchoolEventsBookingForm = ({ event, bookingData, handleInputChange, handleSubmit }) => (
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
        <label className="block text-sm font-medium mb-1">School/Institution Name</label>
        <input
          type="text"
          name="schoolName"
          value={bookingData.schoolName}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Your Role</label>
        <select
          name="role"
          value={bookingData.role}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        >
          <option value="">Select your role</option>
          <option value="teacher">Teacher</option>
          <option value="principal">Principal</option>
          <option value="administrator">Administrator</option>
          <option value="counselor">Counselor</option>
          <option value="parent">Parent</option>
          <option value="student">Student</option>
          <option value="pta-member">PTA Member</option>
          <option value="coordinator">Event Coordinator</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>

    {/* School Event Details */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#fff700]">School Event Details</h3>
      <div>
        <label className="block text-sm font-medium mb-1">Event Type</label>
        <select
          name="eventType"
          value={bookingData.eventType}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        >
          <option value="">Select event type</option>
          <option value="graduation">Graduation Ceremony</option>
          <option value="academic-assembly">Academic Assembly</option>
          <option value="science-fair">Science Fair</option>
          <option value="art-exhibition">Art Exhibition</option>
          <option value="sports-event">Sports Event</option>
          <option value="cultural-program">Cultural Program</option>
          <option value="talent-show">Talent Show</option>
          <option value="educational-workshop">Educational Workshop</option>
          <option value="parent-teacher-conference">Parent-Teacher Conference</option>
          <option value="fundraiser">Fundraising Event</option>
          <option value="field-trip">Field Trip</option>
          <option value="orientation">Orientation Program</option>
          <option value="award-ceremony">Award Ceremony</option>
          <option value="book-fair">Book Fair</option>
          <option value="competition">Academic Competition</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Target Grade Level(s)</label>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {[
            'Pre-K', 'Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade',
            '5th Grade', '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade',
            '11th Grade', '12th Grade', 'All Grades'
          ].map((grade) => (
            <label key={grade} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="gradeLevel"
                value={grade.toLowerCase().replace(/[^a-z0-9]/g, '-')}
                checked={bookingData.gradeLevel?.includes(grade.toLowerCase().replace(/[^a-z0-9]/g, '-')) || false}
                onChange={handleInputChange}
                className="rounded border-gray-600 text-[#fff700] focus:ring-[#fff700]"
              />
              <span className="text-xs">{grade}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Expected Attendance</label>
        <input
          type="number"
          name="guestCount"
          value={bookingData.guestCount}
          onChange={handleInputChange}
          required
          min="1"
          max="2000"
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
          <option value="1-hour">1 Hour</option>
          <option value="2-hours">2 Hours</option>
          <option value="half-day">Half Day (4 hours)</option>
          <option value="full-day">Full Day (8 hours)</option>
          <option value="multi-day">Multi-Day Event</option>
          <option value="weekly">Weekly Program</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Venue Location</label>
        <select
          name="venueLocation"
          value={bookingData.venueLocation}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        >
          <option value="">Select venue</option>
          <option value="school-auditorium">School Auditorium</option>
          <option value="school-gymnasium">School Gymnasium</option>
          <option value="classroom">Classroom</option>
          <option value="library">Library</option>
          <option value="cafeteria">Cafeteria</option>
          <option value="outdoor-campus">Outdoor Campus</option>
          <option value="off-campus">Off-Campus Venue</option>
          <option value="virtual">Virtual Event</option>
          <option value="multiple-locations">Multiple Locations</option>
        </select>
      </div>
    </div>

    {/* Educational Objectives */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#fff700]">Educational Objectives</h3>
      <div>
        <label className="block text-sm font-medium mb-1">Primary Educational Goal</label>
        <select
          name="educationalGoal"
          value={bookingData.educationalGoal}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        >
          <option value="">Select primary goal</option>
          <option value="academic-achievement">Academic Achievement</option>
          <option value="character-building">Character Building</option>
          <option value="community-engagement">Community Engagement</option>
          <option value="cultural-awareness">Cultural Awareness</option>
          <option value="career-exploration">Career Exploration</option>
          <option value="health-wellness">Health & Wellness</option>
          <option value="social-skills">Social Skills Development</option>
          <option value="creativity-arts">Creativity & Arts</option>
          <option value="stem-education">STEM Education</option>
          <option value="leadership-development">Leadership Development</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Subject Areas (Check all that apply)</label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {[
            'Mathematics',
            'Science',
            'English/Language Arts',
            'Social Studies',
            'History',
            'Geography',
            'Art',
            'Music',
            'Physical Education',
            'Technology',
            'Foreign Language',
            'Life Skills'
          ].map((subject) => (
            <label key={subject} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="subjectAreas"
                value={subject.toLowerCase().replace(/[^a-z0-9]/g, '-')}
                checked={bookingData.subjectAreas?.includes(subject.toLowerCase().replace(/[^a-z0-9]/g, '-')) || false}
                onChange={handleInputChange}
                className="rounded border-gray-600 text-[#fff700] focus:ring-[#fff700]"
              />
              <span className="text-sm">{subject}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Learning Outcomes Expected</label>
        <textarea
          name="learningOutcomes"
          value={bookingData.learningOutcomes}
          onChange={handleInputChange}
          rows="3"
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
          placeholder="What should students learn or gain from this event?"
        />
      </div>
    </div>

    {/* Resources & Requirements */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#fff700]">Resources & Requirements</h3>
      <div>
        <label className="block text-sm font-medium mb-1">Budget Range</label>
        <select
          name="budgetRange"
          value={bookingData.budgetRange}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        >
          <option value="">Select budget range</option>
          <option value="under-500">Under $500</option>
          <option value="500-1k">$500 - $1,000</option>
          <option value="1k-2.5k">$1,000 - $2,500</option>
          <option value="2.5k-5k">$2,500 - $5,000</option>
          <option value="5k-10k">$5,000 - $10,000</option>
          <option value="over-10k">Over $10,000</option>
          <option value="discuss">Need to Discuss</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Equipment/Technology Needed (Check all that apply)</label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {[
            'Projector/Screen',
            'Sound System',
            'Microphones',
            'Computers/Tablets',
            'Interactive Whiteboard',
            'Photography',
            'Video Recording',
            'Live Streaming',
            'Stage/Platform',
            'Lighting',
            'Tables/Chairs',
            'Science Equipment'
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
        <label className="block text-sm font-medium mb-1">Refreshments/Catering</label>
        <select
          name="refreshments"
          value={bookingData.refreshments}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        >
          <option value="">Select option</option>
          <option value="none">No Refreshments</option>
          <option value="water-only">Water Only</option>
          <option value="snacks">Light Snacks</option>
          <option value="lunch">Lunch Provided</option>
          <option value="full-catering">Full Catering</option>
          <option value="student-lunch">Use School Lunch Program</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Special Accommodations</label>
        <textarea
          name="specialAccommodations"
          value={bookingData.specialAccommodations}
          onChange={handleInputChange}
          rows="2"
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
          placeholder="Accessibility needs, language interpreters, special dietary requirements, etc."
        />
      </div>
    </div>

    {/* Administrative Details */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#fff700]">Administrative Details</h3>
      <div>
        <label className="block text-sm font-medium mb-1">Approval Status</label>
        <select
          name="approvalStatus"
          value={bookingData.approvalStatus}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        >
          <option value="">Select status</option>
          <option value="pre-approval">Getting Pre-Approval</option>
          <option value="principal-approved">Principal Approved</option>
          <option value="district-approved">District Approved</option>
          <option value="pending-approval">Pending Approval</option>
          <option value="fully-approved">Fully Approved</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Parent Permission Required?</label>
        <select
          name="parentPermission"
          value={bookingData.parentPermission}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        >
          <option value="">Select option</option>
          <option value="yes">Yes, Required</option>
          <option value="no">No, Not Required</option>
          <option value="unsure">Unsure/Need Guidance</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">How did you hear about us?</label>
        <select
          name="referralSource"
          value={bookingData.referralSource}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
        >
          <option value="">Select source</option>
          <option value="school-administrator">School Administrator</option>
          <option value="teacher-colleague">Teacher/Colleague</option>
          <option value="educational-website">Educational Website</option>
          <option value="conference">Educational Conference</option>
          <option value="social-media">Social Media</option>
          <option value="referral">Referral from Another School</option>
          <option value="google-search">Google Search</option>
          <option value="vendor-fair">Educational Vendor Fair</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Additional Comments</label>
        <textarea
          name="comments"
          value={bookingData.comments}
          onChange={handleInputChange}
          rows="3"
          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-[#fff700]"
          placeholder="Any additional information, specific requirements, or questions about your school event"
        />
      </div>
    </div>

    <button
      type="submit"
      className="w-full bg-[#fff700] text-black font-bold py-3 px-4 rounded-md hover:bg-[#e6e000] transition-colors"
    >
      Submit School Event Request
    </button>
  </form>
);

export default SchoolEventsBookingForm;