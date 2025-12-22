import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // 1. Optimistic Initialization from LocalStorage for Speed
    const [user, setUser] = useState(() => {
        try {
            const saved = localStorage.getItem('water_user');
            return saved ? JSON.parse(saved) : null;
        } catch (e) { return null; }
    });
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        try {
            return !!localStorage.getItem('water_user');
        } catch (e) { return false; }
    });
    // Only show loading spinner if we have NO cached user. 
    // If cached user exists, we show app immediately (optimistic) while verifying in background.
    const [loading, setLoading] = useState(() => {
        try {
            return !localStorage.getItem('water_user');
        } catch (e) { return true; }
    });

    // Listen for Firebase Auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    // Fetch role and other details from Firestore
                    const docRef = doc(db, 'users', firebaseUser.uid);
                    let docSnap = await getDoc(docRef);

                    // Race condition fix: Wait briefly if creating account (Reduced to 500ms for speed)
                    if (!docSnap.exists()) {
                        await new Promise(resolve => setTimeout(resolve, 500));
                        docSnap = await getDoc(docRef);
                    }

                    let finalUser;
                    if (docSnap.exists()) {
                        finalUser = { ...docSnap.data(), uid: firebaseUser.uid };
                    } else {
                        // Fallback
                        finalUser = {
                            uid: firebaseUser.uid,
                            email: firebaseUser.email,
                            role: 'citizen',
                            name: firebaseUser.displayName || 'User'
                        };
                    }
                    setUser(finalUser);
                    setIsAuthenticated(true);
                    localStorage.setItem('water_user', JSON.stringify(finalUser));
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                }
            } else {
                setUser(null);
                setIsAuthenticated(false);
                localStorage.removeItem('water_user');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Manual login helper (optional, as listener handles state)
    // We keep it to be compatible with existing Login.jsx calls
    const login = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = async () => {
        try {
            await signOut(auth);
            // State will be updated by onAuthStateChanged
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export default AuthContext;
