import React, { useState, useEffect } from 'react';
import { useToast } from './hooks/useToast';
import ToastContainer from './components/ToastContainer';
import Header from './components/Header';
import DatePicker from './components/DatePicker';
import TimeSlots, { TimeSlot } from './components/TimeSlots';
import BookingModal from './components/BookingModal';
import ConfirmationModal from './components/ConfirmationModal';
import AdminPanel from './components/AdminPanel';

function App() {
  const { toasts, removeToast, showSuccess, showError, showWarning } = useToast();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [lastBookedAppointment, setLastBookedAppointment] = useState<{
    date: string;
    time: string;
    name: string;
    purpose: string;
  } | null>(null);
  const [cancelledAppointments, setCancelledAppointments] = useState<{
    [key: string]: { time: string; name: string; purpose: string; reason: string; date: string }[]
  }>({});

  // Generate time slots for working hours (9 AM - 5 PM)
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    
    for (let hour = 9; hour < 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push({
          time: timeString,
          isBooked: false
        });
      }
    }
    
    return slots;
  };

  // Initialize slots when component mounts or date changes
  useEffect(() => {
    setSlots(generateTimeSlots());
  }, [selectedDate]);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    // Reset slots for new date
    setSlots(generateTimeSlots());
  };

  const handleSlotClick = (time: string) => {
    setSelectedTimeSlot(time);
    setIsBookingModalOpen(true);
  };

  const handleBookingConfirm = (name: string, purpose: string) => {
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
        month: 'long',
        day: 'numeric'
      });
    };

    // Update the slot as booked
    setSlots(prevSlots =>
      prevSlots.map(slot =>
        slot.time === selectedTimeSlot
          ? { ...slot, isBooked: true, bookedBy: name, purpose }
          : slot
      )
    );

    // Set the last booked appointment for confirmation
    setLastBookedAppointment({
      date: selectedDate,
      time: selectedTimeSlot,
      name,
      purpose
    });

    // Close booking modal and open confirmation modal
    setIsBookingModalOpen(false);
    setIsConfirmationModalOpen(true);

    // Show success toast
    showSuccess(
      '🎉 Appointment Booked Successfully!',
      `Your appointment with ${name} is confirmed for ${formatDate(selectedDate)} at ${formatTime(selectedTimeSlot)}.`
    );
  };

  const handlePreBookSlot = (time: string, name: string, purpose: string) => {
    // Check if slot is already booked
    const existingSlot = slots.find(slot => slot.time === time);
    if (existingSlot && existingSlot.isBooked) {
      showError(
        '❌ Slot Already Booked',
        'This time slot is already booked. Please select a different time.'
      );
      return;
    }

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

    // Update the slot as booked via admin
    setSlots(prevSlots =>
      prevSlots.map(slot =>
        slot.time === time
          ? { ...slot, isBooked: true, bookedBy: name, purpose }
          : slot
      )
    );

    showSuccess(
      '✅ Admin Pre-booking Successful',
      `Appointment pre-booked for ${name} at ${formatTime(time)}.`
    );
  };

  const handleCancelSlot = (time: string, reason: string) => {
    // Find the slot to cancel
    const slotToCancel = slots.find(slot => slot.time === time && slot.isBooked);
    
    if (!slotToCancel) {
      showError(
        '❌ Slot Not Found',
        'The selected slot was not found or is not currently booked.'
      );
      return;
    }

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

    // Store cancelled appointment info
    const cancelledInfo = {
      time,
      name: slotToCancel.bookedBy || 'Unknown',
      purpose: slotToCancel.purpose || 'Unknown',
      reason,
      date: selectedDate
    };

    setCancelledAppointments(prev => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), cancelledInfo]
    }));

    // Update the slot as available
    setSlots(prevSlots =>
      prevSlots.map(slot =>
        slot.time === time
          ? { ...slot, isBooked: false, bookedBy: undefined, purpose: undefined }
          : slot
      )
    );

    showWarning(
      '⚠️ Appointment Cancelled',
      `Appointment for ${slotToCancel.bookedBy} at ${formatTime(time)} has been cancelled. Reason: ${reason}`
    );
  };

  const closeModals = () => {
    setIsBookingModalOpen(false);
    setIsConfirmationModalOpen(false);
    setSelectedTimeSlot('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <Header />
      
      <main className="container mx-auto px-4 py-12 relative z-10">
        <DatePicker
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
        
        <TimeSlots
          slots={slots}
          onSlotClick={handleSlotClick}
          selectedDate={selectedDate}
        />
        
        <AdminPanel
          onPreBookSlot={handlePreBookSlot}
          onCancelSlot={handleCancelSlot}
          selectedDate={selectedDate}
          slots={slots}
        />
      </main>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={closeModals}
        onConfirm={handleBookingConfirm}
        selectedTime={selectedTimeSlot}
        selectedDate={selectedDate}
      />

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={closeModals}
        appointment={lastBookedAppointment}
      />

      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />

      <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-12 mt-20 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300 text-lg font-medium">
            © 2025 Appointment Slot Booker UI. Professional booking system for seamless appointment management.
          </p>
          <p className="text-gray-400 mt-3 font-light">
            ✨ Designed for efficiency, built for excellence ✨
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;