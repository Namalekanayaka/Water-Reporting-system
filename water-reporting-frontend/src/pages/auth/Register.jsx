import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { registerUser } from '../../services/api/auth';
import logo from '../../assets/logo.png';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState(null);
    const { login, isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    // Redirect if already logged in
    React.useEffect(() => {
        if (!loading && isAuthenticated) {
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, loading, navigate]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsRegistering(true);
        try {
            const response = await registerUser(formData);
            if (response.success) {
                login(response.user, response.token);
                navigate('/');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            setError(error.message || 'Failed to create account.');
        } finally {
            setIsRegistering(false);
        }
    };

    return (
        <div className="w-full min-h-screen flex animate-in fade-in duration-700 bg-white relative">

            {/* Mobile Background Image - Fixed & Full Screen */}
            <div className="fixed inset-0 z-0 lg:hidden">
                <img
                    src="https://images.unsplash.com/photo-1546255152-4a005086d790?q=80&w=2070&auto=format&fit=crop"
                    className="w-full h-full object-cover"
                    alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-t from-md-surface via-white/80 to-white/40 backdrop-blur-[2px]"></div>
            </div>

            {/* Left Side: Visual Brand Panel (Desktop Only) */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-md-primary-container z-10">
                {/* Background Image / Abstract */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1546255152-4a005086d790?q=80&w=2070&auto=format&fit=crop" // Nature/Community vibe
                        className="w-full h-full object-cover opacity-60 mix-blend-overlay transition-opacity duration-700"
                        alt="Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-md-primary via-md-primary/20 to-transparent"></div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 p-16 flex flex-col justify-between h-full w-full">
                    <div>
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/30 shadow-lg">
                            <img src={logo} alt="AquaAlert Logo" className="w-10 h-10 object-contain drop-shadow-md" />
                        </div>
                        <h1 className="text-6xl font-black tracking-tighter mb-6 leading-[0.9] text-md-on-primary-container">
                            Be The<br />Change.
                        </h1>
                        <p className="text-lg font-medium max-w-md text-md-on-primary-container/80">
                            Create your Citizen account today. Report issues, track resolutions, and protect our community's water infrastructure.
                        </p>
                    </div>

                    <div className="backdrop-blur-sm p-6 rounded-3xl border bg-white/40 border-white/40 text-md-on-surface">
                        <p className="font-bold text-sm mb-2">Community Impact</p>
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🤝</span>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest opacity-80">Reports Solved</p>
                                <p className="text-lg font-black">1.2k+ Issues Fixed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Register Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-16 relative z-10 overflow-y-auto">
                <div className="max-w-[420px] w-full my-auto md:bg-transparent bg-white/60 md:backdrop-blur-none backdrop-blur-xl md:p-0 p-8 md:rounded-none rounded-[32px] md:shadow-none shadow-xl border md:border-none border-white/40">

                    {/* Header */}
                    <div className="mb-8">
                        <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-4">New Account</span>
                        <h2 className="text-3xl md:text-4xl font-black mb-3 text-md-on-surface">
                            Join AquaAlert.
                        </h2>
                        <p className="text-sm text-md-on-surface-variant">
                            Enter your details to register as a citizen reporter.
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100 flex items-start gap-3 animate-in slide-in-from-top-2">
                            <span className="text-lg">⚠️</span>
                            <span className="mt-0.5">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-md-on-surface-variant">Full Name</label>
                            <input
                                type="text" name="name" value={formData.name} onChange={handleChange}
                                placeholder="e.g. Jane Doe"
                                className="w-full px-5 py-3.5 bg-white/80 border-2 border-gray-200 rounded-xl font-medium text-gray-900 outline-none transition-all focus:bg-white focus:border-md-primary focus:ring-4 focus:ring-md-primary/10"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-md-on-surface-variant">Email Address</label>
                            <input
                                type="email" name="email" value={formData.email} onChange={handleChange}
                                placeholder="name@example.com"
                                className="w-full px-5 py-3.5 bg-white/80 border-2 border-gray-200 rounded-xl font-medium text-gray-900 outline-none transition-all focus:bg-white focus:border-md-primary focus:ring-4 focus:ring-md-primary/10"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-md-on-surface-variant">Password</label>
                                <input
                                    type="password" name="password" value={formData.password} onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full px-5 py-3.5 bg-white/80 border-2 border-gray-200 rounded-xl font-medium text-gray-900 outline-none transition-all focus:bg-white focus:border-md-primary focus:ring-4 focus:ring-md-primary/10"
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-md-on-surface-variant">Confirm</label>
                                <input
                                    type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full px-5 py-3.5 bg-white/80 border-2 border-gray-200 rounded-xl font-medium text-gray-900 outline-none transition-all focus:bg-white focus:border-md-primary focus:ring-4 focus:ring-md-primary/10"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className="w-full h-14 bg-md-primary text-white rounded-xl font-black text-sm uppercase tracking-wider hover:shadow-xl hover:bg-md-primary/90 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:pointer-events-none mt-2"
                        >
                            {isRegistering ? 'Creating Account...' : 'Get Started'}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-gray-200/50 text-center">
                        <p className="text-sm font-medium text-gray-500">
                            Already part of the team? <Link to="/login" className="text-md-primary font-bold hover:underline">Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
