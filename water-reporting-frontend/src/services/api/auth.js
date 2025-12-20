/**
 * API service for authentication.
 * For demonstration, this uses simulated delay and mock logic.
 */

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const loginUser = async (email, password) => {
    await sleep(1000); // Simulate network delay

    // Mock logic for role assignment
    // For testing: Use 'admin@wrs.com' to get authority role
    let role = 'citizen';
    if (email.toLowerCase().includes('admin') || email.toLowerCase().includes('authority')) {
        role = 'authority';
    }

    // Simulate success
    return {
        success: true,
        user: {
            id: 'u123',
            name: email.split('@')[0],
            email: email,
            role: role
        },
        token: 'ey-mock-jwt-token-' + Date.now()
    };
};

export const registerUser = async (userData) => {
    await sleep(1500);

    return {
        success: true,
        user: {
            id: 'u' + Math.floor(Math.random() * 1000),
            ...userData,
            role: 'citizen' // New registrations are always citizens by default
        },
        token: 'ey-mock-jwt-token-' + Date.now()
    };
};

export const validateToken = async (token) => {
    await sleep(500);
    return { success: true, valid: true };
};
