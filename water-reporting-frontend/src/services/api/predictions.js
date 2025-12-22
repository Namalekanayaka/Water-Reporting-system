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
