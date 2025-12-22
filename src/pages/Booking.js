import React, { useState } from 'react';
import { ChevronLeft, Calendar, Clock, UserCheck, CheckCircle, ArrowRight, UserX } from 'lucide-react';

const Bookings = () => {
    const [step, setStep] = useState(1);
    const [selectedCounselor, setSelectedCounselor] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
    const [selectedTime, setSelectedTime] = useState(null); 
    
    // NEW STATE: Tracks if a booking has been CONFIRMED (Step 3 completed). 
    // This allows us to show the confirmed counselor on the Step 1 landing page.
    const [confirmedBooking, setConfirmedBooking] = useState(null);

    const counselors = [
        { id: 1, name: "Dr. Sarah Smith", specialization: "Anxiety & Stress", img: "https://i.pravatar.cc/150?img=1" },
        { id: 2, name: "Dr. James Doe", specialization: "Academic Pressure", img: "https://i.pravatar.cc/150?img=11" },
        { id: 3, name: "Ms. Emily Blunt", specialization: "Peer Relationships", img: "https://i.pravatar.cc/150?img=5" },
    ];
    
    const availableTimes = ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM', '6:00 PM', '7:30 PM'];

    const handleConfirmBooking = () => {
        if (selectedCounselor && selectedDate && selectedTime) {
            // 1. Store the confirmed booking data
            setConfirmedBooking({
                counselor: selectedCounselor,
                date: selectedDate,
                time: selectedTime,
            });
            // 2. Move to confirmation screen
            setStep(3); 
        }
    };

    const handleCancelBooking = () => {
        // Clear all booking states
        setConfirmedBooking(null);
        setSelectedCounselor(null);
        setSelectedTime(null);
        setStep(1);
    };

    const handleNewBookingStart = () => {
        // Clear provisional selections and start at Step 1
        setSelectedCounselor(null);
        setSelectedTime(null);
        setStep(1);
    };

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-4xl font-extrabold mb-10 text-slate-800 tracking-tight">
                <Calendar className="inline-block w-8 h-8 mr-3 text-indigo-600" /> Book a Wellness Session
            </h1>
            
            {/* Step 1: Choose a Counselor / View Confirmed Booking */}
            {step === 1 && (
                <div className="animate-fade-in-scale-up">
                    
                    {/* --- NEW: Confirmed Booking Display --- */}
                    {confirmedBooking && (
                        <div className="bg-indigo-50 border border-indigo-300 p-6 rounded-xl shadow-lg mb-10 text-center">
                            <h2 className="text-2xl font-bold text-indigo-800 mb-4 flex items-center justify-center">
                                <UserCheck className="w-6 h-6 mr-2" /> Your Next Appointment
                            </h2>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                                <img src={confirmedBooking.counselor.img} alt={confirmedBooking.counselor.name} className="w-24 h-24 rounded-full object-cover ring-4 ring-indigo-400/50" />
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">{confirmedBooking.counselor.name}</h3>
                                    <p className="text-md text-indigo-600 mb-2">{confirmedBooking.counselor.specialization}</p>
                                    <div className="flex items-center space-x-4 text-sm text-slate-700 font-medium">
                                        <p className="flex items-center"><Calendar className="w-4 h-4 mr-1 text-slate-500" /> {confirmedBooking.date}</p>
                                        <p className="flex items-center"><Clock className="w-4 h-4 mr-1 text-slate-500" /> {confirmedBooking.time}</p>
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={handleCancelBooking} 
                                className="mt-6 text-red-600 bg-red-100 py-2 px-4 rounded-lg font-semibold hover:bg-red-200 transition flex items-center mx-auto"
                            >
                                <UserX className="w-4 h-4 mr-1" /> Cancel Session
                            </button>
                        </div>
                    )}
                    {/* --- END Confirmed Booking Display --- */}

                    <h2 className="text-2xl font-semibold mb-8 text-indigo-700 border-b border-indigo-100 pb-2">
                        {confirmedBooking ? 'Book a New Session or Change Counselor:' : '1. Select Your Counselor'}
                    </h2>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {counselors.map(c => (
                            <div 
                                key={c.id} 
                                onClick={() => { setSelectedCounselor(c); setStep(2); }} 
                                className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer border border-indigo-200/50 flex flex-col items-center
                                    ${confirmedBooking && confirmedBooking.counselor.id === c.id ? 'opacity-50 pointer-events-none ring-4 ring-green-300' : ''}
                                `}
                            >
                                <img src={c.img} alt={c.name} className="w-28 h-28 rounded-full mx-auto mb-4 object-cover ring-4 ring-indigo-300/50" />
                                <h3 className="font-bold text-xl text-slate-900">{c.name}</h3>
                                <p className="text-sm font-medium text-indigo-600 mt-1">{c.specialization}</p>
                                <button className="mt-4 text-indigo-500 font-semibold flex items-center group">
                                    {confirmedBooking && confirmedBooking.counselor.id === c.id ? 'Booked' : 'Select'} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Step 2: Date and Time Selection */}
            {step === 2 && selectedCounselor && (
                <div className="bg-white p-8 rounded-xl shadow-2xl max-w-xl mx-auto animate-fade-in-scale-up border border-indigo-200">
                    <button onClick={handleNewBookingStart} className="text-sm font-medium text-indigo-500 hover:text-indigo-700 mb-6 flex items-center">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Counselor Selection
                    </button>
                    
                    <h2 className="text-2xl font-bold mb-8 text-slate-800 flex items-center">
                        <UserCheck className="w-6 h-6 mr-3 text-green-500" /> Schedule with {selectedCounselor.name}
                    </h2>

                    <div className="space-y-6">
                        {/* Date Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <Calendar className="w-4 h-4 mr-2 text-indigo-500" /> Select Date
                            </label>
                            <input 
                                type="date" 
                                value={selectedDate}
                                onChange={(e) => { setSelectedDate(e.target.value); setSelectedTime(null); }} 
                                min={new Date().toISOString().slice(0, 10)} 
                                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition" 
                            />
                        </div>

                        {/* Time Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <Clock className="w-4 h-4 mr-2 text-indigo-500" /> Select Time Slot
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {availableTimes.map(t => (
                                    <button 
                                        key={t} 
                                        onClick={() => setSelectedTime(t)}
                                        className={`
                                            p-3 text-center rounded-lg font-medium transition-all duration-200
                                            ${selectedTime === t 
                                                ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-400' 
                                                : 'bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 hover:shadow-sm'
                                            }
                                        `}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Confirmation Button */}
                        <button 
                            onClick={handleConfirmBooking}
                            disabled={!selectedDate || !selectedTime} 
                            className={`w-full py-4 rounded-xl font-extrabold mt-6 transition-all duration-300 shadow-lg 
                                ${!selectedDate || !selectedTime
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-xl'
                                }
                            `}
                        >
                            {selectedDate && selectedTime ? 'Confirm Booking' : 'Select Date & Time to Continue'}
                        </button>
                    </div>
                </div>
            )}
            
            {/* Step 3: Confirmation Screen */}
            {step === 3 && confirmedBooking && (
                <div className="bg-white p-10 rounded-xl shadow-2xl max-w-lg mx-auto text-center animate-fade-in-scale-up border border-green-300">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold mb-4 text-slate-800">Booking Confirmed!</h2>
                    <p className="text-lg text-gray-600 mb-4">Your session with **{confirmedBooking.counselor.name}** has been successfully scheduled.</p>
                    <div className="bg-green-50 p-4 rounded-lg inline-block text-left text-sm font-medium text-green-800">
                        <p className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> Date: {confirmedBooking.date}</p>
                        <p className="flex items-center"><Clock className="w-4 h-4 mr-1" /> Time: {confirmedBooking.time}</p>
                    </div>
                    <button 
                        onClick={() => setStep(1)} // Go back to the dashboard view of the booking
                        className="mt-8 block w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition"
                    >
                        View My Appointment Dashboard
                    </button>
                </div>
            )}
        </div>
    );
};

export default Bookings;