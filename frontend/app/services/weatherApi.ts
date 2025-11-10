const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function getCurrentWeather(city = 'Hanoi') {
  const res = await fetch(`${API}/api/weather/current?city=${city}`);
  const data = await res.json();
  return data.data;
}

export async function getHourlyForecast(city = 'Hanoi') {
  const res = await fetch(`${API}/api/weather/hourly?city=${city}`);
  const data = await res.json();
  return data.data;
}

export async function getDailyForecast(city = 'Hanoi') {
  const res = await fetch(`${API}/api/weather/daily?city=${city}`);
  const data = await res.json();
  return data.data;
}
