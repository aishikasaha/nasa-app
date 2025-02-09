// src/components/NeoWs.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Chart from 'chart.js/auto';
import './neo.css'; // Create this CSS file for styling

const NeoWs = () => {
    const [neos, setNeos] = useState({});
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchNeos = async () => {
            const response = await axios.get('/neows', {
                params: { start_date: '2023-10-01', end_date: '2023-10-07' },
            });
            setNeos(response.data);
        };

        fetchNeos();
    }, []);

    useEffect(() => {
        if (chartRef.current && Object.keys(neos).length > 0) {
            const labels = Object.keys(neos);
            const data = Object.values(neos).map((objects) => objects.length);

            const chart = new Chart(chartRef.current, {
                type: 'bar',
                data: {
                    labels,
                    datasets: [
                        {
                            label: 'Number of Near Earth Objects',
                            data,
                            backgroundColor: 'rgba(0, 255, 204, 0.2)',
                            borderColor: 'rgba(0, 255, 204, 1)',
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });

            return () => chart.destroy(); // Cleanup on unmount
        }
    }, [neos]);

    return (
        <motion.div
            className="neows"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <h1 className="neows-title">Near Earth Objects</h1>
            <canvas ref={chartRef} />
        </motion.div>
    );
};

export default NeoWs;