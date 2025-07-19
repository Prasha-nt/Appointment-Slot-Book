import React from 'react';
import { Calendar } from 'lucide-react';

interface DatePickerProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange }) => {
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border border-white/20">
      <div className="flex items-center mb-4">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl mr-4">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Select Date
        </h2>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <label htmlFor="date" className="text-gray-700 font-semibold text-lg">
          Choose appointment date:
        </label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          min={today}
          max={maxDate}
          className="px-6 py-4 border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg font-medium shadow-lg hover:shadow-xl bg-gradient-to-r from-white to-blue-50"
        />
      </div>
      <div className="bg-blue-50 rounded-2xl p-4 mt-6 border border-blue-200">
        <p className="text-sm text-blue-700 font-medium">
        * You can book appointments up to 30 days in advance
        </p>
      </div>
    </div>
  );
};

export default DatePicker;