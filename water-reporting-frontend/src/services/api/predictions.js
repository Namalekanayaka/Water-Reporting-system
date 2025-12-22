// API service for AI predictions endpoints
// WARNING: In a production app, never store API keys in frontend code.
// Ideally, call a backend endpoint (Firebase Cloud Function) which then calls Gemini.

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Analyze the report description using Gemini AI to determine severity.
 * @param {string} description 
 * @returns {Promise<Object>} { severity: 'low'|'medium'|'high'|'critical', explanation: string }
 */
export const analyzeReportSeverity = async (description) => {
    if (GEMINI_API_KEY === "YOUR_GEMINI_API_KEY") {
        console.warn("Gemini API Key is missing. Returning mock analysis.");
        return {
            severity: 'medium',
            explanation: 'AI analysis unavailable (Missing API Key). Defaulting to medium severity.'
        };
    }

    try {
        const prompt = `
        Analyze the following water infrastructure report description. 
        Determine the severity level (low, medium, high, or critical) based on the urgency and potential damage.
        Provide a short explanation (max 20 words).
        
        Description: "${description}"
        
        Return ONLY valid JSON in this format:
        { "severity": "level", "explanation": "reason" }
        `;

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });

        const data = await response.json();

        if (data.candidates && data.candidates[0].content) {
            const textResponse = data.candidates[0].content.parts[0].text;
            // specific cleanup for potential markdown formatting in JSON response
            const jsonText = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(jsonText);
        } else {
            throw new Error("Invalid response from Gemini");
        }

    } catch (error) {
        console.error("AI Analysis Failed:", error);
        return {
            severity: 'medium',
            explanation: 'AI analysis failed. Please assess manually.'
        };
    }
};

/**
 * Generate a system-wide forecast based on current report statistics.
 * @param {Object} stats - { severityCounts: {low, medium, high, critical}, totalReports }
 * @returns {Promise<Object>}
 */
export const generateSystemForecast = async (stats) => {
    if (GEMINI_API_KEY === "YOUR_GEMINI_API_KEY") { // Fallback if key not set
        return {
            stress: 'Medium',
            peak: '18:00',
            zone: 'Zone B',
            recommendation: 'Mock: Balance pressure valves in Sector 7.'
        };
    }

    try {
        const prompt = `
        You are an AI Water System Analyst.
        Current System Status:
        - Total Active Reports: ${stats.totalReports}
        - Severity Breakdown: ${JSON.stringify(stats.severityCounts)}
        
        Predict the following for the next 24 hours:
        1. Overall Water Stress Level (Low, Medium, High, Critical)
        2. Expected Peak Demand Time (e.g. "18:00")
        3. Most Vulnerable Zone (Invent a zone name e.g. "Zone 4-A")
        4. One short strategic recommendation (max 25 words).

        Return ONLY valid JSON: { "stress": "...", "peak": "...", "zone": "...", "recommendation": "..." }
        `;

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        const data = await response.json();
        if (data.candidates && data.candidates[0].content) {
            const text = data.candidates[0].content.parts[0].text;
            const jsonText = text.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(jsonText);
        }
        throw new Error("No candidate or invalid response");

    } catch (error) {
        console.error("Forecast Failed:", error);
        return {
            stress: 'High',
            peak: 'Unknown',
            zone: 'Check Logs',
            recommendation: 'AI connection failed. Monitor manually.'
        };
    }
};
