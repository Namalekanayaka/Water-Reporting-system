import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginUser, loginWithGoogle } from '../../services/api/auth';

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
        <div className={`w-full min-h-screen p-6 flex items-center justify-center transition-colors duration-500 ${isAuthorityMode ? 'bg-slate-900' : 'bg-md-surface'}`}>
            <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="text-center mb-8">
                    <span className="text-4xl mb-4 block animate-bounce">{isAuthorityMode ? '🛡️' : '💧'}</span>
                    {!isAuthorityMode && (
                        <p className="text-lg md:text-xl font-bold text-md-primary mb-2 animate-pulse bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
                            Welcome to AquaAlert
                        </p>
                    )}
                    <h1 className={`text-[36px] md:text-[44px] font-black tracking-tight leading-none mb-2 ${isAuthorityMode ? 'text-white' : 'text-md-on-surface'}`}>
                        {isAuthorityMode ? "Authority Console." : "Sign In."}
                    </h1>
                    <p className={`text-[15px] font-medium ${isAuthorityMode ? 'text-slate-400' : 'text-md-on-surface-variant'}`}>
                        {isAuthorityMode ? "Secure access for system administrators." : "Continue your mission to save water."}
                    </p>
                </div>

                <div className={`rounded-[32px] p-8 md:p-10 shadow-xl border ${isAuthorityMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-md-outline/10'}`}>
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 text-red-500 rounded-xl text-sm font-bold border border-red-500/20 flex items-center gap-3">
                            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {error}
                        </div>
                    )}

                    {/* Google Sign In - Hidden in Authority Mode for specific credentials requirement */}
                    {!isAuthorityMode && (
                        <>
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                disabled={isLoggingIn}
                                className="w-full h-14 bg-white border-2 border-md-outline/10 rounded-2xl font-bold text-md-on-surface hover:bg-gray-50 transition-all flex items-center justify-center gap-3 mb-6"
                            >
                                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-6 h-6" alt="Google" />
                                Continue with Google
                            </button>

                            <div className="flex items-center gap-4 mb-6 opacity-60">
                                <div className="h-px bg-md-outline/20 flex-1"></div>
                                <span className="text-xs font-bold uppercase tracking-widest">Or with email</span>
                                <div className="h-px bg-md-outline/20 flex-1"></div>
                            </div>
                        </>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className={`text-[11px] font-black uppercase tracking-widest ml-1 ${isAuthorityMode ? 'text-slate-400' : 'text-md-on-surface-variant'}`}>Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setError(null); }}
                                placeholder="e.g. admin@wrs.com"
                                className={`w-full px-5 py-4 border-b-2 rounded-t-xl font-bold outline-none transition-all ${isAuthorityMode
                                    ? 'bg-slate-900/50 border-slate-600 focus:border-blue-500 text-white placeholder:text-slate-600'
                                    : 'bg-md-surface-variant/20 border-md-outline/10 focus:border-md-primary text-md-on-surface placeholder:text-gray-300'}`}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className={`text-[11px] font-black uppercase tracking-widest ${isAuthorityMode ? 'text-slate-400' : 'text-md-on-surface-variant'}`}>Password</label>
                                {!isAuthorityMode && <Link to="/forgot" className="text-[11px] font-black text-md-primary hover:underline">Forgot?</Link>}
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className={`w-full px-5 py-4 border-b-2 rounded-t-xl font-bold outline-none transition-all ${isAuthorityMode
                                    ? 'bg-slate-900/50 border-slate-600 focus:border-blue-500 text-white placeholder:text-slate-600'
                                    : 'bg-md-surface-variant/20 border-md-outline/10 focus:border-md-primary text-md-on-surface placeholder:text-gray-300'}`}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoggingIn}
                            className={`w-full h-14 text-white rounded-full font-black text-[15px] hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 ${isAuthorityMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-md-primary hover:bg-md-primary/90'}`}
                        >
                            {isLoggingIn ? (
                                <>
                                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                                    <span>Verifying...</span>
                                </>
                            ) : (
                                isAuthorityMode ? "Enter Console" : "Sign In"
                            )}
                        </button>
                    </form>

                    <div className={`mt-8 text-center pt-6 border-t ${isAuthorityMode ? 'border-slate-700' : 'border-md-outline/10'}`}>
                        {isAuthorityMode ? (
                            <button onClick={toggleAuthorityMode} className="text-[14px] font-bold text-slate-400 hover:text-white transition-colors">
                                ← Return to Citizen Login
                            </button>
                        ) : (
                            <div className="space-y-3">
                                <p className="text-[14px] font-bold text-md-on-surface-variant">
                                    New here? <Link to="/register" className="text-md-primary hover:underline ml-1">Create an account</Link>
                                </p>
                                <button onClick={toggleAuthorityMode} className="text-[11px] font-bold text-md-on-surface-variant/50 hover:text-md-primary uppercase tracking-wider transition-colors">
                                    Are you an official? Log in to Authority Console
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
