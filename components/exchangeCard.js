
import { fetchExchangeRateFromCity } from '../apis/exchange.js';

export function setupExchangeCard({ cardElement, getCity, screen2, screen4 }) {
  const exchangeDetails = document.getElementById("exchangeDetails");
  const backButton = document.getElementById("backButtonExchange");

  cardElement.addEventListener("click", async () => {
    screen2.classList.add("hidden");
    screen4.classList.remove("hidden");

    const city = getCity();
    exchangeDetails.innerHTML = "Loading...";

    const data = await fetchExchangeRateFromCity(city);
    if (data) {
      exchangeDetails.innerHTML = `
        <div class="card" style="flex-direction: column;">
          <h2>💱 Exchange Rate</h2>
          <p>City: ${data.city}</p>
          <p>Country: ${data.country}</p>
          <p>Currency: ${data.currency}</p>
          <p>USD → ${data.currency}: <strong>${data.rate}</strong></p>
        </div>
      `;
    } else {
      exchangeDetails.innerHTML = `<p style="color:red;">Could not fetch exchange rate.</p>`;
    }
  });

  backButton.addEventListener("click", () => {
    screen4.classList.add("hidden");
    screen2.classList.remove("hidden");
  });
}
