import React, { useState } from 'react';
import { Settings, Plus, AlertCircle, Trash2, X } from 'lucide-react';
import { TimeSlot } from './TimeSlots';

interface AdminPanelProps {
  onPreBookSlot: (time: string, name: string, purpose: string) => void;
  onCancelSlot: (time: string, reason: string) => void;
  selectedDate: string;
  slots: TimeSlot[];
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onPreBookSlot, onCancelSlot, selectedDate, slots }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'book' | 'cancel'>('book');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [cancelTime, setCancelTime] = useState('');
  const [cancelReason, setCancelReason] = useState('');
  const [errors, setErrors] = useState<{ time?: string; name?: string; purpose?: string }>({});
  const [cancelErrors, setCancelErrors] = useState<{ time?: string; reason?: string }>({});

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 9; hour < 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(timeString);
      }
    }
    return options;
  };

  const getBookedSlots = () => {
    return slots.filter(slot => slot.isBooked);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { time?: string; name?: string; purpose?: string } = {};
    
    if (!time) {
      newErrors.time = 'Time is required';
    }
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!purpose.trim()) {
      newErrors.purpose = 'Purpose is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onPreBookSlot(time, name.trim(), purpose.trim());
    setTime('');
    setName('');
    setPurpose('');
    setErrors({});
  };

  const handleCancelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { time?: string; reason?: string } = {};
    
    if (!cancelTime) {
      newErrors.time = 'Time slot is required';
    }
    
    if (!cancelReason.trim()) {
      newErrors.reason = 'Cancellation reason is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setCancelErrors(newErrors);
      return;
    }
    
    onCancelSlot(cancelTime, cancelReason.trim());
    setCancelTime('');
    setCancelReason('');
    setCancelErrors({});
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
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-8 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white hover:from-purple-700 hover:via-pink-700 hover:to-red-700 transition-all duration-300 relative overflow-hidden"
      >
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="flex items-center">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl mr-4">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold">🔧 Admin Panel</h3>
        </div>
        <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-45' : ''}`}>
          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
            <Plus className="w-6 h-6" />
          </div>
        </div>
      </button>
      
      {isExpanded && (
        <div className="p-8 border-t border-gray-200 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 mb-8 border border-amber-200">
            <div className="flex items-center text-amber-800 mb-3">
              <div className="bg-amber-500 p-2 rounded-full mr-3">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">Admin Access</span>
            </div>
            <p className="text-amber-700 font-medium">
              Use this panel to manage appointments - pre-book new slots or cancel existing ones.
            </p>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex mb-8 bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
            <button
              type="button"
              onClick={() => setActiveTab('book')}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center ${
                activeTab === 'book'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Plus className="w-5 h-5 mr-2" />
              Book Appointment
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('cancel')}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center ${
                activeTab === 'cancel'
                  ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Trash2 className="w-5 h-5 mr-2" />
              Cancel Appointment
            </button>
          </div>

          {/* Book Appointment Tab */}
          {activeTab === 'book' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="admin-time" className="block text-gray-700 font-semibold mb-3 text-lg">
                  Select Time Slot
                </label>
                <select
                  id="admin-time"
                  value={time}
                  onChange={(e) => {
                    setTime(e.target.value);
                    if (errors.time) setErrors({ ...errors, time: undefined });
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                    errors.time ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <option value="">Choose a time slot</option>
                  {generateTimeOptions().map((timeOption) => (
                    <option key={timeOption} value={timeOption}>
                      {formatTime(timeOption)}
                    </option>
                  ))}
                </select>
                {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
              </div>
              
              <div>
                <label htmlFor="admin-name" className="block text-gray-700 font-semibold mb-3 text-lg">
                  Client Name
                </label>
                <input
                  type="text"
                  id="admin-name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                    errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="Enter client name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label htmlFor="admin-purpose" className="block text-gray-700 font-semibold mb-3 text-lg">
                  Purpose
                </label>
                <textarea
                  id="admin-purpose"
                  value={purpose}
                  onChange={(e) => {
                    setPurpose(e.target.value);
                    if (errors.purpose) setErrors({ ...errors, purpose: undefined });
                  }}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none ${
                    errors.purpose ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="Enter appointment purpose"
                />
                {errors.purpose && <p className="text-red-500 text-sm mt-1">{errors.purpose}</p>}
              </div>
              
              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-semibold flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Plus className="w-5 h-5 mr-2" />
                Pre-book Appointment
              </button>
            </form>
          )}

          {/* Cancel Appointment Tab */}
          {activeTab === 'cancel' && (
            <div>
              {getBookedSlots().length === 0 ? (
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 text-center border border-gray-200">
                  <div className="bg-gray-300 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <X className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No Booked Appointments</h3>
                  <p className="text-gray-600">There are no appointments to cancel for the selected date.</p>
                </div>
              ) : (
                <form onSubmit={handleCancelSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="cancel-time" className="block text-gray-700 font-semibold mb-3 text-lg">
                      Select Appointment to Cancel
                    </label>
                    <select
                      id="cancel-time"
                      value={cancelTime}
                      onChange={(e) => {
                        setCancelTime(e.target.value);
                        if (cancelErrors.time) setCancelErrors({ ...cancelErrors, time: undefined });
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 ${
                        cancelErrors.time ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <option value="">Choose an appointment to cancel</option>
                      {getBookedSlots().map((slot) => (
                        <option key={slot.time} value={slot.time}>
                          {formatTime(slot.time)} - {slot.bookedBy} ({slot.purpose})
                        </option>
                      ))}
                    </select>
                    {cancelErrors.time && <p className="text-red-500 text-sm mt-1">{cancelErrors.time}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="cancel-reason" className="block text-gray-700 font-semibold mb-3 text-lg">
                      Cancellation Reason
                    </label>
                    <textarea
                      id="cancel-reason"
                      value={cancelReason}
                      onChange={(e) => {
                        setCancelReason(e.target.value);
                        if (cancelErrors.reason) setCancelErrors({ ...cancelErrors, reason: undefined });
                      }}
                      rows={3}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 resize-none ${
                        cancelErrors.reason ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      placeholder="Enter reason for cancellation (e.g., client request, emergency, etc.)"
                    />
                    {cancelErrors.reason && <p className="text-red-500 text-sm mt-1">{cancelErrors.reason}</p>}
                  </div>
                  
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 border border-red-200">
                    <div className="flex items-center text-red-800 mb-3">
                      <div className="bg-red-500 p-2 rounded-full mr-3">
                        <AlertCircle className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-bold text-lg">Warning</span>
                    </div>
                    <p className="text-red-700 font-medium">
                      This action will permanently cancel the selected appointment. Make sure to notify the client about the cancellation.
                    </p>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-2xl hover:from-red-700 hover:to-pink-700 transition-all duration-300 font-semibold flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Trash2 className="w-5 h-5 mr-2" />
                    Cancel Appointment
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;