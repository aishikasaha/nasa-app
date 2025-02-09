import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const MarsRoverPhotos = () => {
    const [photos, setPhotos] = useState([]);
    const [earthDate, setEarthDate] = useState('2014-10-01');
    const [camera, setCamera] = useState('FHAZ');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
   

    const fetchPhotos = async () => {
       
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get('/mars-rover-photos', {
                params: { earth_date: earthDate, camera,api_key: process.env.NASA_API_KEY, },
            });
            setPhotos(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Mars Rover Photos</h1>
            <div>
                <label>Earth Date: </label>
                <input
                    type="date"
                    value={earthDate}
                    onChange={(e) => setEarthDate(e.target.value)}
                />
            </div>
            <div>
                <label>Camera: </label>
                <select value={camera} onChange={(e) => setCamera(e.target.value)}>
                    <option value="FHAZ">Front Hazard Avoidance Camera</option>
                    <option value="RHAZ">Rear Hazard Avoidance Camera</option>
                    <option value="MAST">Mast Camera</option>
                    <option value="CHEMCAM">Chemistry and Camera Complex</option>
                </select>
            </div>
            <button onClick={fetchPhotos} disabled={loading}>
                {loading ? 'Loading...' : 'Fetch Photos'}
            </button>
            {error && <div>Error: {error}</div>}
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {photos.map((photo) => (
                <motion.img
                    key={photo.id}
                    src={photo.img_src}
                    alt={`Mars Rover Photo ${photo.id}`}
                    style={{ width: '200px', margin: '10px' }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                />
            ))}
        </div>
        </div>
    );
};

export default MarsRoverPhotos;