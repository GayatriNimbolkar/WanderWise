async function getCountryCodeFromCity(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`;
  const res = await fetch(url);
  const data = await res.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("City not found");
  }

  return {
    countryCode: data.results[0].country_code,
    countryName: data.results[0].country
  };
}

async function getCurrencyCode(countryCode) {
  const url = `https://restcountries.com/v3.1/alpha/${countryCode}`;
  const res = await fetch(url);
  const data = await res.json();

  const currencies = data[0]?.currencies;
  if (!currencies) throw new Error("No currency found");

  return Object.keys(currencies)[0]; // e.g., "INR"
}

export async function getExchangeRate(baseCurrency = 'USD', targetCurrency = 'INR') {

  if (baseCurrency === targetCurrency) {
    console.log(" Same currency selected. Using 1:1 rate.");
    return 1;
  }

  const url = `https://api.frankfurter.app/latest?from=${baseCurrency}&to=${targetCurrency}`;
  console.log("🔗 Fetching exchange rate:", url);

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("Exchange response:", data);

    if (!data.rates || !data.rates[targetCurrency]) {
      throw new Error("Exchange rate not found");
    }

    return data.rates[targetCurrency];
  } catch (err) {
    console.error("Exchange Rate Fetch Error:", err);
    throw err;
  }
}

export async function fetchExchangeRateFromCity(city) {
  try {
    const { countryCode, countryName } = await getCountryCodeFromCity(city);
    console.log(" Country:", countryCode, countryName);

    const currency = await getCurrencyCode(countryCode);
    console.log("💱 Currency:", currency);

    const rate = await getExchangeRate('USD', currency);
    console.log(` Exchange Rate USD → ${currency}: ${rate}`);

    return {
      city,
      country: countryName,
      currency,
      rate
    };
  } catch (err) {
    console.error("Exchange Rate Fetch Error:", err);
    return null;
  }
}
