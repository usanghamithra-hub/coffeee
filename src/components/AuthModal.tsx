import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    setAuthModalMode,
    login,
    signUp,
    currentUser,
    logout
  } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      if (authModalMode === 'login') {
        const res = await login(email, password);
        if (res.success) {
          closeAuthModal();
          setEmail('');
          setPassword('');
        } else {
          setErrorMessage(res.error || 'Authentication failed');
        }
      } else {
        const res = await signUp(name, email, password);
        if (res.success) {
          closeAuthModal();
          setName('');
          setEmail('');
          setPassword('');
        } else {
          setErrorMessage(res.error || 'Registration failed');
        }
      }
    } catch {
      setErrorMessage('An unexpected security verification error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUseDemoAccount = () => {
    setEmail('sterling@mayfairclub.co.uk');
    setPassword('Sterling1854!');
    setErrorMessage('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/60 backdrop-blur-sm"
      onClick={closeAuthModal}
    >
      <div
        className="relative w-full max-w-md p-8 bg-surface rounded-2xl shadow-2xl border border-outline-variant/40"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 text-on-surface-variant hover:text-on-surface transition-colors p-1"
          aria-label="Close authentication modal"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {currentUser ? (
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary mb-3">
              <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-[10px] tracking-widest uppercase text-primary font-bold">Authenticated Patron</span>
            <h3 id="auth-modal-title" className="font-headline text-2xl font-bold text-on-surface mt-0.5">{currentUser.name}</h3>
            <p className="text-xs text-on-surface-variant mt-1">{currentUser.email}</p>
            <div className="mt-4 p-3 bg-surface-container-low rounded-xl w-full text-left space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Guild Membership:</span>
                <span className="font-semibold text-primary">{currentUser.memberTier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Sovereign Token:</span>
                <span className="font-mono text-on-surface">#{currentUser.memberNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Society Credits:</span>
                <span className="font-bold text-on-surface">${currentUser.societyCredits.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => {
                logout();
                closeAuthModal();
              }}
              className="mt-6 w-full py-3 bg-surface-container-high hover:bg-surface-container-highest text-on-surface rounded-lg text-xs uppercase font-semibold tracking-wider transition-colors"
            >
              Sign Out from Atelier
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-px bg-primary"></span>
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-primary">Gent &amp; Bean Society</span>
            </div>
            <h3 id="auth-modal-title" className="font-headline text-2xl font-bold text-on-surface">
              {authModalMode === 'login' ? 'Patron Authorization' : 'Society Guild Enrollment'}
            </h3>
            <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
              {authModalMode === 'login'
                ? 'Sign in to access your private cellar lockers, bespoke roast allocations, and house credit.'
                : 'Join our distinguished roastery circle for confidential micro-lot allocations and cupping salons.'}
            </p>

            {/* Mode Tabs */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-surface-container rounded-lg my-5 text-xs font-medium">
              <button
                type="button"
                onClick={() => {
                  setAuthModalMode('login');
                  setErrorMessage('');
                }}
                className={`py-2 rounded transition-all font-semibold ${
                  authModalMode === 'login'
                    ? 'bg-surface-container-lowest text-on-surface shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthModalMode('signup');
                  setErrorMessage('');
                }}
                className={`py-2 rounded transition-all font-semibold ${
                  authModalMode === 'signup'
                    ? 'bg-surface-container-lowest text-on-surface shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Register
              </button>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 bg-error-container text-on-error-container text-xs rounded-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-base">error</span>
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {authModalMode === 'signup' && (
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                    Full Patron Title &amp; Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Lord Arthur Sterling"
                    className="w-full bg-surface-container-lowest text-xs rounded-lg px-3.5 py-2.5 text-on-surface placeholder:text-on-surface-variant/50 border border-outline-variant/60 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                  Private Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="patron@mayfairclub.co.uk"
                  className="w-full bg-surface-container-lowest text-xs rounded-lg px-3.5 py-2.5 text-on-surface placeholder:text-on-surface-variant/50 border border-outline-variant/60 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-on-surface-variant">
                    Master Password
                  </label>
                  <span className="text-[10px] text-on-surface-variant/70">Min 8 characters</span>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-surface-container-lowest text-xs rounded-lg px-3.5 py-2.5 pr-10 text-on-surface placeholder:text-on-surface-variant/50 border border-outline-variant/60 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-2.5 text-on-surface-variant hover:text-on-surface"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <span className="material-symbols-outlined text-lg">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-primary hover:bg-primary-container text-on-primary font-semibold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md active:scale-[0.99] disabled:opacity-50"
              >
                {isSubmitting
                  ? 'Verifying Credentials...'
                  : authModalMode === 'login'
                  ? 'Enter Member Lounge'
                  : 'Enroll & Claim $50 Welcome Credit'}
              </button>
            </form>

            {authModalMode === 'login' && (
              <div className="mt-4 pt-3 border-t border-outline-variant/30 text-center">
                <button
                  type="button"
                  onClick={handleUseDemoAccount}
                  className="text-[11px] text-primary hover:underline font-medium inline-flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">key</span>
                  <span>Fill Lord Sterling Demo Account</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
