import React, { useState } from 'react';
import { ShiaVenue, SHIA_VENUES, SHIA_EVENT_TYPES, ShiaEventType } from '../data/shiaEventsData';
import { 
  X, 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  CheckCircle2, 
  Building2, 
  Sparkles, 
  HeartHandshake, 
  Flame, 
  BookOpen, 
  Utensils, 
  Volume2, 
  Send,
  Phone,
  ShieldCheck
} from 'lucide-react';

interface ShiaEventBookingModalProps {
  venue: ShiaVenue | null;
  isOpen: boolean;
  onClose: () => void;
  initialEventTypeId?: string;
}

export const ShiaEventBookingModal: React.FC<ShiaEventBookingModalProps> = ({
  venue,
  isOpen,
  onClose,
  initialEventTypeId = 'nikah_shadi'
}) => {
  if (!isOpen) return null;

  // Selected Venue
  const [selectedVenueId, setSelectedVenueId] = useState<string>(venue?.id || SHIA_VENUES[0].id);
  const activeVenue = SHIA_VENUES.find(v => v.id === selectedVenueId) || SHIA_VENUES[0];

  // Event Details
  const [selectedEventTypeId, setSelectedEventTypeId] = useState<string>(initialEventTypeId);
  const activeEventType = SHIA_EVENT_TYPES.find(t => t.id === selectedEventTypeId) || SHIA_EVENT_TYPES[0];

  const [eventDate, setEventDate] = useState<string>('2026-10-24');
  const [timeSlot, setTimeSlot] = useState<string>('Evening (17:30 — 22:00)');
  const [guestCount, setGuestCount] = useState<string>('200 — 300 Guests');

  // Selected Facility Add-ons
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Separate Gents & Ladies Partition Halls',
    'Audio System with Minbar Microphone',
    'Commercial Niaz / Tabarruk Kitchen Access'
  ]);

  // Host Details
  const [hostName, setHostName] = useState<string>('');
  const [hostEmail, setHostEmail] = useState<string>('');
  const [hostPhone, setHostPhone] = useState<string>('');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  // Confirmation State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [bookingConfirmation, setBookingConfirmation] = useState<{
    bookingRef: string;
    submittedAt: string;
  } | null>(null);

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hostName || !hostEmail || !hostPhone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setBookingConfirmation({
        bookingRef: `SHIA-RES-${Math.floor(100000 + Math.random() * 900000)}`,
        submittedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-white text-[#0A0C0E] border border-[rgba(10,12,14,0.14)] rounded-xl shadow-2xl my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-6 sm:p-8 bg-[#F5F6F8] border-b border-[rgba(10,12,14,0.1)] flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase px-2.5 py-0.5 rounded bg-[#0A0C0E] text-white font-bold">
                COMMUNITY EVENT RESERVATION
              </span>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#E8913C]/15 text-[#E8913C] font-semibold">
                SHIA VENUES & MOSQUES
              </span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0A0C0E]">
              Book Shia Mosque, Imambargah or Banquet Hall
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#4A525A]">
              Reserve authorized Shia community venues for Nikah/Shadi, Mehfil-e-Jashan, Majlis-e-Aza, Soyem/Fatiha, or family gatherings.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 text-[#78828A] hover:text-[#0A0C0E]"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Confirmation Screen */}
        {bookingConfirmation ? (
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <span className="font-mono text-xs uppercase tracking-widest text-[#E8913C] font-bold">
                RESERVATION REQUEST RECORDED
              </span>
              <h3 className="font-display font-bold text-2xl text-[#0A0C0E]">
                Booking Request Successfully Submitted!
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#4A525A]">
                Your reservation request for <strong>{activeEventType.title}</strong> has been transmitted to the venue management at <strong>{activeVenue.name}</strong>.
              </p>
            </div>

            <div className="bg-[#F9FAFB] border border-[rgba(10,12,14,0.1)] rounded-lg p-5 max-w-lg mx-auto text-left space-y-3 font-sans text-xs">
              <div className="flex items-center justify-between border-b border-[rgba(10,12,14,0.08)] pb-2">
                <span className="font-mono text-[#78828A]">Reference ID:</span>
                <span className="font-mono font-bold text-sm text-[#0A0C0E]">{bookingConfirmation.bookingRef}</span>
              </div>
              <div className="flex items-center justify-between border-b border-[rgba(10,12,14,0.08)] pb-2">
                <span className="text-[#78828A]">Selected Venue:</span>
                <span className="font-semibold text-[#0A0C0E]">{activeVenue.name}</span>
              </div>
              <div className="flex items-center justify-between border-b border-[rgba(10,12,14,0.08)] pb-2">
                <span className="text-[#78828A]">Event Program:</span>
                <span className="font-semibold text-[#0A0C0E]">{activeEventType.title} ({activeEventType.urduTitle})</span>
              </div>
              <div className="flex items-center justify-between border-b border-[rgba(10,12,14,0.08)] pb-2">
                <span className="text-[#78828A]">Date & Timing:</span>
                <span className="font-semibold text-[#0A0C0E]">{eventDate} · {timeSlot}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#78828A]">Venue Contact Trustee:</span>
                <span className="font-semibold text-[#0A0C0E]">{activeVenue.imamOrTrustee} ({activeVenue.contactPhone})</span>
              </div>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg max-w-lg mx-auto text-left flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-900 space-y-1">
                <p className="font-semibold">Next Step: Trustee Verification</p>
                <p className="text-emerald-800 leading-relaxed">
                  The venue management will review your date availability and contact you within 24 hours at <strong>{hostPhone}</strong> to confirm security deposit, kitchen guidelines, and partition setup.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#0A0C0E] hover:bg-[#E8913C] text-white text-xs font-mono uppercase tracking-wider rounded-lg transition-colors"
            >
              Back to Venues Directory
            </button>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmitBooking} className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto">
            
            {/* Step 1: Select Event Program Type */}
            <div className="space-y-3">
              <label className="font-sans text-xs font-bold uppercase tracking-wider text-[#0A0C0E] flex items-center justify-between">
                <span>1. Select Event Program Type *</span>
                <span className="text-[11px] font-mono text-[#E8913C]">Shia Ceremonies & Observances</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {SHIA_EVENT_TYPES.map(type => {
                  const isSelected = selectedEventTypeId === type.id;
                  return (
                    <div
                      key={type.id}
                      onClick={() => setSelectedEventTypeId(type.id)}
                      className={`p-3.5 rounded-lg border cursor-pointer transition-all space-y-1.5 ${
                        isSelected
                          ? 'border-[#E8913C] bg-amber-500/10 shadow-xs'
                          : 'border-[rgba(10,12,14,0.12)] hover:border-gray-400 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-xs text-[#0A0C0E]">
                          {type.title}
                        </span>
                        <span className="font-serif text-xs text-[#78828A]">
                          {type.urduTitle}
                        </span>
                      </div>
                      <p className="font-sans text-[11px] text-[#4A525A] line-clamp-2">
                        {type.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Venue */}
            <div className="space-y-3">
              <label className="font-sans text-xs font-bold uppercase tracking-wider text-[#0A0C0E]">
                2. Select Shia Venue / Mosque / Imambargah *
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SHIA_VENUES.map(v => {
                  const isSelected = selectedVenueId === v.id;
                  return (
                    <div
                      key={v.id}
                      onClick={() => setSelectedVenueId(v.id)}
                      className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'border-[#0A0C0E] bg-[#F5F6F8] ring-1 ring-[#0A0C0E]'
                          : 'border-[rgba(10,12,14,0.12)] hover:border-gray-400 bg-white'
                      }`}
                    >
                      <img
                        src={v.image}
                        alt={v.name}
                        className="w-14 h-14 rounded-md object-cover shrink-0"
                      />
                      <div className="space-y-1">
                        <h4 className="font-display font-bold text-xs text-[#0A0C0E]">
                          {v.name}
                        </h4>
                        <p className="text-[11px] text-[#78828A] flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#E8913C]" />
                          <span>{v.city}, {v.state} · Capacity: {v.capacity}</span>
                        </p>
                        <p className="font-mono text-[10px] text-[#2E6B72]">
                          Suggested: {v.suggestedDonation}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Schedule, Time & Guest Count */}
            <div className="space-y-3 pt-2">
              <label className="font-sans text-xs font-bold uppercase tracking-wider text-[#0A0C0E]">
                3. Date, Time Slot & Attendance *
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <span className="font-sans text-[11px] text-[#78828A]">Date of Program</span>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[rgba(10,12,14,0.15)] rounded text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
                  />
                </div>

                <div className="space-y-1">
                  <span className="font-sans text-[11px] text-[#78828A]">Time Slot</span>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[rgba(10,12,14,0.15)] rounded text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
                  >
                    <option value="Afternoon (12:00 — 16:00)">Afternoon (12:00 — 16:00)</option>
                    <option value="Evening (17:30 — 22:00)">Evening (17:30 — 22:00)</option>
                    <option value="Morning (09:00 — 13:00)">Morning (09:00 — 13:00)</option>
                    <option value="Full Day (10:00 — 22:00)">Full Day (10:00 — 22:00)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <span className="font-sans text-[11px] text-[#78828A]">Expected Attendance</span>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[rgba(10,12,14,0.15)] rounded text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
                  >
                    <option value="50 — 100 Guests">50 — 100 Guests</option>
                    <option value="100 — 200 Guests">100 — 200 Guests</option>
                    <option value="200 — 300 Guests">200 — 300 Guests</option>
                    <option value="300 — 500 Guests">300 — 500 Guests</option>
                    <option value="500+ Large Assembly">500+ Large Assembly</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 4: Facility Requirements Checklist */}
            <div className="space-y-3 pt-2">
              <label className="font-sans text-xs font-bold uppercase tracking-wider text-[#0A0C0E]">
                4. Shia Facilities & Ritual Accommodations
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  'Separate Gents & Ladies Partition Halls',
                  'Audio System with Minbar Microphone',
                  'Commercial Niaz / Tabarruk Kitchen Access',
                  'Authorized Alim for Nikah Recitation',
                  'Black Calligraphic Banners & Drapery (For Majlis)',
                  'Live Streaming & Video Relay to Screen',
                  'Banquet Round Tables & Chairs Setup',
                  'Car Parking Stewards'
                ].map(service => {
                  const isChecked = selectedServices.includes(service);
                  return (
                    <label
                      key={service}
                      onClick={() => toggleService(service)}
                      className={`p-2.5 rounded border cursor-pointer flex items-center gap-2.5 transition-colors ${
                        isChecked ? 'bg-amber-500/10 border-amber-500/40 text-[#0A0C0E]' : 'bg-white border-gray-200 text-[#4A525A]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="rounded text-[#E8913C] focus:ring-[#E8913C]"
                      />
                      <span>{service}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Host Contact Details */}
            <div className="space-y-3 pt-2">
              <label className="font-sans text-xs font-bold uppercase tracking-wider text-[#0A0C0E]">
                5. Host & Primary Contact Information *
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <span className="font-sans text-[11px] text-[#78828A]">Host Full Name *</span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Syed Murtaza Naqvi"
                    value={hostName}
                    onChange={(e) => setHostName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[rgba(10,12,14,0.15)] rounded text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
                  />
                </div>

                <div className="space-y-1">
                  <span className="font-sans text-[11px] text-[#78828A]">Email Address *</span>
                  <input
                    type="email"
                    required
                    placeholder="host@example.com"
                    value={hostEmail}
                    onChange={(e) => setHostEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[rgba(10,12,14,0.15)] rounded text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
                  />
                </div>

                <div className="space-y-1">
                  <span className="font-sans text-[11px] text-[#78828A]">Phone / WhatsApp *</span>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98200 12345"
                    value={hostPhone}
                    onChange={(e) => setHostPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[rgba(10,12,14,0.15)] rounded text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
                  />
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <span className="font-sans text-[11px] text-[#78828A]">Special Instructions / Catering Notes (Optional)</span>
                <textarea
                  rows={2}
                  placeholder="e.g. Need access to Tabarruk kitchen 2 hours prior to start; request resident Alim for 20-minute Khutbah."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[rgba(10,12,14,0.15)] rounded text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
                />
              </div>
            </div>

            {/* Submission CTA */}
            <div className="pt-4 border-t border-[rgba(10,12,14,0.1)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#78828A]">
                Venue: <strong>{activeVenue.name}</strong> · Program: <strong>{activeEventType.title}</strong>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !hostName || !hostEmail || !hostPhone}
                className="w-full sm:w-auto px-8 py-3 bg-[#0A0C0E] hover:bg-[#E8913C] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-40"
              >
                {isSubmitting ? (
                  <span>Transmitting Request to Venue Trustees...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Venue Booking Request</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
