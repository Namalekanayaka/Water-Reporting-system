import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { registerUser } from '../../services/api/auth';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [isRegistering, setIsRegistering] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
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
        } finally {
            setIsRegistering(false);
        }
    };

    return (
        <div className="w-full bg-[#fbfbfd] min-h-screen p-6 flex flex-col items-center justify-center">
            <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="text-center mb-12">
                    <span className="text-water-600 font-black text-3xl mb-6 block">🌍</span>
                    <h1 className="text-[40px] md:text-[48px] font-black tracking-tight text-gray-900 leading-none mb-4">
                        Join Us.
                    </h1>
                    <p className="text-[17px] text-gray-400 font-medium">Start your journey toward a better community.</p>
                </div>

                <div className="bg-white rounded-[40px] p-10 md:p-12 shadow-apple border border-gray-50/50">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[13px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                            <input
                                type="text" name="name" value={formData.name} onChange={handleChange}
                                placeholder="John Doe"
                                className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-gray-200 rounded-2xl font-medium outline-none transition-all placeholder:text-gray-300"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[13px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                            <input
                                type="email" name="email" value={formData.email} onChange={handleChange}
                                placeholder="name@company.com"
                                className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-gray-200 rounded-2xl font-medium outline-none transition-all placeholder:text-gray-300"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[13px] font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
                            <input
                                type="password" name="password" value={formData.password} onChange={handleChange}
                                placeholder="Create a password"
                                className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-gray-200 rounded-2xl font-medium outline-none transition-all placeholder:text-gray-300"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[13px] font-bold text-gray-400 uppercase tracking-widest ml-1">Confirm Password</label>
                            <input
                                type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                                placeholder="Repeat password"
                                className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-gray-200 rounded-2xl font-medium outline-none transition-all placeholder:text-gray-300"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className="w-full py-5 bg-gray-900 !text-white rounded-full font-black text-[17px] hover:bg-black transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 disabled:bg-gray-400"
                        >
                            {isRegistering ? (
                                <>
                                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                                    <span>Processing...</span>
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    <div className="mt-12 text-center pt-8 border-t border-gray-50">
                        <p className="text-[15px] font-bold text-gray-400">
                            Already have an account? <Link to="/login" className="text-water-600 hover:underline ml-1">Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
