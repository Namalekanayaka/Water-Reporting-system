import React from 'react';
import { useNotification } from '../../context/NotificationContext';

const NotificationToast = () => {
    const { notifications, removeNotification } = useNotification();

    if (notifications.length === 0) return null;

    const getTypeStyles = (type) => {
        switch (type) {
            case 'success':
                return 'bg-emerald-500 border-emerald-600';
            case 'error':
                return 'bg-red-500 border-red-600';
            case 'warning':
                return 'bg-orange-500 border-orange-600';
            default:
                return 'bg-blue-500 border-blue-600';
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'success':
                return (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'error':
                return (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'warning':
                return (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                );
            default:
                return (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
        }
    };

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`${getTypeStyles(notification.type)} text-white p-4 rounded-xl shadow-lg border-2 animate-slide-in-right flex items-start gap-3`}
                >
                    <div className="flex-shrink-0">
                        {getIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold text-sm">{notification.message}</p>
                    </div>
                    <button
                        onClick={() => removeNotification(notification.id)}
                        className="flex-shrink-0 hover:bg-white/20 rounded-lg p-1 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default NotificationToast;
