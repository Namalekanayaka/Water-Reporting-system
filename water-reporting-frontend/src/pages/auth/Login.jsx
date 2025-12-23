import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginUser, loginWithGoogle } from '../../services/api/auth';
import logo from '../../assets/logo.png';

const Login = () => {
    const [isAuthorityMode, setIsAuthorityMode] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [error, setError] = useState(null);
    const { isAuthenticated, user, login, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const toggleAuthorityMode = () => {
        const newMode = !isAuthorityMode;
        setIsAuthorityMode(newMode);
        setEmail(newMode ? 'admin@wrs.com' : '');
        setError(null);
    };

    // Redirect if already logged in
    React.useEffect(() => {
        if (!authLoading && isAuthenticated) {
            if (user?.role === 'authority') {
                navigate('/authority/dashboard', { replace: true });
            } else {
                navigate('/', { replace: true });
            }
        }
    }, [isAuthenticated, authLoading, navigate, user]);

    const handleGoogleLogin = async () => {
        setIsLoggingIn(true);
        setError(null);
        try {
            const response = await loginWithGoogle();
            if (response.success) {
                if (location.state?.from) {
                    navigate(from, { replace: true });
                } else {
                    navigate(response.user.role === 'authority' ? '/authority/dashboard' : '/');
                }
            }
        } catch (error) {
            console.error('Google Login failed:', error);
            setError(error.message || 'Google Sign-In failed.');
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoggingIn(true);
        setError(null);
        try {
            const response = await loginUser(email, password);
            if (response.success) {
                if (location.state?.from) {
                    navigate(from, { replace: true });
                } else {
                    if (response.user.role === 'authority') {
                        navigate('/authority/dashboard');
                    } else {
                        navigate('/');
                    }
                }
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError(error.message || 'Failed to sign in. Please checking your credentials.');
        } finally {
            setIsLoggingIn(false);
        }
    };

    return (
        <div className={`w-full min-h-screen flex animate-in fade-in duration-700 ${isAuthorityMode ? 'bg-slate-900' : 'bg-white'}`}>

            {/* Left Side: Visual Brand Panel (Hidden on Mobile) */}
            <div className={`hidden lg:flex lg:w-1/2 relative overflow-hidden transition-all duration-1000 ${isAuthorityMode ? 'bg-slate-800' : 'bg-md-primary-container'}`}>
                {/* Background Image / Abstract */}
                <div className="absolute inset-0">
                    <img
                        src={isAuthorityMode
                            ? "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" // Tech/Dark Cyberpunk vibe
                            : "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2070&auto=format&fit=crop" // Clean Water vibe
                        }
                        className="w-full h-full object-cover opacity-60 mix-blend-overlay transition-opacity duration-700"
                        alt="Background"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${isAuthorityMode ? 'from-slate-900 via-slate-900/40 to-transparent' : 'from-md-primary via-md-primary/20 to-transparent'}`}></div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 p-16 flex flex-col justify-between h-full w-full">
                    <div>
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/30 shadow-lg">
                            <img src={logo} alt="AquaAlert Logo" className="w-10 h-10 object-contain drop-shadow-md" />
                        </div>
                        <h1 className={`text-6xl font-black tracking-tighter mb-6 leading-[0.9] ${isAuthorityMode ? 'text-white' : 'text-md-on-primary-container'}`}>
                            {isAuthorityMode ? "Command.\nControl.\nSecure." : "Pure Water.\nPure Life."}
                        </h1>
                        <p className={`text-lg font-medium max-w-md ${isAuthorityMode ? 'text-slate-300' : 'text-md-on-primary-container/80'}`}>
                            {isAuthorityMode
                                ? "Restricted access environment for water infrastructure authentication and system governance."
                                : "Join the community-driven network monitoring our most vital resource in real-time."}
                        </p>
                    </div>

                    <div className={`backdrop-blur-sm p-6 rounded-3xl border ${isAuthorityMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white/40 border-white/40 text-md-on-surface'}`}>
                        <p className="font-bold text-sm mb-2">System Status</p>
                        <div className="flex items-center gap-3">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                            </span>
                            <span className="text-xs font-bold uppercase tracking-widest opacity-80">Operational • v1.2.0</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 relative">
                <div className="max-w-[420px] w-full">

                    {/* Mobile Report Banner - Visible only on small screens */}
                    <div className="lg:hidden w-full h-40 mb-8 rounded-2xl overflow-hidden relative shadow-md">
                        <img
                            src={isAuthorityMode
                                ? "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
                                : "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2070&auto=format&fit=crop"
                            }
                            className="w-full h-full object-cover"
                            alt="Mobile Header"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${isAuthorityMode ? 'from-slate-900' : 'from-white'} to-transparent opacity-80`}></div>
                        <div className="absolute bottom-3 left-4 flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/30">
                                <img src={logo} alt="Logo" className="w-5 h-5 object-contain" />
                            </div>
                            <span className={`text-sm font-black tracking-tighter ${isAuthorityMode ? 'text-white' : 'text-md-on-surface'}`}>AquaAlert</span>
                        </div>
                    </div>

                    {/* Header */}
                    <div className="mb-10">
                        {isAuthorityMode ? (
                            <span className="inline-block px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-[10px] font-black uppercase tracking-widest mb-4 border border-slate-700">Official Access Only</span>
                        ) : (
                            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-4">Citizen Portal</span>
                        )}

                        <h2 className={`text-3xl md:text-4xl font-black mb-3 ${isAuthorityMode ? 'text-white' : 'text-md-on-surface'}`}>
                            {isAuthorityMode ? 'Authority Login' : 'Welcome Back'}
                        </h2>

                        {!isAuthorityMode && (
                            <p className="text-lg md:text-xl font-bold text-md-primary mb-2 animate-pulse bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
                                Welcome to AquaAlert
                            </p>
                        )}

                        <p className={`text-sm ${isAuthorityMode ? 'text-slate-400' : 'text-md-on-surface-variant'}`}>
                            Please enter your credentials to access the terminal.
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100 flex items-start gap-3 animate-in slide-in-from-top-2">
                            <span className="text-lg">⚠️</span>
                            <span className="mt-0.5">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className={`text-[11px] font-bold uppercase tracking-widest ${isAuthorityMode ? 'text-slate-400' : 'text-md-on-surface-variant'}`}>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setError(null); }}
                                className={`w-full px-5 py-4 rounded-xl font-medium outline-none transition-all
                                    ${isAuthorityMode
                                        ? 'bg-slate-800 border-slate-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:bg-white focus:border-md-primary focus:ring-4 focus:ring-md-primary/10 border-2'
                                    }`}
                                placeholder="name@example.com"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className={`text-[11px] font-bold uppercase tracking-widest ${isAuthorityMode ? 'text-slate-400' : 'text-md-on-surface-variant'}`}>Password</label>
                                {!isAuthorityMode && <Link to="/forgot" className="text-[11px] font-bold text-md-primary hover:text-md-primary/80">Forgot Password?</Link>}
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full px-5 py-4 rounded-xl font-medium outline-none transition-all
                                    ${isAuthorityMode
                                        ? 'bg-slate-800 border-slate-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:bg-white focus:border-md-primary focus:ring-4 focus:ring-md-primary/10 border-2'
                                    }`}
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoggingIn}
                            className={`w-full h-14 rounded-xl font-black text-sm uppercase tracking-wider hover:shadow-xl transition-all active:scale-95 disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-2
                                ${isAuthorityMode
                                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/20'
                                    : 'bg-md-primary hover:bg-md-primary/90 text-white shadow-md-primary/30'
                                }`}
                        >
                            {isLoggingIn ? 'Authenticating...' : 'Sign In'}
                        </button>
                    </form>

                    {/* Footer / Alt Actions */}
                    <div className="mt-10 pt-6 border-t border-gray-100 dark:border-slate-800">
                        {!isAuthorityMode ? (
                            <div className="space-y-6">
                                <button
                                    type="button"
                                    onClick={handleGoogleLogin}
                                    disabled={isLoggingIn}
                                    className="w-full py-3.5 bg-white border-2 border-gray-100 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-200 transition-all flex items-center justify-center gap-3"
                                >
                                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                                    <span>Sign in with Google</span>
                                </button>

                                <div className="text-center">
                                    <p className="text-sm font-medium text-gray-500 mb-4">
                                        Don't have an account? <Link to="/register" className="text-md-primary font-bold hover:underline">Create Account</Link>
                                    </p>
                                    <button
                                        onClick={toggleAuthorityMode}
                                        className="text-[10px] font-black text-gray-400 hover:text-md-primary uppercase tracking-widest transition-colors"
                                    >
                                        Access Authority Console
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center">
                                <button
                                    onClick={toggleAuthorityMode}
                                    className="text-sm font-bold text-slate-500 hover:text-white transition-colors flex items-center justify-center gap-2 mx-auto"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                                    Back to Citizen Login
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
