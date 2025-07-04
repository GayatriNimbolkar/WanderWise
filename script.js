
import { fetchCityImage } from './image.js';
import { setupWeatherCard } from './components/weatherCard.js'; 
import { fetchWeather } from '../apis/weather.js'; 
import { setupExchangeCard } from './components/exchangeCard.js';
const backToSearchBtn = document.getElementById("backToSearchBtn");
import { setupNewsCard } from './components/newsCard.js';




document.addEventListener("DOMContentLoaded", () => {
  const searchIcon = document.getElementById("searchIcon");
  const searchInput = document.getElementById("searchInput");
  const screen1 = document.getElementById("screen1");
  const screen2 = document.getElementById("screen2");
  const screen3 = document.getElementById("screen3");
  const screen4 = document.getElementById("screen4"); 
  const hero = document.getElementById("hero");
  const cityDisplay = document.getElementById("cityNameDisplay");
  const weatherCard = document.querySelectorAll(".card")[0];
  const exchangeCard = document.querySelectorAll(".card")[1];
  const backToSearchBtn = document.getElementById("backToSearchBtn");

  let currentCity = '';

  searchIcon.addEventListener("click", async () => {
    const city = searchInput.value.trim();
    if (!city) {
      alert("Please enter a location.");
      return;
    }

    currentCity = city;

    const imageUrl = await fetchCityImage(city);
    if (imageUrl) {
      document.body.style.backgroundImage = `url('${imageUrl}')`;
      hero.style.backgroundImage = `url('${imageUrl}')`;
    }

    cityDisplay.textContent = city;

    screen1.classList.add("hidden");
    screen2.classList.remove("hidden");
    screen3.classList.add("hidden");
  });

  setupWeatherCard({
    cardElement: weatherCard,
    getCity: () => currentCity,
    screen2,
    screen3
  });

  setupExchangeCard({
    cardElement: exchangeCard,
    getCity: () => currentCity,
    screen2,
    screen4
  });
const newsCardElement = document.getElementById("newsCard");
if (newsCardElement) {
  setupNewsCard({
    cardElement: newsCardElement,
    getCity: () => currentCity,
    screen2,
    screen5: document.getElementById("screen5"),
  });
}




  
  backToSearchBtn.addEventListener("click", () => {
 
  screen1.classList.remove("hidden");
  screen2.classList.add("hidden");
  screen3.classList.add("hidden");
  screen4.classList.add("hidden");

  
  document.body.style.backgroundImage = "url('./assets/image.png')";

  const hero = document.getElementById("hero");
  if (hero) {
    hero.style.backgroundImage = "url('./assets/image.png')";
  }

  document.getElementById("searchInput").value = "";
});

});
