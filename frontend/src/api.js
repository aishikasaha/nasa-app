import axios from 'axios';

export const generateDescription = async (prompt) => {
    try {
        const response = await axios.post('/generate-description', { prompt });
        return response.data.description;
    } catch (error) {
        console.error('Error generating description:', error);
        return null;
    }
};