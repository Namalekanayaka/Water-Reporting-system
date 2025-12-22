import { db, auth, storage } from '../../services/firebase';
import {
    collection,
    addDoc,
    setDoc,
    getDocs,
    doc,
    getDoc,
    query,
    where,
    orderBy,
    updateDoc,
    arrayUnion
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

/**
 * Create a new water issue report
 * @param {Object} reportData 
 */
export const createReport = async (reportData) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("User must be logged in to report.");

        // Generate a new document reference to get an ID beforehand
        const newReportRef = doc(collection(db, 'reports'));
        const reportId = newReportRef.id;

        let imageUrls = [];

        // Upload images if they exist
        if (reportData.images && reportData.images.length > 0) {
            const uploadPromises = reportData.images.map(async (file) => {
                // Determine file extension or use name
                const storageRef = ref(storage, `reports/${reportId}/${Date.now()}_${file.name}`);
                await uploadBytes(storageRef, file);
                return await getDownloadURL(storageRef);
            });

            imageUrls = await Promise.all(uploadPromises);
        }

        const newReport = {
            ...reportData,
            images: imageUrls, // Store URLs, not File objects
            userId: user.uid,
            userEmail: user.email,
            status: 'pending',
            createdAt: new Date().toISOString(),
            timeline: [
                { status: 'pending', timestamp: new Date().toISOString() }
            ]
        };

        // Save to Firestore using setDoc with the generated ID
        await setDoc(newReportRef, newReport);

        return {
            success: true,
            reportId: reportId,
            message: 'Report submitted successfully!',
            data: { id: reportId, ...newReport }
        };
    } catch (error) {
        console.error("Error creating report:", error);
        throw error;
    }
};

/**
 * Get all reports (for public dashboard/map)
 */
export const getAllReports = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'reports'));
        const reports = [];
        querySnapshot.forEach((doc) => {
            reports.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, reports };
    } catch (error) {
        console.error("Error getting reports:", error);
        return { success: false, error: error.message, reports: [] };
    }
};

/**
 * Get all reports for the current user
 */
export const getUserReports = async () => {
    try {
        const user = auth.currentUser;
        if (!user) return { success: false, message: "Not logged in" };

        const q = query(
            collection(db, 'reports'),
            where("userId", "==", user.uid)
        );

        const querySnapshot = await getDocs(q);
        const reports = [];
        querySnapshot.forEach((doc) => {
            reports.push({ id: doc.id, ...doc.data() });
        });

        return { success: true, reports };
    } catch (error) {
        console.error("Error getting user reports:", error);
        return { success: false, error: error.message };
    }
};

/**
 * Get a single report by ID
 */
export const getReportById = async (reportId) => {
    try {
        const docRef = doc(db, 'reports', reportId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { success: true, report: { id: docSnap.id, ...docSnap.data() } };
        } else {
            return { success: false, message: "Report not found" };
        }
    } catch (error) {
        console.error("Error getting report:", error);
        return { success: false, error: error.message };
    }
};

/**
 * Update report status
 */
export const updateReportStatus = async (reportId, status, notes = '') => {
    try {
        const reportRef = doc(db, 'reports', reportId);
        await updateDoc(reportRef, {
            status: status,
            timeline: arrayUnion({
                status: status,
                timestamp: new Date().toISOString(),
                notes: notes
            })
        });
        return { success: true };
    } catch (error) {
        console.error("Error updating status:", error);
        return { success: false, error: error.message };
    }
};
