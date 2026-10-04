import React, { useState } from 'react';

interface NavigationProps {
  user: { name: string; email: string } | null;
  onSignInClick: () => void;
  onSignOutClick: () => void;
  onNavigateSection: (id: string) => void;
  onOpenJobsPage?: () => void;
  onOpenEducationPage?: () => void;
  onOpenReelsPage?: () => void;
  onOpenEventsPage?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  user, 
  onSignInClick, 
  onSignOutClick, 
  onNavigateSection,
  onOpenJobsPage,
  onOpenEducationPage,
  onOpenReelsPage,
  onOpenEventsPage
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Jobs', id: 'jobs' },
    { label: 'Education', id: 'education' },
    { label: 'Reels', id: 'reels' },
    { label: 'Events', id: 'events' }
  ];

  const handleLinkClick = (id: string) => {
    if (id === 'jobs' && onOpenJobsPage) {
      onOpenJobsPage();
    } else if (id === 'education' && onOpenEducationPage) {
      onOpenEducationPage();
    } else if (id === 'reels' && onOpenReelsPage) {
      onOpenReelsPage();
    } else if (id === 'events' && onOpenEventsPage) {
      onOpenEventsPage();
    } else {
      onNavigateSection(id);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[76px] sm:h-[84px] bg-white/90 backdrop-blur-[16px] border-b border-[rgba(10,12,14,0.1)] transition-all">
      <div className="w-full max-w-[1680px] h-full mx-auto px-6 sm:px-14 lg:px-20 flex items-center justify-between">
        
        {/* Zone 1: Display wordmark with broader spacing */}
        <a 
          href="#hero" 
          onClick={(e) => { e.preventDefault(); handleLinkClick('hero'); }}
          className="font-display font-extrabold text-[17px] sm:text-[19px] tracking-[-0.025em] text-[#0A0C0E] flex items-center group focus:outline-none"
        >
          <span className="group-hover:text-[#4A525A] transition-colors">ONE COMMUNITY</span>
          <span className="text-[#E8913C] ml-1 text-xl leading-none">.</span>
        </a>

        {/* Zone 2: Broad Navigation Links (Jobs, Education, Reels, Events) */}
        <nav className="hidden md:flex items-center gap-10 lg:gap-14">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={`#${item.id}`}
              onClick={(e) => { e.preventDefault(); handleLinkClick(item.id); }}
              className="font-sans text-[11.5px] lg:text-[12px] uppercase tracking-[0.18em] font-medium text-[#4A525A] hover:text-[#E8913C] transition-colors relative py-2 group"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#E8913C] group-hover:w-full transition-all duration-200" />
            </a>
          ))}
        </nav>

        {/* Zone 3: Sign In / Sign Out Pill Button */}
        <div className="flex items-center gap-3 sm:gap-4">
          {user ? (
            <div className="flex items-center gap-2.5 sm:gap-3.5">
              <span className="hidden sm:inline-flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-[0.14em] text-[#4A525A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
                <span className="font-semibold text-[#0A0C0E]">{user.name}</span>
              </span>
              <button
                onClick={onSignOutClick}
                className="rounded-full border border-[rgba(10,12,14,0.3)] px-5 sm:px-7 py-2 sm:py-2.5 font-sans text-[11px] sm:text-[11.5px] uppercase tracking-[0.16em] font-medium text-[#0A0C0E] hover:border-[#E8913C] hover:text-[#E8913C] transition-all whitespace-nowrap"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={onSignInClick}
              className="rounded-full border border-[rgba(10,12,14,0.3)] px-5 sm:px-7 py-2 sm:py-2.5 font-sans text-[11px] sm:text-[11.5px] uppercase tracking-[0.16em] font-medium text-[#0A0C0E] hover:border-[#E8913C] hover:text-[#E8913C] transition-all whitespace-nowrap"
            >
              Sign In
            </button>
          )}

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#0A0C0E] hover:text-[#E8913C] focus:outline-none font-mono text-xs uppercase"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? '[CLOSE]' : '[MENU]'}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[rgba(10,12,14,0.1)] px-8 py-6 space-y-4 animate-in fade-in slide-in-from-top-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleLinkClick(item.id)}
              className="block w-full text-left font-sans text-xs uppercase tracking-[0.18em] font-medium text-[#4A525A] hover:text-[#E8913C] py-2 border-b border-[rgba(10,12,14,0.06)]"
            >
              {item.label}
            </button>
          ))}

          <div className="pt-2">
            {user ? (
              <div className="space-y-2">
                <p className="font-sans text-xs text-[#4A525A]">
                  Signed in as: <strong className="text-[#0A0C0E]">{user.name}</strong>
                </p>
                <button
                  onClick={() => { onSignOutClick(); setIsMobileMenuOpen(false); }}
                  className="w-full rounded-full border border-[rgba(10,12,14,0.3)] py-2 text-center font-sans text-xs uppercase tracking-[0.14em] text-[#0A0C0E]"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => { onSignInClick(); setIsMobileMenuOpen(false); }}
                className="w-full rounded-full border border-[#0A0C0E] bg-[#0A0C0E] text-white py-2 text-center font-sans text-xs uppercase tracking-[0.14em]"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
