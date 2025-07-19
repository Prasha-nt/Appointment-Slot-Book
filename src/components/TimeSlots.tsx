import React from 'react';
import { Clock, CheckCircle, XCircle, Calendar } from 'lucide-react';

export interface TimeSlot {
  time: string;
  isBooked: boolean;
  bookedBy?: string;
  purpose?: string;
}

interface TimeSlotsProps {
  slots: TimeSlot[];
  onSlotClick: (time: string) => void;
  selectedDate: string;
}

const TimeSlots: React.FC<TimeSlotsProps> = ({ slots, onSlotClick, selectedDate }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border border-white/20">
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl mr-4">
          <Clock className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Available Time Slots
          </h2>
          <div className="flex items-center mt-1">
            <Calendar className="w-4 h-4 text-blue-500 mr-2" />
            <p className="text-gray-600 font-medium">{formatDate(selectedDate)}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {slots.map((slot) => (
          <button
            key={slot.time}
            onClick={() => !slot.isBooked && onSlotClick(slot.time)}
            disabled={slot.isBooked}
            className={`
              relative p-5 rounded-2xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg
              ${slot.isBooked
                ? 'bg-gradient-to-br from-red-50 to-red-100 text-red-700 border-2 border-red-200 cursor-not-allowed shadow-inner'
                : 'bg-gradient-to-br from-green-50 to-emerald-100 text-green-700 border-2 border-green-200 hover:from-green-100 hover:to-emerald-200 hover:border-green-300 cursor-pointer shadow-md hover:shadow-xl'
              }
            `}
          >
            {/* Animated background effect for available slots */}
            {!slot.isBooked && (
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            )}
            
            <div className="flex flex-col items-center">
              <div className="flex items-center mb-2 relative z-10">
                {slot.isBooked ? (
                  <div className="bg-red-500 rounded-full p-1 mr-2">
                    <XCircle className="w-3 h-3 text-white" />
                  </div>
                ) : (
                  <div className="bg-green-500 rounded-full p-1 mr-2">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                )}
                <span className="font-bold text-base">{formatTime(slot.time)}</span>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full relative z-10 ${
                slot.isBooked 
                  ? 'bg-red-200 text-red-800' 
                  : 'bg-green-200 text-green-800'
              }`}>
                {slot.isBooked ? '🔒 Booked' : '✨ Available'}
              </span>
              {slot.isBooked && slot.bookedBy && (
                <span className="text-xs text-red-600 mt-2 truncate w-full text-center font-medium bg-red-100 px-2 py-1 rounded-lg relative z-10">
                  {slot.bookedBy}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-8 flex items-center justify-center gap-8 text-sm">
        <div className="flex items-center bg-green-50 px-4 py-2 rounded-full border border-green-200">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
          <span className="text-green-700 font-semibold">Available Slots</span>
        </div>
        <div className="flex items-center bg-red-50 px-4 py-2 rounded-full border border-red-200">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
          <XCircle className="w-4 h-4 text-red-600 mr-2" />
          <span className="text-red-700 font-semibold">Booked Slots</span>
        </div>
      </div>
    </div>
  );
};

export default TimeSlots;