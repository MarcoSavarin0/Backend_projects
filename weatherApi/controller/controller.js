import client from '../lib/redisClient.js';

export async function getWeather(req, res) {
    const { city } = req.query;
    try {
        const cachedData = await client.get(city);
        if (cachedData) {
            console.log('Datos obtenidos de la caché');
            return res.status(200).json(JSON.parse(cachedData));
        }
    } catch (error) {
        console.error('Error al obtener datos de la caché:', error);
    }

    let URLBASE = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=hours&key=${process.env.API_KEY}&contentType=json`

    try {
        const response = await fetch(URLBASE);
        const data = await response.json();
        const weather = data.days.map((day) => {
            return {
                date: day.datetime,
                temp: day.tempmax,
                description: day.conditions,
                humidity: day.humidity,
                wind: day.windspeed
            }
        });
        try {
            await client.setEx(city, 3600, JSON.stringify({ city: data.resolvedAddress, info: weather }));
        } catch (error) {
            console.error('Error al guardar datos en la caché:', error);
        }

        return res.status(200).json({ city: data.resolvedAddress, info: weather });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error en la petición del servicio.' });
    }
}