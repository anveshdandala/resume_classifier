
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const fetchHealth = async () => {
    try {
        const response = await fetch(`${API_URL}/health`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch health error:', error);
        throw error;
    }
};

export const fetchResumeAnalysis = async (resumeData: FormData) => {
    try {
        const response = await fetch(`${API_URL}/resume/analyze`, {
            method: 'POST',
            body: resumeData,
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch resume analysis error:', error);
        throw error;
    }
}
