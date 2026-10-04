import React, { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: { name: string; email: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [email, setEmail] = useState('mohdjawad622@gmail.com');
  const [name, setName] = useState('Jawad');
  const [password, setPassword] = useState('••••••••••••');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess({
      name: name.trim() || 'Community Member',
      email: email.trim() || 'member@onecommunity.org'
    });
    onClose();
  };

  const handleQuickDemoSignIn = () => {
    onSuccess({
      name: 'Mohd Jawad',
      email: 'mohdjawad622@gmail.com'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0C0E]/75 backdrop-blur-[10px] animate-in fade-in duration-150">
      <div 
        className="w-full max-w-md bg-white border border-[rgba(10,12,14,0.18)] p-6 sm:p-8 space-y-6 text-[#0A0C0E] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[rgba(10,12,14,0.1)]">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-sm tracking-tight text-[#0A0C0E]">
                ONE COMMUNITY
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
            </div>
            <p className="font-sans text-[10.5px] uppercase tracking-[0.14em] text-[#4A525A] mt-0.5">
              {mode === 'signin' ? 'MEMBER AUTHENTICATION' : 'CREATE MEMBER PASS'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="font-mono text-xs text-[#78828A] hover:text-[#0A0C0E] px-2 py-1 border border-[rgba(10,12,14,0.15)]"
          >
            [ESC]
          </button>
        </div>

        {/* Tab switch */}
        <div className="grid grid-cols-2 p-1 bg-[#F5F6F8] border border-[rgba(10,12,14,0.08)] text-[10.5px] font-sans uppercase tracking-[0.14em]">
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`py-2 text-center transition-all ${
              mode === 'signin'
                ? 'bg-white text-[#0A0C0E] font-semibold shadow-xs'
                : 'text-[#78828A] hover:text-[#0A0C0E]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`py-2 text-center transition-all ${
              mode === 'register'
                ? 'bg-white text-[#0A0C0E] font-semibold shadow-xs'
                : 'text-[#78828A] hover:text-[#0A0C0E]'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          {mode === 'register' && (
            <div>
              <label className="text-[10.5px] uppercase tracking-[0.14em] text-[#4A525A] block mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Mohd Jawad"
                className="w-full bg-white border border-[rgba(10,12,14,0.22)] px-3 py-2.5 text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
              />
            </div>
          )}

          <div>
            <label className="text-[10.5px] uppercase tracking-[0.14em] text-[#4A525A] block mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com"
              className="w-full bg-white border border-[rgba(10,12,14,0.22)] px-3 py-2.5 text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
            />
          </div>

          <div>
            <label className="text-[10.5px] uppercase tracking-[0.14em] text-[#4A525A] block mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-white border border-[rgba(10,12,14,0.22)] px-3 py-2.5 text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
            />
          </div>

          <div className="pt-2 space-y-2">
            <button
              type="submit"
              className="w-full rounded-full border border-[#0A0C0E] bg-[#0A0C0E] text-white py-2.5 font-sans text-[11px] uppercase tracking-[0.16em] font-medium hover:bg-[#E8913C] hover:border-[#E8913C] transition-all"
            >
              {mode === 'signin' ? 'Sign In to Account' : 'Create Member Pass'}
            </button>

            <button
              type="button"
              onClick={handleQuickDemoSignIn}
              className="w-full rounded-full border border-[rgba(10,12,14,0.22)] py-2.5 font-sans text-[10.5px] uppercase tracking-[0.14em] text-[#4A525A] hover:text-[#0A0C0E] hover:border-[rgba(10,12,14,0.4)] transition-all flex items-center justify-center gap-1.5"
            >
              <span>Instant Sign In as Jawad</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
            </button>
          </div>
        </form>

        <p className="text-[10px] text-center text-[#78828A] font-mono border-t border-[rgba(10,12,14,0.08)] pt-4">
          ONE COMMUNITY PASSPORT · ENCRYPTED LOCAL SESSION
        </p>
      </div>
    </div>
  );
};
