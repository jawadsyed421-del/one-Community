import React, { useState } from 'react';
import { 
  SHIA_VENUES, 
  ShiaVenue, 
  SHIA_EVENT_TYPES, 
  ShiaEventType 
} from '../data/shiaEventsData';
import { ShiaEventBookingModal } from '../components/ShiaEventBookingModal';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  HeartHandshake, 
  Flame, 
  BookOpen, 
  Utensils, 
  Search, 
  Filter, 
  ChevronRight,
  ShieldCheck,
  Phone
} from 'lucide-react';

interface EventsPageProps {
  onBackToHome: () => void;
  user: { name: string; email: string } | null;
  onSignInClick: () => void;
  onSignOutClick: () => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({
  onBackToHome,
  user,
  onSignInClick,
  onSignOutClick
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeBookingVenue, setActiveBookingVenue] = useState<ShiaVenue | null>(null);
  const [activeBookingEventTypeId, setActiveBookingEventTypeId] = useState<string>('nikah_shadi');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);

  const categories = ['All', 'Mosque & Centre', 'Imambargah & Azakhana', 'Banquet & Community Hall'];
  const cities = ['All Cities', 'Lucknow', 'Mumbai', 'Bangalore', 'Hyderabad'];

  const filteredVenues = SHIA_VENUES.filter(venue => {
    const matchesCategory = selectedCategory === 'All' || venue.category === selectedCategory;
    const matchesCity = selectedCity === 'All Cities' || venue.city === selectedCity;
    const matchesSearch = 
      venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.recommendedFor.some(r => r.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesCity && matchesSearch;
  });

  const handleOpenBooking = (venue?: ShiaVenue, eventTypeId?: string) => {
    setActiveBookingVenue(venue || SHIA_VENUES[0]);
    if (eventTypeId) setActiveBookingEventTypeId(eventTypeId);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFC] text-[#0A0C0E] font-sans antialiased">
      
      {/* 1. Header Bar */}
      <header className="sticky top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-[rgba(10,12,14,0.1)]">
        <div className="max-w-[1680px] mx-auto px-6 sm:px-14 lg:px-20 h-[76px] flex items-center justify-between">
          
          <div className="flex items-center gap-6 sm:gap-8">
            <button
              onClick={onBackToHome}
              className="font-display font-extrabold text-[17px] sm:text-[19px] tracking-[-0.025em] text-[#0A0C0E] flex items-center group cursor-pointer focus:outline-none"
            >
              <span>ONE COMMUNITY</span>
              <span className="text-[#E8913C] ml-1">.</span>
            </button>

            <span className="hidden sm:inline-block text-[#D1D5DB]">/</span>

            <button
              onClick={onBackToHome}
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#4A525A] hover:text-[#E8913C] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => handleOpenBooking()}
              className="px-4 py-2 bg-[#E8913C] hover:bg-[#d67e2a] text-white rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book an Event Now</span>
            </button>

            {user ? (
              <span className="text-xs font-medium text-[#0A0C0E] hidden sm:inline">
                {user.name}
              </span>
            ) : (
              <button
                onClick={onSignInClick}
                className="px-4 py-1.5 rounded-full text-xs font-sans font-medium text-white bg-[#0A0C0E] hover:bg-[#E8913C] transition-colors"
              >
                Sign In
              </button>
            )}
          </div>

        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="bg-white border-b border-[rgba(10,12,14,0.08)] py-14 sm:py-20">
        <div className="max-w-[1680px] mx-auto px-6 sm:px-14 lg:px-20 space-y-8">
          
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E8913C] animate-pulse" />
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#E8913C] font-bold">
                ONE COMMUNITY // SHIA VENUES & EVENT BOOKING
              </p>
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#0A0C0E] tracking-tight leading-[1.08]">
              Reserve Shia Mosques, Imambargahs & Banquet Halls in India.
            </h1>
            <p className="font-sans text-sm sm:text-base text-[#4A525A] leading-relaxed">
              Book verified community venues across India — including the historic Imambaras of <strong>Lucknow</strong>, iconic mosques of <strong>Mumbai</strong>, <strong>Bangalore</strong>, and <strong>Hyderabad</strong>. Whether hosting a <strong>Nikah & Shadi</strong> wedding, celebratory <strong>Mehfil-e-Jashan</strong>, <strong>Majlis-e-Aza</strong>, <strong>Khatam-e-Quran / Soyem</strong>, or a <strong>Halal Family Banquet</strong>, our partner venues provide traditional carved minbars, separate partition halls, and Niaz commercial kitchens for large cauldrons (Degs).
            </p>
          </div>

          {/* Shia Program Types Horizontal Selector */}
          <div className="pt-2 space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#78828A]">
              QUICK-BOOK BY PROGRAM TYPE:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {SHIA_EVENT_TYPES.map(type => (
                <div
                  key={type.id}
                  onClick={() => handleOpenBooking(undefined, type.id)}
                  className="p-4 bg-[#F9FAFB] rounded-lg border border-[rgba(10,12,14,0.08)] hover:border-[#E8913C] hover:shadow-md cursor-pointer transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-xs text-[#0A0C0E] group-hover:text-[#E8913C] transition-colors">
                      {type.title}
                    </span>
                  </div>
                  <p className="font-serif text-xs text-[#78828A]">
                    {type.urduTitle}
                  </p>
                  <p className="text-[11px] text-[#4A525A] line-clamp-2 leading-relaxed">
                    {type.description}
                  </p>
                  <div className="pt-1 flex items-center gap-1 text-[11px] font-mono text-[#E8913C] font-semibold">
                    <span>Reserve Date</span>
                    <span>→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 3. Shia Venues Directory Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1680px] mx-auto px-6 sm:px-14 lg:px-20 space-y-8">
          
          {/* Search Bar & Category Filter */}
          <div className="bg-white p-5 sm:p-6 rounded-lg border border-[rgba(10,12,14,0.08)] space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-base text-[#0A0C0E]">
                  Verified Shia Community Venues
                </span>
                <span className="px-2 py-0.5 bg-[#F5F6F8] rounded text-xs font-mono font-bold text-[#E8913C]">
                  {filteredVenues.length} locations
                </span>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-[#78828A] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search mosque, city, or event..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#F9FAFB] border border-[rgba(10,12,14,0.12)] rounded-md text-xs text-[#0A0C0E] placeholder:text-[#78828A] focus:outline-none focus:border-[#E8913C]"
                />
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-[rgba(10,12,14,0.06)]">
              <span className="text-[11px] font-mono text-[#78828A] uppercase tracking-wider mr-1">
                Type:
              </span>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#0A0C0E] text-white'
                      : 'bg-[#F5F6F8] text-[#4A525A] hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* City Pills (Lucknow, Mumbai, Bangalore, Hyderabad) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
              <span className="text-[11px] font-mono text-[#78828A] uppercase tracking-wider mr-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#E8913C]" />
                <span>City:</span>
              </span>
              {cities.map(city => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedCity === city
                      ? 'bg-[#E8913C] text-white'
                      : 'bg-white border border-[rgba(10,12,14,0.1)] text-[#4A525A] hover:bg-gray-100'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Venues Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredVenues.map(venue => (
              <div
                key={venue.id}
                className="bg-white rounded-xl overflow-hidden border border-[rgba(10,12,14,0.1)] hover:border-[#E8913C] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image & Overlay Badges */}
                <div className="relative h-64 w-full overflow-hidden bg-black">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10.5px] uppercase font-bold px-3 py-1 rounded-full bg-black/70 text-white border border-white/20">
                      {venue.category}
                    </span>
                    {venue.hasNikahLicense && (
                      <span className="font-sans text-[10.5px] font-semibold px-2.5 py-1 rounded-full bg-emerald-600 text-white">
                        ✓ Registered Nikah Venue
                      </span>
                    )}
                  </div>

                  {/* Capacity Badge */}
                  <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-white font-mono text-xs flex items-center gap-1.5 border border-white/20">
                    <Users className="w-3.5 h-3.5 text-[#E8913C]" />
                    <span>Up to {venue.capacity} Capacity</span>
                  </div>

                  {/* Title on Image Base */}
                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-0.5">
                    <p className="font-serif text-xs text-white/70">
                      {venue.arabicName}
                    </p>
                    <h3 className="font-display font-extrabold text-2xl text-white">
                      {venue.name}
                    </h3>
                    <p className="font-sans text-xs text-white/80 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#E8913C]" />
                      <span>{venue.address}</span>
                    </p>
                  </div>
                </div>

                {/* Venue Details */}
                <div className="p-6 sm:p-7 space-y-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <p className="font-sans text-xs text-[#4A525A] leading-relaxed">
                      {venue.description}
                    </p>

                    {/* Facilities Checklist */}
                    <div className="space-y-2">
                      <span className="font-mono text-[10.5px] uppercase tracking-wider text-[#78828A]">
                        KEY FACILITIES & AMENITIES:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#0A0C0E]">
                        {venue.facilities.map((f, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommended for */}
                    <div className="pt-2 flex flex-wrap items-center gap-1.5">
                      <span className="font-mono text-[10px] uppercase text-[#78828A] mr-1">
                        Best suited for:
                      </span>
                      {venue.recommendedFor.map(r => (
                        <span
                          key={r}
                          className="px-2 py-0.5 bg-[#F5F6F8] rounded text-[11px] font-mono text-[#0A0C0E] border border-[rgba(10,12,14,0.06)]"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Donation Guide & Book Button */}
                  <div className="pt-4 border-t border-[rgba(10,12,14,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="font-mono text-[10px] uppercase text-[#78828A]">
                        SUGGESTED VENUE DONATION:
                      </span>
                      <p className="font-mono font-bold text-sm text-[#0A0C0E]">
                        {venue.suggestedDonation}
                      </p>
                    </div>

                    <button
                      onClick={() => handleOpenBooking(venue)}
                      className="px-5 py-2.5 bg-[#0A0C0E] hover:bg-[#E8913C] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                      <Calendar className="w-4 h-4 text-[#E8913C]" />
                      <span>Book This Venue</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Footer */}
      <footer className="bg-white border-t border-[rgba(10,12,14,0.1)] py-12">
        <div className="max-w-[1680px] mx-auto px-6 sm:px-14 lg:px-20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToHome}
              className="font-display font-extrabold text-sm text-[#0A0C0E] hover:text-[#E8913C]"
            >
              ONE COMMUNITY
            </button>
            <span className="text-xs text-[#78828A]">© 2026 Shia Mosques & Event Reservation Registry</span>
          </div>

          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#4A525A] hover:text-[#E8913C]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Main Site</span>
          </button>
        </div>
      </footer>

      {/* Shia Event Booking Modal */}
      <ShiaEventBookingModal
        venue={activeBookingVenue}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialEventTypeId={activeBookingEventTypeId}
      />

    </div>
  );
};
