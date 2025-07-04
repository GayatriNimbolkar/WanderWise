
import { accessKey } from '../config.js';

export async function fetchCityImage(city) {
  
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(city)}&client_id=${accessKey}&orientation=landscape`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.results[0]?.urls?.regular || '';
  } catch (err) {
    console.error('Image fetch failed:', err);
    return '';
  }
}
