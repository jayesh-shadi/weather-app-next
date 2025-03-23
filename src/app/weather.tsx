'use client'
import { useState } from "react";

type WeatherData = {
  name: string;
  weather: { description: string }[];
  main: { temp: number; humidity: number };
};

export default function WeatherApp() {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = "bd5e378503939ddaee76f12ad7a97608";

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) throw new Error("City not found");
      const data: WeatherData = await response.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setWeather(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 text-white p-4">
      <h1 className="text-4xl font-bold mb-6">Weather App</h1>
      <div className="flex space-x-3 mb-6 w-full max-w-md">
        <input
          type="text"
          className="flex-1 p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-500 transition"
          onClick={fetchWeather}
        >
          Get Weather
        </button>
      </div>
      {error && <p className="text-red-500 text-lg font-semibold">{error}</p>}
      {weather && (
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-full max-w-md">
          <h2 className="text-3xl font-semibold text-gray-900">{weather.name}</h2>
          <p className="text-lg text-gray-700 capitalize">{weather.weather[0].description}</p>
          <p className="text-5xl font-bold text-blue-600 mt-2">{weather.main.temp}°C</p>
          <p className="text-lg text-gray-500 mt-1">Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}