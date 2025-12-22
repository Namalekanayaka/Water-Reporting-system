import { db } from '../../services/firebase';
import {
    collection,
    getDocs,
    doc,
    updateDoc,
    addDoc,
    query,
    orderBy,
    limit,
    deleteDoc
} from 'firebase/firestore';

// --- TEAMS MANAGEMENT ---

/**
 * Fetch all response teams
 */
export const getTeams = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'teams'));
        const teams = [];
        querySnapshot.forEach((doc) => {
            teams.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, teams };
    } catch (error) {
        console.error("Error fetching teams:", error);
        return { success: false, error: error.message };
    }
};

/**
 * Add a new response team
 */
export const addTeam = async (teamData) => {
    try {
        // teamData: { name, avatar (initials), status, currentTask }
        const docRef = await addDoc(collection(db, 'teams'), {
            ...teamData,
            createdAt: new Date().toISOString()
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error adding team:", error);
        return { success: false, error: error.message };
    }
};

/**
 * Update a team's status
 */
export const updateTeamStatus = async (teamId, status, currentTask = '') => {
    try {
        const teamRef = doc(db, 'teams', teamId);
        await updateDoc(teamRef, {
            status,
            currentTask
        });
        return { success: true };
    } catch (error) {
        console.error("Error updating team:", error);
        return { success: false, error: error.message };
    }
};

// --- ALERTS MANAGEMENT ---

/**
 * Fetch system alerts (recent 10)
 */
export const getSystemAlerts = async () => {
    try {
        const q = query(
            collection(db, 'alerts'),
            orderBy('createdAt', 'desc'),
            limit(10)
        );
        const querySnapshot = await getDocs(q);
        const alerts = [];
        querySnapshot.forEach((doc) => {
            alerts.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, alerts };
    } catch (error) {
        console.error("Error fetching alerts:", error);
        return { success: false, error: error.message };
    }
};

/**
 * Create a new system alert
 */
export const createSystemAlert = async (message, severity = 'info') => {
    try {
        await addDoc(collection(db, 'alerts'), {
            message,
            severity,
            createdAt: new Date().toISOString()
        });
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

/**
 * Utility to seed initial mock data into Firestore if empty
 */
export const seedInitialAdminData = async () => {
    try {
        // Seed Teams
        const teamsSnapshot = await getDocs(collection(db, 'teams'));
        if (teamsSnapshot.empty) {
            const initialTeams = [
                { name: 'Team Alpha', avatar: 'TA', status: 'available', currentTask: 'Standby at Station 1' },
                { name: 'Team Beta', avatar: 'TB', status: 'busy', currentTask: 'Repairing Pipe #4092' },
                { name: 'Team Gamma', avatar: 'TG', status: 'off-duty', currentTask: '' },
            ];
            for (const team of initialTeams) {
                await addDoc(collection(db, 'teams'), team);
            }
        }

        // Seed Alerts
        const alertsSnapshot = await getDocs(collection(db, 'alerts'));
        if (alertsSnapshot.empty) {
            const initialAlerts = [
                { message: 'Heavy rain forecast for Zone B', severity: 'warning', createdAt: new Date().toISOString() },
                { message: 'System maintenance scheduled for 2:00 AM', severity: 'info', createdAt: new Date().toISOString() }
            ];
            for (const alert of initialAlerts) {
                await addDoc(collection(db, 'alerts'), alert);
            }
        }
        return { success: true };
    } catch (error) {
        console.error("Seed error:", error);
        return { success: false };
    }
};
