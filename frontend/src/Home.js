// src/components/Home.js
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Create this CSS file for styling

const Home = () => {
    const navigate = useNavigate();

    const handleBeginClick = () => {
        navigate('/explore'); // Navigate to the explore page
    };

    return (
        <motion.div
            className="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <h1 className="title">NASA Space Data Explorer</h1>
            <motion.button
                className="begin-button"
                onClick={handleBeginClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                Let's Begin
            </motion.button>
        </motion.div>
    );
};

export default Home;