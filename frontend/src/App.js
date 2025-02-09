// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Explore from './Explore';
import Apod from './Apod';
import NeoWs from './NeoWs';
import MarsRoverPhotos from './MarsRoverPhotos';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/apod" element={<Apod />} />
                <Route path="/neows" element={<NeoWs />} />
                <Route path="/mars-rover-photos" element={<MarsRoverPhotos />} />
            </Routes>
        </Router>
    );
}

export default App;