import React from 'react';
import { CheckCircle, X, Calendar, Clock, User, MessageSquare } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: {
    date: string;
    time: string;
    name: string;
    purpose: string;
  } | null;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  appointment
}) => {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!isOpen || !appointment) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
            <h3 className="text-2xl font-semibold text-gray-800">Booking Confirmed!</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="bg-green-50 rounded-lg p-6 mb-6">
            <h4 className="text-lg font-semibold text-green-800 mb-4">Appointment Details</h4>
            
            <div className="space-y-3">
              <div className="flex items-center text-green-700">
                <Calendar className="w-5 h-5 mr-3" />
                <span>{formatDate(appointment.date)}</span>
              </div>
              
              <div className="flex items-center text-green-700">
                <Clock className="w-5 h-5 mr-3" />
                <span>{formatTime(appointment.time)} (30 minutes)</span>
              </div>
              
              <div className="flex items-center text-green-700">
                <User className="w-5 h-5 mr-3" />
                <span>{appointment.name}</span>
              </div>
              
              <div className="flex items-start text-green-700">
                <MessageSquare className="w-5 h-5 mr-3 mt-0.5" />
                <span className="flex-1">{appointment.purpose}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-blue-800 text-sm">
              <strong>Important:</strong> Please arrive 5 minutes before your scheduled appointment time. 
              If you need to reschedule or cancel, please contact us at least 24 hours in advance.
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;