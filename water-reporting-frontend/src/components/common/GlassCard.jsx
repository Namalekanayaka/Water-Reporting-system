import React from 'react';

const GlassCard = ({ children, className = '', variant = 'default' }) => {
    const variants = {
        default: 'bg-white/10 backdrop-blur-xl border border-white/20',
        dark: 'bg-slate-800/40 backdrop-blur-xl border border-slate-700/50',
        light: 'bg-white/20 backdrop-blur-lg border border-white/30',
    };

    return (
        <div className={`rounded-3xl shadow-glass ${variants[variant]} ${className}`}>
            {children}
        </div>
    );
};

export default GlassCard;
