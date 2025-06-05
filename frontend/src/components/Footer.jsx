import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#fff700]  border-t border-black/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-black mb-4">MC MERRYS</h3>
            <p className="text-gray-700">Your trusted partner for excellence</p>
          </div>
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-4 text-black">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-700 hover:text-black">Home</a></li>
              <li><a href="#" className="text-gray-700 hover:text-black">Services</a></li>
              {/* <li><a href="#" className="text-gray-700 hover:text-black">About</a></li>
              <li><a href="#" className="text-gray-700 hover:text-black">Contact</a></li> */}
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-4 text-black">Contact</h4>
            <ul className="space-y-2 text-gray-700">
              <li>Email: info@mcmerrys.com</li>
              {/* <li>Phone: +1 234 567 890</li> */}
              <li>Address: No.91 Temple road, Malleswaram Vayalikaval Police Station, Bangalore North, Bangalore 560003 Karnataka, India</li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-4 text-black">Follow Us</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-gray-700 hover:text-black">Facebook</a>
              <a href="#" className="text-gray-700 hover:text-black">Twitter</a>
              <a href="#" className="text-gray-700 hover:text-black">Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-black/10 text-center text-gray-700">
          <p>&copy; 2025 MUFASA MANAGEMENT SERVICES. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 