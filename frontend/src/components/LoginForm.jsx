// frontend/src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import useAuthStore from '../store/authStore';

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { login, register, isLoading, error } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      const success = await login(formData.email, formData.password);
      if (success) alert('Login successful! Welcome to Ore Dake Studio');
    } else {
      const success = await register(formData.username, formData.email, formData.password);
      if (success) {
        alert('Account created successfully! You can now log in.');
        setIsLogin(true);
      }
    }
  };

  const switchMode = (toLogin) => {
    if (toLogin === isLogin) return;
    setIsLogin(toLogin);
    setFormData({ username: '', email: '', password: '' });
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-[#0a0910] overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@400;500&display=swap');
        .odf-display { font-family: 'Space Grotesk', system-ui, sans-serif; }
        .odf-mono { font-family: 'JetBrains Mono', monospace; }
        @keyframes odf-stamp-in {
          0% { transform: rotate(-18deg) scale(0.6); opacity: 0; }
          60% { transform: rotate(-8deg) scale(1.08); opacity: 1; }
          100% { transform: rotate(-12deg) scale(1); opacity: 1; }
        }
        .odf-stamp { animation: odf-stamp-in 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.15s both; }
        @media (prefers-reduced-motion: reduce) {
          .odf-stamp { animation: none; }
        }
      `}</style>

      {/* faint structural grid, subject-appropriate: a studio blueprint/canvas */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '42px 42px',
        }}
      />
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[560px] h-[560px] rounded-full bg-violet-700/20 blur-[110px]" />

      <div className="relative w-full max-w-md">
        {/* hanko seal — signature element tied to "Ore Dake" (俺だけ, "only me") */}
        <div
          className="odf-stamp absolute -top-6 -right-4 z-10 w-16 h-16 rounded-md flex items-center justify-center shadow-lg select-none"
          style={{
            background: 'radial-gradient(circle at 35% 30%, #e8563f, #b8321c)',
            boxShadow: '0 8px 24px -8px rgba(184,50,28,0.65)',
          }}
          aria-hidden="true"
        >
          <span className="odf-display text-white text-2xl leading-none" style={{ letterSpacing: '-0.02em' }}>
            俺
          </span>
        </div>

        <div className="relative bg-[#121019]/80 backdrop-blur-xl border border-white/[0.07] rounded-2xl p-8 shadow-2xl">
          <div className="mb-7">
            <p className="odf-mono text-[11px] tracking-[0.25em] uppercase text-violet-400/80 mb-2">
              Ore Dake Studio
            </p>
            <h2 className="odf-display text-3xl font-bold text-white">
              {isLogin ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="text-gray-500 text-sm mt-1.5">
              {isLogin ? 'Sign in to keep building, solo.' : 'One account. Everything you make.'}
            </p>
          </div>

          {/* segmented mode switcher */}
          <div className="relative grid grid-cols-2 mb-6 p-1 bg-black/30 border border-white/[0.06] rounded-lg">
            <span
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-md bg-violet-600 transition-transform duration-300 ease-out"
              style={{ transform: isLogin ? 'translateX(0)' : 'translateX(calc(100% + 8px))' }}
            />
            <button
              type="button"
              onClick={() => switchMode(true)}
              className={`relative z-10 py-2 text-sm font-medium rounded-md transition-colors ${
                isLogin ? 'text-white' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => switchMode(false)}
              className={`relative z-10 py-2 text-sm font-medium rounded-md transition-colors ${
                !isLogin ? 'text-white' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Register
            </button>
          </div>

          {error && (
            <div
              role="alert"
              className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg mb-5 text-sm text-center"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {!isLogin && (
              <div>
                <label htmlFor="username" className="block text-gray-400 text-xs odf-mono tracking-wide mb-1.5">
                  USERNAME
                </label>
                <input
                  id="username"
                  type="text"
                  required
                  autoFocus={!isLogin}
                  value={formData.username}
                  placeholder="your-handle"
                  className="w-full bg-[#0a0910] border border-white/10 text-white placeholder-gray-600 rounded-lg px-3.5 py-3 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/40 transition-colors"
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-gray-400 text-xs odf-mono tracking-wide mb-1.5">
                EMAIL
              </label>
              <input
                id="email"
                type="email"
                required
                autoFocus={isLogin}
                value={formData.email}
                placeholder="you@example.com"
                className="w-full bg-[#0a0910] border border-white/10 text-white placeholder-gray-600 rounded-lg px-3.5 py-3 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/40 transition-colors"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-400 text-xs odf-mono tracking-wide mb-1.5">
                PASSWORD
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={isLogin ? undefined : 8}
                  value={formData.password}
                  placeholder="••••••••"
                  className="w-full bg-[#0a0910] border border-white/10 text-white placeholder-gray-600 rounded-lg px-3.5 py-3 pr-11 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/40 transition-colors"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 p-2 rounded-md transition-colors"
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.1A9.4 9.4 0 0112 5c5 0 9 4 10.5 7-.5 1-1.2 2.1-2.2 3.1M6.1 6.6C3.9 8.1 2.4 10.1 1.5 12c1.5 3 5.5 7 10.5 7 1.5 0 2.9-.3 4.2-.9" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {!isLogin && (
                <p className="text-gray-600 text-xs mt-1.5">At least 8 characters.</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-5"
            >
              {isLoading && (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                </svg>
              )}
              {isLoading ? 'Please wait…' : isLogin ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <p className="text-gray-500 text-sm text-center mt-6">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => switchMode(!isLogin)}
              className="text-violet-400 hover:text-violet-300 font-medium"
            >
              {isLogin ? 'Register' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}