
import { API_KEY } from '../config.js';


export async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    return `
      <div class="card" style="flex-direction: column;">
        <h2>${data.name}</h2>
        <img src="${icon}" alt="${data.weather[0].description}" />
        <p>${data.weather[0].description}</p>
        <p>🌡️ Temp: ${data.main.temp}°C</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬️ Wind: ${data.wind.speed} m/s</p>
      </div>
    `;
  } catch (err) {
    console.error('Weather API Error:', err);
    return `<div style="color: red;">Failed to fetch weather. Please check city or API key.</div>`;
  }
}
