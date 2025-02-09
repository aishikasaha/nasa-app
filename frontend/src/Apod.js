// src/components/Apod.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './apod.css'; // Create this CSS file for styling

const Apod = () => {
    const [apodData, setApodData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [description, setDescription] = useState('');
 

    useEffect(() => {
        const fetchApod = async () => {
            try {
                const response = await axios.get('/apod');
                setApodData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchApod();
    }, []);

    // Function to generate a description using OpenAI
 const generateDescription = async (prompt) => {
    try {
        const response = await axios.post('/generate-description', { prompt });
        return response.data.description;
    } catch (error) {
        console.error('Error generating description:', error);
        return null;
    }
};

// Handler for generating a description
const handleGenerateDescription = async () => {
    if (apodData) {
        const prompt = `Title: ${apodData.title}, Explanation: ${apodData.explanation}`;
        const generatedDescription = await generateDescription(prompt);
        setDescription(generatedDescription);
    }
};

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;

    return (
        <motion.div
            className="apod"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <h1 className="apod-title">{apodData.title}</h1>
            <motion.img
                src={apodData.url}
                alt={apodData.title}
                className="apod-image"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1 }}
            />
            <p className="apod-explanation">{apodData.explanation}</p>
            <button onClick={handleGenerateDescription}>Generate Creative Description</button>
            {description && (
                <div>
                    <h2>AI-Generated Description</h2>
                    <p>{description}</p>
                </div>
            )}
        
        </motion.div>
    );
};

export default Apod;