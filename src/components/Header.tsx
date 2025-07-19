import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-12 px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-pink-600/90"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-white/5 rounded-full animate-bounce"></div>
        <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-1/3 w-8 h-8 bg-white/5 rounded-full animate-bounce delay-500"></div>
      </div>
      
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center mb-6 relative z-10">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl mr-4 shadow-lg">
            <Calendar className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Appointment Slot Booker
          </h1>
        </div>
        <p className="text-2xl text-white/90 mb-4 font-light relative z-10">
          ✨ Professional Appointment Booking System ✨
        </p>
        <div className="flex items-center justify-center text-white/80 relative z-10">
          <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            <Clock className="w-5 h-5 mr-2 inline" />
            <span className="font-semibold">Working Hours: 9:00 AM - 5:00 PM</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;