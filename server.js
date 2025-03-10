require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
console.log("API Key:", process.env.WEATHERSTACK_API_KEY);
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'public')));

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: 'Por favor ingresa una ciudad.' });
      }
    const apiKey = process.env.WEATHERSTACK_API_KEY;
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener datos del clima' });
    }
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});