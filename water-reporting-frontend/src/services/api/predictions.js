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
    // Check if key is missing or is the placeholder
    if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY") {
        console.warn("Gemini API Key is missing. Returning mock analysis.");

        // Simple keyword-based mock analysis
        const descLower = description.toLowerCase();
        let severity = 'low';
        let explanation = 'Routine issue detected based on keywords.';

        if (descLower.includes('burst') || descLower.includes('flood') || descLower.includes('dangerous') || descLower.includes('massive')) {
            severity = 'critical';
            explanation = 'Critical keywords detected (burst/flood/dangerous). Immediate attention required.';
        } else if (descLower.includes('leak') || descLower.includes('broken') || descLower.includes('urgent') || descLower.includes('no supply')) {
            severity = 'high';
            explanation = 'High priority keywords detected (leak/broken/urgent).';
        } else if (descLower.includes('pressure') || descLower.includes('quality') || descLower.includes('dirty')) {
            severity = 'medium';
            explanation = 'Medium priority issue detected relating to quality or pressure.';
        }

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        return {
            severity,
            explanation: `[AI MOCK] ${explanation}`
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

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

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
    if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY") { // Fallback if key not set
        console.warn("Gemini API Key is missing. Using statistical forecast.");

        await new Promise(resolve => setTimeout(resolve, 2000));

        // Logic to generate a "fake" but realistic forecast based on stats
        const criticalCount = stats.severityCounts.critical || 0;
        const highCount = stats.severityCounts.high || 0;
        const total = stats.totalReports || 1;

        let stress = 'Low';
        let recommendation = 'Routine maintenance recommended.';
        let peak = '18:00'; // Default peak time

        if (criticalCount > 0 || (highCount / total) > 0.3) {
            stress = 'Critical';
            recommendation = 'Immediate deployment of emergency teams required.';
        } else if ((highCount + criticalCount) > 5) {
            stress = 'High';
            recommendation = 'Monitor pressure levels in high-density zones.';
        } else if (total > 20) {
            stress = 'Medium';
            recommendation = 'Schedule preventive checks for older infrastructure.';
        }

        // Randomize the zone slightly
        const zones = ['Zone A', 'Zone B', 'Central District', 'North Sector'];
        const randomZone = zones[Math.floor(Math.random() * zones.length)];

        return {
            stress,
            peak,
            zone: randomZone,
            recommendation: `[AI MOCK] ${recommendation}`
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

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

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
