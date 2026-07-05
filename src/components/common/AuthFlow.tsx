import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, Eye, EyeOff, ShieldCheck, ArrowLeft, ArrowRight, Github, Sparkles, Check, AlertCircle, RefreshCw } from 'lucide-react';

type AuthScreen = 'login' | 'register' | 'forgot' | 'otp' | 'reset' | 'verified';

interface AuthFlowProps {
  onSuccess: (userEmail: string) => void;
}

export function AuthFlow({ onSuccess }: AuthFlowProps) {
  const [screen, setScreen] = useState<AuthScreen>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [pwdStrength, setPwdStrength] = useState(0);

  // Live Password Strength Meter
  useEffect(() => {
    if (!password) {
      setPwdStrength(0);
      return;
    }
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    setPwdStrength(score);
  }, [password]);

  const validateEmail = (val: string) => {
    return /\S+@\S+\.\S+/.test(val);
  };

  const handleSocialClick = (provider: string) => {
    setLoading(true);
    setErrorMessage(null);
    setTimeout(() => {
      setLoading(false);
      onSuccess(`social.${provider.toLowerCase()}@me.com`);
    }, 1200);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please fill in all standard credentials.");
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid structured email address.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setTimeout(() => {
      setLoading(false);
      onSuccess(email);
    }, 1200);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setErrorMessage("All profile registration fields are mandatory.");
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage("Please supply a valid structured email address.");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Passwords must contain at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Password verification confirmation mismatch.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage("Account created! We have dispatched an OTP verification code.");
      setScreen('otp');
    }, 1400);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) {
      setErrorMessage("Please enter a valid structured email address.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage(`Recovery code dispatched to ${email}`);
      setScreen('otp');
    }, 1200);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const joinedCode = otpCode.join('');
    if (joinedCode.length < 4) {
      setErrorMessage("Please enter the complete 4-digit security token.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setTimeout(() => {
      setLoading(false);
      if (screen === 'otp' && email) {
        setScreen('verified');
      } else {
        setScreen('reset');
      }
    }, 1200);
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setErrorMessage("Passwords must match standard 8-character token metrics.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords mismatch error.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage("Security token synchronized. Please log in.");
      setScreen('login');
    }, 1200);
  };

  // Autocomplete code digits inputs
  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otpCode];
    newOtp[index] = value.substring(value.length - 1);
    setOtpCode(newOtp);

    // Focus next element if filled
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div id="auth-workflow-canvas" className="min-h-screen w-full bg-[#FAFAFB] flex flex-col md:flex-row items-center justify-center font-sans relative overflow-hidden p-4">
      {/* Background visual geometric lights */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-[#6C63FF]/5 to-[#7C5CFF]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-[#A855F7]/5 to-[#6C63FF]/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main card box container */}
      <div className="bg-white border border-subtle max-w-5xl w-full rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[600px] relative z-10">
        
        {/* Left Side: Editorial Presentation */}
        <div className="md:col-span-5 bg-black p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#6C63FF]/15 to-[#A855F7]/10 pointer-events-none"></div>
          
          {/* Logo link */}
          <div className="flex items-center gap-2 z-10">
            <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center font-bold text-sm">
              R
            </div>
            <span className="text-sm font-bold tracking-tight">Review.AI</span>
          </div>

          {/* Core pitch carousel statement */}
          <div className="space-y-4 z-10 my-8">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-white border border-white/10 text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-yellow-400" />
              <span>Design Intelligence</span>
            </div>
            <h2 className="text-2xl font-bold leading-tight tracking-tight">
              Design like Stripe. Code like Vercel.
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed font-medium">
              We analyze full layout spacing grids, color blind contrast filters, and cognitive heuristic laws directly using advanced multimodal scanning.
            </p>
          </div>

          {/* Social credentials/proof */}
          <div className="z-10 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-500 font-medium">
            <span>WCAG 2.1 Compliant</span>
            <span>Version 2.4.0</span>
          </div>
        </div>

        {/* Right Side: Interactive credential forms */}
        <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-center bg-white relative">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Back CTA block if appropriate */}
              {screen !== 'login' && screen !== 'verified' && (
                <button
                  onClick={() => {
                    setErrorMessage(null);
                    setSuccessMessage(null);
                    setScreen('login');
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-black transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Login</span>
                </button>
              )}

              {/* Header Title block */}
              <div>
                <h3 className="text-xl font-bold text-black tracking-tight">
                  {screen === 'login' && "Welcome Back"}
                  {screen === 'register' && "Create Premium Account"}
                  {screen === 'forgot' && "Reset Security Credentials"}
                  {screen === 'otp' && "OTP Validation Verification"}
                  {screen === 'reset' && "Setup New Password"}
                  {screen === 'verified' && "Verified Access Granted"}
                </h3>
                <p className="text-xs text-gray-400 font-medium mt-1">
                  {screen === 'login' && "Access your visual design system workspace audits instantly."}
                  {screen === 'register' && "Join world-class engineering teams auditing design consistency."}
                  {screen === 'forgot' && "Confirm your identity email to receive a recovery password link."}
                  {screen === 'otp' && "Provide the secure 4-digit code dispatched to your inbox."}
                  {screen === 'reset' && "Synchronize a robust 8-character passphrase code."}
                  {screen === 'verified' && "Your biometric security profile successfully matched. Redirecting..."}
                </p>
              </div>

              {/* Alert Blocks */}
              {errorMessage && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-2xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span className="font-semibold">{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-3 rounded-2xl text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span className="font-semibold">{successMessage}</span>
                </div>
              )}

              {/* FORM 1: LOGIN */}
              {screen === 'login' && (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase block">Workspace Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs pl-10 pr-4 py-3 border border-subtle rounded-2xl focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-gray-50/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold text-gray-400 uppercase block">Passphrase Code</label>
                      <button
                        type="button"
                        onClick={() => setScreen('forgot')}
                        className="text-[10px] text-gray-400 font-bold hover:text-[#6C63FF] uppercase tracking-wide"
                      >
                        Forgot?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full text-xs pl-10 pr-10 py-3 border border-subtle rounded-2xl focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-gray-50/30"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember check */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center gap-2 text-gray-500 font-medium select-none cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded border-gray-300 text-black focus:ring-black"
                      />
                      <span>Keep me logged in</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-black text-white font-semibold text-xs rounded-2xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-1.5 shadow-soft disabled:opacity-50"
                  >
                    {loading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Authenticate Workspace</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  {/* Social Divider */}
                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-slate-100"></div>
                    <span className="flex-shrink mx-3 text-[9px] text-gray-400 uppercase tracking-wider font-bold">Or sync credentials</span>
                    <div className="flex-grow border-t border-slate-100"></div>
                  </div>

                  {/* Social buttons */}
                  <div className="grid grid-cols-4 gap-2.5">
                    {['Google', 'Github', 'Apple', 'Microsoft'].map((prov) => (
                      <button
                        key={prov}
                        type="button"
                        onClick={() => handleSocialClick(prov)}
                        className="py-2.5 border border-subtle rounded-xl hover:bg-gray-50/50 hover:border-black transition-all flex items-center justify-center text-[10px] font-semibold text-gray-700"
                      >
                        {prov}
                      </button>
                    ))}
                  </div>

                  <p className="text-center text-xs text-gray-500 font-medium pt-3">
                    Don't have a workspace?{" "}
                    <button
                      type="button"
                      onClick={() => setScreen('register')}
                      className="text-black font-semibold hover:underline"
                    >
                      Join Free Now
                    </button>
                  </p>
                </form>
              )}

              {/* FORM 2: REGISTER */}
              {screen === 'register' && (
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase block">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full text-xs pl-10 pr-4 py-3 border border-subtle rounded-2xl focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-gray-50/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase block">Corporate Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs pl-10 pr-4 py-3 border border-subtle rounded-2xl focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-gray-50/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase block">Robust Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="password"
                        placeholder="Min. 8 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full text-xs pl-10 pr-4 py-3 border border-subtle rounded-2xl focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-gray-50/30"
                      />
                    </div>
                    {/* Live Pass strength bar */}
                    {password && (
                      <div className="space-y-1 pt-1">
                        <div className="flex gap-1 h-1">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <div 
                              key={i}
                              className={`flex-1 rounded-full h-full transition-all duration-300 ${
                                i < pwdStrength 
                                  ? pwdStrength <= 1 ? 'bg-rose-500' : pwdStrength === 2 ? 'bg-amber-400' : 'bg-emerald-500'
                                  : 'bg-gray-100'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[9px] text-gray-400 font-bold block">
                          Strength: {pwdStrength <= 1 ? 'Weak' : pwdStrength === 2 ? 'Medium' : 'Robust Security'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase block">Confirm Passphrase</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="password"
                        placeholder="Repeat your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full text-xs pl-10 pr-4 py-3 border border-subtle rounded-2xl focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-gray-50/30"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-black text-white font-semibold text-xs rounded-2xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-1.5 shadow-soft disabled:opacity-50"
                  >
                    {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Initiate Secure Account"}
                  </button>
                </form>
              )}

              {/* FORM 3: FORGOT */}
              {screen === 'forgot' && (
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase block">Verify Account Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs pl-10 pr-4 py-3 border border-subtle rounded-2xl focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-gray-50/30"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-black text-white font-semibold text-xs rounded-2xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-1.5 shadow-soft disabled:opacity-50"
                  >
                    {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Dispatch Validation Code"}
                  </button>
                </form>
              )}

              {/* FORM 4: OTP */}
              {screen === 'otp' && (
                <form onSubmit={handleOtpSubmit} className="space-y-6">
                  <div className="flex justify-center gap-3">
                    {otpCode.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        className="w-12 h-14 text-center text-lg font-bold border border-subtle rounded-2xl bg-gray-50 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-black text-white font-semibold text-xs rounded-2xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-1.5 shadow-soft"
                  >
                    {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Verify Identity"}
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setSuccessMessage("Fresh 4-digit code dispatched.");
                        setOtpCode(['', '', '', '']);
                      }}
                      className="text-[10px] text-gray-400 font-bold hover:text-black uppercase tracking-wide"
                    >
                      Resend Code
                    </button>
                  </div>
                </form>
              )}

              {/* FORM 5: VERIFIED */}
              {screen === 'verified' && (
                <div className="flex flex-col items-center text-center space-y-4 py-6">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-md"
                  >
                    <Check className="w-8 h-8" />
                  </motion.div>
                  <p className="text-xs text-gray-500 font-semibold">
                    Workspace validation accomplished. Syncing profile datasets...
                  </p>
                  <button
                    onClick={() => onSuccess(email || "sandbox.user@company.com")}
                    className="mt-4 px-6 py-2.5 bg-black text-white rounded-full text-xs font-semibold hover:bg-zinc-800 transition-all inline-flex items-center gap-1.5"
                  >
                    <span>Launch Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
