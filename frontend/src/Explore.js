// src/components/Explore.js
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Explore.css'; // Create this CSS file for styling

const Explore = () => {
    const navigate = useNavigate();

    const handleButtonClick = (path) => {
        navigate(path); // Navigate to the selected page
    };

    return (
        <motion.div
            className="explore"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <h1 className="explore-title">Explore the Universe</h1>
            <div className="button-container">
                <motion.button
                    className="explore-button"
                    onClick={() => handleButtonClick('/apod')}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    Astronomy Picture of the Day
                </motion.button>
                <motion.button
                    className="explore-button"
                    onClick={() => handleButtonClick('/neows')}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    Near Earth Objects
                </motion.button>
                <motion.button
                    className="explore-button"
                    onClick={() => handleButtonClick('/mars-rover-photos')}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    Mars Rover Photos
                </motion.button>
            </div>
        </motion.div>
    );
};

export default Explore;