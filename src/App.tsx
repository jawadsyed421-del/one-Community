/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { PortalHero } from './components/PortalHero';
import { StatementFold } from './components/StatementFold';
import { ThrowableDeck } from './components/ThrowableDeck';
import { RosterAndDates } from './components/RosterAndDates';
import { CloseSection } from './components/CloseSection';
import { OrderModal } from './components/OrderModal';
import { AuthModal } from './components/AuthModal';
import { FloatingSlideStrip } from './components/FloatingSlideStrip';
import { JobPortalPage } from './pages/JobPortalPage';
import { EducationPage } from './pages/EducationPage';
import { ReelsPage } from './pages/ReelsPage';
import { EventsPage } from './pages/EventsPage';
import { RELEASES, VinylRelease } from './data/releases';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<'home' | 'jobs' | 'education' | 'reels' | 'events'>(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    const path = typeof window !== 'undefined' ? window.location.pathname : '';
    if (hash === '#jobs' || hash === '#jobs-portal' || path.startsWith('/jobs')) return 'jobs';
    if (hash === '#education' || hash === '#education-portal' || path.startsWith('/education')) return 'education';
    if (hash === '#reels' || hash === '#reels-portal' || path.startsWith('/reels')) return 'reels';
    if (hash === '#events' || hash === '#events-portal' || path.startsWith('/events')) return 'events';
    return 'home';
  });

  const [selectedOrderRelease, setSelectedOrderRelease] = useState<VinylRelease | null>(null);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authToast, setAuthToast] = useState<string | null>(null);

  const heroImage = '/src/assets/images/record_label_hero_portal_1791098211379.jpg';
  const reelImage = '/src/assets/images/record_label_sleeve_two_1791098241889.jpg';

  // Listen to browser navigation (back/forward button, hashes)
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (hash === '#jobs' || hash === '#jobs-portal' || path.startsWith('/jobs')) {
        setCurrentRoute('jobs');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#education' || hash === '#education-portal' || path.startsWith('/education')) {
        setCurrentRoute('education');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#reels' || hash === '#reels-portal' || path.startsWith('/reels')) {
        setCurrentRoute('reels');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#events' || hash === '#events-portal' || path.startsWith('/events')) {
        setCurrentRoute('events');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentRoute('home');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const openJobsPage = () => {
    setCurrentRoute('jobs');
    window.location.hash = '#jobs-portal';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEducationPage = () => {
    setCurrentRoute('education');
    window.location.hash = '#education-portal';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openReelsPage = () => {
    setCurrentRoute('reels');
    window.location.hash = '#reels-portal';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEventsPage = () => {
    setCurrentRoute('events');
    window.location.hash = '#events-portal';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToHome = () => {
    setCurrentRoute('home');
    if (window.location.hash) {
      window.history.pushState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSection = (id: string) => {
    if (id === 'jobs') {
      openJobsPage();
      return;
    }
    if (id === 'education') {
      openEducationPage();
      return;
    }
    if (id === 'reels') {
      openReelsPage();
      return;
    }
    if (id === 'events' || id === 'dates') {
      openEventsPage();
      return;
    }

    if (currentRoute !== 'home') {
      backToHome();
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSignInSuccess = (user: { name: string; email: string }) => {
    setCurrentUser(user);
    setAuthToast(`Signed in as ${user.name}`);
    setTimeout(() => setAuthToast(null), 3000);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setAuthToast('Signed out successfully');
    setTimeout(() => setAuthToast(null), 3000);
  };

  // 1. If on the Job Portal Page
  if (currentRoute === 'jobs') {
    return (
      <div className="min-h-screen bg-[#FBFBFC]">
        <JobPortalPage
          onBackToHome={backToHome}
          user={currentUser}
          onSignInClick={() => setIsAuthModalOpen(true)}
          onSignOutClick={handleSignOut}
        />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={handleSignInSuccess}
        />

        {authToast && (
          <div className="fixed top-24 right-6 z-50 px-4 py-2 bg-[#0A0C0E] text-white text-xs font-sans rounded-full shadow-xl flex items-center gap-2 border border-[rgba(237,231,220,0.2)] animate-in fade-in slide-in-from-top-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
            <span>{authToast}</span>
          </div>
        )}
      </div>
    );
  }

  // 2. If on the Dedicated Education Page
  if (currentRoute === 'education') {
    return (
      <div className="min-h-screen bg-[#FBFBFC]">
        <EducationPage
          onBackToHome={backToHome}
          onOpenReelsPage={openReelsPage}
          user={currentUser}
          onSignInClick={() => setIsAuthModalOpen(true)}
          onSignOutClick={handleSignOut}
        />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={handleSignInSuccess}
        />

        {authToast && (
          <div className="fixed top-24 right-6 z-50 px-4 py-2 bg-[#0A0C0E] text-white text-xs font-sans rounded-full shadow-xl flex items-center gap-2 border border-[rgba(237,231,220,0.2)] animate-in fade-in slide-in-from-top-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
            <span>{authToast}</span>
          </div>
        )}
      </div>
    );
  }

  // 3. If on the Dedicated 1-Minute Short-Form Reels Page
  if (currentRoute === 'reels') {
    return (
      <div className="min-h-screen bg-[#0A0C0E]">
        <ReelsPage
          onBackToHome={backToHome}
          onOpenEducationPage={openEducationPage}
          user={currentUser}
          onSignInClick={() => setIsAuthModalOpen(true)}
          onSignOutClick={handleSignOut}
        />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={handleSignInSuccess}
        />

        {authToast && (
          <div className="fixed top-24 right-6 z-50 px-4 py-2 bg-[#0A0C0E] text-white text-xs font-sans rounded-full shadow-xl flex items-center gap-2 border border-[rgba(237,231,220,0.2)] animate-in fade-in slide-in-from-top-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
            <span>{authToast}</span>
          </div>
        )}
      </div>
    );
  }

  // 4. If on the Dedicated Shia Events & Venues Booking Page
  if (currentRoute === 'events') {
    return (
      <div className="min-h-screen bg-[#FBFBFC]">
        <EventsPage
          onBackToHome={backToHome}
          user={currentUser}
          onSignInClick={() => setIsAuthModalOpen(true)}
          onSignOutClick={handleSignOut}
        />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={handleSignInSuccess}
        />

        {authToast && (
          <div className="fixed top-24 right-6 z-50 px-4 py-2 bg-[#0A0C0E] text-white text-xs font-sans rounded-full shadow-xl flex items-center gap-2 border border-[rgba(237,231,220,0.2)] animate-in fade-in slide-in-from-top-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
            <span>{authToast}</span>
          </div>
        )}
      </div>
    );
  }

  // 5. Main Home Page
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0A0C0E] selection:bg-[#E8913C]/30 selection:text-[#0A0C0E] font-sans antialiased overflow-x-hidden">
      
      {/* 1. Broad Navigation with Sign In / Sign Out Pill Button */}
      <Navigation
        user={currentUser}
        onSignInClick={() => setIsAuthModalOpen(true)}
        onSignOutClick={handleSignOut}
        onNavigateSection={handleNavigateSection}
        onOpenJobsPage={openJobsPage}
        onOpenEducationPage={openEducationPage}
        onOpenReelsPage={openReelsPage}
        onOpenEventsPage={openEventsPage}
      />

      {/* Floating Auth Notification Toast */}
      {authToast && (
        <div className="fixed top-24 right-6 z-50 px-4 py-2 bg-[#0A0C0E] text-white text-xs font-sans rounded-full shadow-xl flex items-center gap-2 border border-[rgba(237,231,220,0.2)] animate-in fade-in slide-in-from-top-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
          <span>{authToast}</span>
        </div>
      )}

      {/* 2. Portal Hero */}
      <PortalHero heroImage={heroImage} />

      {/* Floating Community Images (Full-bleed edge-to-edge right-to-left stream with zero white space) */}
      <section className="relative w-full bg-[#0A0C0E] py-0 overflow-hidden">
        {/* Sleek Header Bar */}
        <div className="w-full bg-[#0A0C0E] px-6 sm:px-14 lg:px-20 py-3.5 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E8913C] animate-pulse" />
            <h3 className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-white font-semibold">
              ONE COMMUNITY // LIVE IMAGE STREAM
            </h3>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">
            ← CONTINUOUS RIGHT-TO-LEFT STREAM · HOVER TO PAUSE
          </span>
        </div>
        {/* Full-bleed edge-to-edge image marquee */}
        <FloatingSlideStrip onSlideClick={handleNavigateSection} />
      </section>

      {/* 3. Statement Fold (Full-height statement, outlined numeral, drifting circular element) */}
      <StatementFold imageSrc={reelImage} />

      {/* 4. Releases (Two columns: headline/lede & physical throwable card deck) */}
      <ThrowableDeck
        releases={RELEASES}
        onOrderRelease={(release) => setSelectedOrderRelease(release)}
      />

      {/* 5. Roster & Tour Dates (Hairline-ruled artist rows and dates table) */}
      <RosterAndDates />

      {/* 6. Close Section (Headline, buttons, fine-print, footer, and cropped full-width wordmark) */}
      <CloseSection />

      {/* Order Vinyl Modal */}
      {selectedOrderRelease && (
        <OrderModal
          isOpen={!!selectedOrderRelease}
          onClose={() => setSelectedOrderRelease(null)}
          release={selectedOrderRelease}
        />
      )}

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleSignInSuccess}
      />

    </div>
  );
}
