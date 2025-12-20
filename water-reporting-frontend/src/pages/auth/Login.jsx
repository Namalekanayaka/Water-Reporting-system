import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginUser } from '../../services/api/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoggingIn(true);
        try {
            const response = await loginUser(email, password);
            if (response.success) {
                login(response.user, response.token);

                // If the user was trying to go somewhere specific, go there.
                // Otherwise, go to their respective dashboard.
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
        } finally {
            setIsLoggingIn(false);
        }
    };

    return (
        <div className="w-full bg-[#fbfbfd] min-h-screen p-6 flex items-center justify-center">
            <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="text-center mb-12">
                    <span className="text-water-600 font-black text-3xl mb-6 block">💧</span>
                    <h1 className="text-[40px] md:text-[48px] font-black tracking-tight text-gray-900 leading-none mb-4">
                        Sign In.
                    </h1>
                    <p className="text-[17px] text-gray-400 font-medium">Continue your mission to save water.</p>
                    <div className="mt-4 p-3 bg-blue-50/50 rounded-2xl border border-blue-100/50 inline-block">
                        <p className="text-[12px] text-blue-600 font-bold uppercase tracking-wider">
                            Tester Tip: Use "admin@wrs.com" for Authority Access
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-[40px] p-10 md:p-12 shadow-apple border border-gray-50/50">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-2">
                            <label className="text-[13px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-gray-200 rounded-2xl font-medium outline-none transition-all placeholder:text-gray-300"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">Password</label>
                                <Link to="/forgot" className="text-[12px] font-bold text-water-600 hover:underline">Forgot?</Link>
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-gray-200 rounded-2xl font-medium outline-none transition-all placeholder:text-gray-300"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoggingIn}
                            className="w-full py-5 bg-gray-900 !text-white rounded-full font-black text-[17px] hover:bg-black transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 disabled:bg-gray-400"
                        >
                            {isLoggingIn ? (
                                <>
                                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                                    <span>Verifying...</span>
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    <div className="mt-12 text-center pt-8 border-t border-gray-50">
                        <p className="text-[15px] font-bold text-gray-400">
                            New here? <Link to="/register" className="text-water-600 hover:underline ml-1">Create an account</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
