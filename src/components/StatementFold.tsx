import React, { useEffect, useState, useRef } from 'react';

interface StatementFoldProps {
  imageSrc: string;
}

export const StatementFold: React.FC<StatementFoldProps> = ({ imageSrc }) => {
  const foldRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [driftY, setDriftY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!foldRef.current) return;
      const rect = foldRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far through this section the user has scrolled
      const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));

      // Drifts and rotates on scroll
      setRotation(clamped * 75); // 0 to 75 deg rotation
      setDriftY((clamped - 0.5) * 80); // vertical drift
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="statement"
      ref={foldRef}
      className="relative min-h-screen w-full bg-[#FFFFFF] border-b border-[rgba(10,12,14,0.1)] flex items-center justify-between px-6 sm:px-16 lg:px-24 py-24 overflow-hidden"
    >
      {/* Outlined index numeral using -webkit-text-stroke with transparent fill */}
      <div 
        className="absolute top-12 left-6 sm:left-16 lg:left-24 select-none pointer-events-none text-stroke-hairline font-display text-[clamp(72px,12vw,180px)] font-extrabold leading-none opacity-20"
        aria-hidden="true"
      >
        01
      </div>

      <div className="relative z-10 max-w-2xl space-y-6 pt-16 sm:pt-20">
        
        {/* Small uppercase label */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
          <p className="font-sans text-[10.5px] uppercase tracking-[0.14em] text-[#4A525A] font-medium">
            ACOUSTIC INTENT & PRESSING PHILOSOPHY
          </p>
        </div>

        {/* Statement at clamp(24px,3.6vw,52px) over about 22ch with one phrase in amber */}
        <h2 className="font-display font-bold text-[clamp(24px,3.6vw,52px)] text-[#0A0C0E] leading-[1.18] max-w-[22ch]">
          We press physical sound for rooms that listen closely, where analog voltage and silence{' '}
          <span className="text-[#E8913C]">
            converge into physical weight
          </span>
          .
        </h2>

        {/* Fine-print description */}
        <p className="font-sans text-[13px] text-[#4A525A] leading-relaxed max-w-lg pt-2">
          Every master is cut directly on a Neumann VMS 80 lathe with custom discrete electronics. No digital lookahead, no artificial limiting. What exists on the tape is what strikes the vinyl lacquer.
        </p>

        {/* Hairline rule indicator */}
        <div className="pt-4 flex items-center gap-4 text-[10.5px] font-sans uppercase tracking-[0.14em] text-[#78828A]">
          <span>FREQUENCY RANGE: 16HZ — 28KHZ</span>
          <span className="w-8 h-[1px] bg-[rgba(10,12,14,0.12)]" />
          <span>STUDER A80 2-TRACK MASTER</span>
        </div>
      </div>

      {/* Circular image floating off the right edge at reduced opacity that drifts and rotates on scroll */}
      <div 
        className="absolute -right-20 sm:-right-12 md:right-8 lg:right-16 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 rounded-full overflow-hidden border border-[rgba(10,12,14,0.12)] opacity-35 select-none pointer-events-none will-change-transform"
        style={{
          transform: `translateY(${driftY}px) rotate(${rotation}deg)`
        }}
      >
        <img
          src={imageSrc}
          alt="Acoustic master reel"
          className="w-full h-full object-cover scale-110 grayscale contrast-125"
          referrerPolicy="no-referrer"
        />
        {/* Subtle center concentric vinyl spindle hole */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border border-[rgba(10,12,14,0.25)] bg-[#FFFFFF]/70 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFFFFF] border border-[rgba(10,12,14,0.4)]" />
          </div>
        </div>
      </div>

    </section>
  );
};
