import { auth, db } from '../../services/firebase';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

/**
 * Log in with Google
 */
export const loginWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        let userData = {
            uid: user.uid,
            email: user.email,
            name: user.displayName,
            role: 'citizen',
            photoURL: user.photoURL
        };

        if (userDoc.exists()) {
            userData = { ...userData, ...userDoc.data() };
        } else {
            // New Google user -> Create profile
            await setDoc(userDocRef, {
                ...userData,
                createdAt: new Date().toISOString()
            });
        }

        return {
            success: true,
            user: userData,
            token: await user.getIdToken()
        };
    } catch (error) {
        console.error("Google Login Error:", error);
        throw { message: error.message };
    }
};

/**
 * Log in a user using Firebase Auth
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<Object>} User object and success status
 */
export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Fetch additional user details (like role) from Firestore
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        let userData = {
            uid: user.uid,
            email: user.email,
            role: 'citizen' // Default
        };

        if (userDoc.exists()) {
            userData = { ...userData, ...userDoc.data() };
        }

        // Force Authority Role for the fixed admin email (Self-healing)
        if (user.email === 'admin@wrs.com') {
            userData.role = 'authority';
            // Update DB if it was wrong
            if (userDoc.exists() && userDoc.data().role !== 'authority') {
                await setDoc(doc(db, 'users', user.uid), { role: 'authority' }, { merge: true });
            }
        }

        return {
            success: true,
            user: userData,
            token: await user.getIdToken()
        };
    } catch (error) {
        console.error("Login Error:", error);
        throw { message: error.message };
    }
};

/**
 * Register a new user using Firebase Auth
 * @param {Object} userData - MUST contain email, password, name
 * @returns {Promise<Object>} User object and success status
 */
export const registerUser = async ({ email, password, name }) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Create user document in Firestore
        const newUserProfile = {
            uid: user.uid,
            name: name,
            email: email,
            role: email === 'admin@wrs.com' ? 'authority' : 'citizen', // Auto-admin for this specific email
            createdAt: new Date().toISOString()
        };

        await setDoc(doc(db, 'users', user.uid), newUserProfile);

        return {
            success: true,
            user: newUserProfile,
            token: await user.getIdToken()
        };
    } catch (error) {
        console.error("Registration Error:", error);
        throw { message: error.message };
    }
};

/**
 * Log out the current user
 */
export const logoutUser = async () => {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        console.error("Logout Error:", error);
        throw error;
    }
};

// Kept for compatibility, though Firebase handles token validation internally
export const validateToken = async () => {
    return { success: true, valid: true };
};
