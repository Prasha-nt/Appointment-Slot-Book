import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

export interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ id, type, title, message, duration = 5000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'error':
        return <XCircle className="w-6 h-6 text-red-600" />;
      case 'warning':
        return <AlertCircle className="w-6 h-6 text-amber-600" />;
      case 'info':
        return <AlertCircle className="w-6 h-6 text-blue-600" />;
      default:
        return <CheckCircle className="w-6 h-6 text-green-600" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-green-100';
      case 'error':
        return 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200 shadow-red-100';
      case 'warning':
        return 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 shadow-amber-100';
      case 'info':
        return 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-blue-100';
      default:
        return 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-green-100';
    }
  };

  const getProgressBarColor = () => {
    switch (type) {
      case 'success':
        return 'bg-gradient-to-r from-green-500 to-emerald-500';
      case 'error':
        return 'bg-gradient-to-r from-red-500 to-pink-500';
      case 'warning':
        return 'bg-gradient-to-r from-amber-500 to-orange-500';
      case 'info':
        return 'bg-gradient-to-r from-blue-500 to-indigo-500';
      default:
        return 'bg-gradient-to-r from-green-500 to-emerald-500';
    }
  };

  return (
    <div className={`
      relative max-w-sm w-full ${getStyles()} border-2 rounded-2xl shadow-2xl backdrop-blur-sm
      transform transition-all duration-500 ease-out animate-slideInRight hover:scale-105
    `}>
      {/* Progress bar */}
      <div className="absolute top-0 left-0 h-1 bg-gray-200 rounded-t-2xl w-full overflow-hidden">
        <div 
          className={`h-full ${getProgressBarColor()} animate-shrink`}
          style={{ animationDuration: `${duration}ms` }}
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-4">
            <div className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg">
              {getIcon()}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="text-lg font-bold text-gray-800 mb-1">
              {title}
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {message}
            </p>
          </div>
          
          <button
            onClick={() => onClose(id)}
            className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 hover:bg-white/50 p-1 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;