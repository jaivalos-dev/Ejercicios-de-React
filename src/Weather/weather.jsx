// src/Weather.jsx
// Importamos `useState` de React para manejar los estados y `axios` para hacer peticiones HTTP.
import { useState } from 'react';
import axios from 'axios';

import './weather.css'; // Importamos el archivo CSS para los estilos.

const Weather = () => {
  // Definimos los estados iniciales:
  // `city` para almacenar el nombre de la ciudad que ingresa el usuario.
  const [city, setCity] = useState('');
  
  // `weatherData` para almacenar los datos obtenidos de la API del clima.
  const [weatherData, setWeatherData] = useState(null);
  
  // `error` para manejar cualquier error que ocurra durante la consulta a la API.
  const [error, setError] = useState('');

  // API_KEY: La clave API que obtenemos de OpenWeatherMap.
  const API_KEY = '12e21ef68c7b4664919d2cc63d974e72'; // Reemplaza con tu clave API.

  // Función asíncrona que realiza la petición a la API del clima usando `axios`.
  const fetchWeather = async () => {
    try {
      // Realizamos una petición GET a la API, usando la ciudad ingresada y la clave API.
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=metric&lang=es`
      );
      
      // Si la respuesta es exitosa, almacenamos los datos en `weatherData` y limpiamos cualquier error previo.
      setWeatherData(response.data);
      setError('');
    } catch (err) {
      // En caso de error, mostramos un mensaje al usuario y reiniciamos los datos del clima.
      setError(`Ciudad no encontrada: ${err}`);
      setWeatherData(null);
    }
  };

  // Función que maneja el envío del formulario y previene el comportamiento por defecto.
  const handleSubmit = (e) => {
    e.preventDefault(); // Evitamos que la página se recargue al enviar el formulario.
    fetchWeather(); // Llamamos a la función que consulta el clima.
  };

  return (
    <div>
        {/* Título de la aplicación */}
        <h2>Weather App</h2>
        
        {/* Formulario para ingresar la ciudad */}
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={city} // Vinculamos el valor del input al estado `city`.
                onChange={(e) => setCity(e.target.value)} // Actualizamos el estado `city` al cambiar el valor.
                placeholder="Ingrese una ciudad" // Placeholder para el input.
            />
            <button type="submit">Obtener clima</button> {/* Botón para enviar el formulario */}
        </form>

        {/* Si hay algún error, lo mostramos en un párrafo */}
        {error && <p>{error}</p>}
        
        {/* Si los datos del clima están disponibles, los mostramos */}
        {weatherData && (
            <div>
                {/* Información básica del clima en la ciudad consultada */}
                <h2>Clima en {weatherData.name}, {weatherData.sys.country}</h2>
                <p>Temperatura: {weatherData.main.temp} °C</p>
                <p>Condición: {weatherData.weather[0].description}</p>
                <p>Humedad: {weatherData.main.humidity} %</p>
                <p>Velocidad del viento: {weatherData.wind.speed} m/s</p>
                <p>Presión: {weatherData.main.pressure} hPa</p>
            </div>
        )}
    </div>
  );
};

export default Weather;
