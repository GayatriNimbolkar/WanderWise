

import { fetchWeather } from '../apis/weather.js';

export function renderWeatherCard(data) {
  const container = document.getElementById('weatherResult');
  container.innerHTML = `
    <div class="card" style="flex-direction: column;">
      <h2>${data.city}</h2>
      <img src="${data.icon}" alt="weather icon" />
      <p>${data.description}</p>
      <p>Temp: ${data.temp}</p>
      <p>Humidity: ${data.humidity}</p>
      <p>Wind: ${data.wind}</p>
    </div>
  `;
}

export function setupWeatherCard({ cardElement, getCity, screen2, screen3 }) {
  const weatherDetails = document.getElementById("weatherDetails");
  const backButton = document.getElementById("backButton");

  cardElement.addEventListener("click", async () => {
    screen2.classList.add("hidden");
    screen3.classList.remove("hidden");

    weatherDetails.innerHTML = "Loading...";
    const city = getCity();
    const weatherText = await fetchWeather(city);
    weatherDetails.innerHTML = weatherText;
  });

  backButton.addEventListener("click", () => {
    screen3.classList.add("hidden");
    screen2.classList.remove("hidden");
  });
}
