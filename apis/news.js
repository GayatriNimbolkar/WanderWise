// apis/news.js

import { GNEWS_API_KEY } from '../config.js';


export async function fetchNews(city) {
  const encodedCity = encodeURIComponent(city);
  const url = `https://gnews.io/api/v4/search?q=${encodedCity}&lang=en&token=${GNEWS_API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.articles || data.articles.length === 0) {
      return `<p>No news found for ${city}.</p>`;
    }

    const newsItems = data.articles.slice(0, 5).map(article => `
      <div class="news-item">
        <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
        <p>${article.description || ''}</p>
        <small>${new Date(article.publishedAt).toLocaleString()}</small>
      </div>
    `).join("");

    return `<div class="news-wrapper">${newsItems}</div>`;
  } catch (err) {
    console.error("News Fetch Error:", err);
    return `<p>Error fetching news for ${city}.</p>`;
  }
}
