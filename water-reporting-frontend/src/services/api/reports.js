// API service for reports endpoints
import axios from 'axios';

// Mock API base URL (will be replaced with real backend later)
const API_BASE_URL = '/api';

/**
 * Create a new water issue report
 * @param {Object} reportData - Report data including type, priority, location, description, images
 * @returns {Promise} Response with report ID and success message
 */
export const createReport = async (reportData) => {
    // Mock implementation - simulates API call
    // TODO: Replace with actual API call when backend is ready

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate successful response
            const reportId = 'R' + Date.now();

            console.log('Report submitted:', {
                ...reportData,
                reportId,
                timestamp: new Date().toISOString()
            });

            resolve({
                success: true,
                reportId: reportId,
                message: 'Report submitted successfully! We will review it shortly.',
                data: {
                    reportId,
                    status: 'pending',
                    createdAt: new Date().toISOString()
                }
            });

            // Uncomment to simulate error
            // reject({
            //   success: false,
            //   message: 'Failed to submit report. Please try again.'
            // });
        }, 1500); // Simulate network delay
    });
};

/**
 * Get all reports (for public dashboard/map)
 * @returns {Promise} Array of all reports
 */
export const getAllReports = async () => {
    // Mock implementation returning various states and locations
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                reports: [
                    {
                        id: 'R123456',
                        type: 'pipeline_leakage',
                        priority: 'high',
                        status: 'in_progress',
                        location: { address: 'Slave Island, Colombo', lat: 6.920, lng: 79.850 },
                        description: 'Main line burst.',
                        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
                    },
                    {
                        id: 'R789012',
                        type: 'water_quality',
                        priority: 'medium',
                        status: 'pending',
                        location: { address: 'Bambalapitiya, Colombo', lat: 6.895, lng: 79.855 },
                        description: 'Discolored water.',
                        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
                    },
                    {
                        id: 'R345678',
                        type: 'no_supply',
                        priority: 'critical',
                        status: 'resolved',
                        location: { address: 'Dehiwala, Mount Lavinia', lat: 6.848, lng: 79.870 },
                        description: 'Entire block dry.',
                        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
                        resolvedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
                    },
                    {
                        id: 'R999888',
                        type: 'pipeline_leakage',
                        priority: 'low',
                        status: 'pending',
                        location: { address: 'Nugegoda, Colombo', lat: 6.868, lng: 79.897 },
                        description: 'Small drip from valve.',
                        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
                    }
                ]
            });
        }, 800);
    });
};

/**
 * Get all reports for the current user
 * @returns {Promise} Array of user's reports
 */
export const getUserReports = async () => {
    // Mock implementation
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                reports: [
                    {
                        id: 'R123456',
                        type: 'pipeline_leakage',
                        priority: 'high',
                        status: 'in_progress',
                        location: {
                            address: '123 Main St, Colombo 03',
                            lat: 6.915,
                            lng: 79.855
                        },
                        description: 'Major leak near the junction. Water is wasting rapidly.',
                        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
                    }
                ]
            });
        }, 500);
    });
};

/**
 * Get a single report by ID
 * @param {string} reportId - Report ID
 * @returns {Promise} Report details
 */
export const getReportById = async (reportId) => {
    // Mock implementation
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                report: null
            });
        }, 500);
    });
};
