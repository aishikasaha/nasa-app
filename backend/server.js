
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Example route to fetch APOD data
app.get('/apod', async (req, res) => {
    try {
        const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from NASA API' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const {  OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
  });


  app.post('/generate-description', async (req, res) => {
    const prompt = "Title: A Beautiful Galaxy, Explanation: This galaxy is located millions of light-years away.";
    try {
        const response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
              model: "davinci-002",
              prompt: "Generate a short description for a NASA project.",
              max_tokens: 100,
            }),
          });
          const data = await response.json();
          console.log(data);
    } catch (error) {
        console.error('OpenAI API error:', error.message);
        res.status(500).json({ error: 'Failed to generate description' });
    }
});

app.get('/mars-rover-photos', async (req, res) => {
    const { earth_date, camera } = req.query;

    try {
        const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos`, {
            params: {
                earth_date,
                camera,
                api_key: process.env.NASA_API_KEY,
            },
        });

        res.json(response.data.photos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Mars Rover photos' });
    }
});
app.get('/neows', async (req, res) => {
    const { start_date, end_date } = req.query;

    try {
        const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/feed`, {
            params: {
                start_date,
                end_date,
                api_key: process.env.NASA_API_KEY,
            },
        });

        res.json(response.data.near_earth_objects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch NEO data' });
    }
});