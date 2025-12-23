import { db } from '../../services/firebase';
import { collection, getDocs, doc, query, orderBy, limit } from 'firebase/firestore';

/**
 * Fetch all users (for Audit Logs)
 */
export const getAllUsers = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const users = [];
        querySnapshot.forEach((doc) => {
            users.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, users };
    } catch (error) {
        console.error("Error fetching users:", error);
        return { success: false, error: error.message, users: [] };
    }
};
