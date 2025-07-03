// components/newsCard.js
import { fetchNews } from '../apis/news.js';

export function setupNewsCard({ cardElement, getCity, screen2, screen5 }) {
  const newsDetails = document.getElementById("newsDetails");
  const backButton = document.getElementById("backButtonNews");
cardElement.addEventListener("click", async () => {
  screen2.classList.add("hidden");
  screen5.classList.remove("hidden");

  const city = getCity();
  newsDetails.innerHTML = "Loading latest news...";
  const newsHTML = await fetchNews(city);
  newsDetails.innerHTML = newsHTML;
});


  backButton.addEventListener("click", () => {
    screen5.classList.add("hidden");
    screen2.classList.remove("hidden");
  });
}
