import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginUser, loginWithGoogle } from '../../services/api/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [error, setError] = useState(null);
    const { isAuthenticated, user, login, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

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
                // login function in AuthContext might not be strictly needed if onAuthStateChanged is used, 
                // but we call it to be safe/consistent with previous logic.
                // Actually AuthContext detects it automatically. 
                // We just need to handle navigation.

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
                // login(response.user, response.token); // Again, listener handles this mostly

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
        <div className="w-full bg-md-surface min-h-screen p-6 flex items-center justify-center">
            <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="text-center mb-12">
                    <span className="text-md-primary font-black text-3xl mb-6 block">💧</span>
                    <h1 className="text-[40px] md:text-[48px] font-black tracking-tight text-md-on-surface leading-none mb-4">
                        Sign In.
                    </h1>
                    <p className="text-[17px] text-md-on-surface-variant font-medium">Continue your mission to save water.</p>
                </div>

                <div className="bg-white rounded-[40px] p-10 md:p-12 shadow-md-2 border border-md-outline/10">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100 flex items-center gap-3">
                            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {error}
                        </div>
                    )}

                    {/* Google Sign In */}
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={isLoggingIn}
                        className="w-full h-14 bg-white border-2 border-md-outline/10 rounded-full font-bold text-md-on-surface hover:bg-gray-50 transition-all flex items-center justify-center gap-3 mb-6"
                    >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-6 h-6" alt="Google" />
                        Continue with Google
                    </button>

                    <div className="flex items-center gap-4 mb-6 opacity-60">
                        <div className="h-px bg-md-outline/20 flex-1"></div>
                        <span className="text-xs font-bold uppercase tracking-widest">Or with email</span>
                        <div className="h-px bg-md-outline/20 flex-1"></div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[12px] font-black text-md-on-surface-variant uppercase tracking-widest ml-1">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setError(null); }}
                                placeholder="e.g. admin@wrs.com"
                                className="w-full px-6 py-4 bg-md-surface-variant/20 border-b-2 border-md-outline/10 focus:border-md-primary rounded-t-2xl font-bold text-md-on-surface outline-none transition-all placeholder:text-gray-300"
                                required
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[12px] font-black text-md-on-surface-variant uppercase tracking-widest">Password</label>
                                <Link to="/forgot" className="text-[12px] font-black text-md-primary hover:underline">Forgot?</Link>
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-6 py-4 bg-md-surface-variant/20 border-b-2 border-md-outline/10 focus:border-md-primary rounded-t-2xl font-bold text-md-on-surface outline-none transition-all placeholder:text-gray-300"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoggingIn}
                            className="w-full h-16 bg-md-primary text-white rounded-full font-black text-[17px] hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-3 disabled:bg-md-outline/20"
                        >
                            {isLoggingIn ? (
                                <>
                                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                                    <span>Verifying Data...</span>
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    <div className="mt-12 text-center pt-8 border-t border-md-outline/10">
                        <p className="text-[15px] font-bold text-md-on-surface-variant">
                            New here? <Link to="/register" className="text-md-primary hover:underline ml-1">Create an account</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
