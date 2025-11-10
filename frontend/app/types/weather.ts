export interface CurrentWeather {
  temperature: number;
  feels_like: number;
  weather_text: string;
  wind_speed: number;
  wind_direction: string;
  humidity: number;
  uv_index: number;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  icon: string;
  precipitation: number;
}

export interface DailyForecast {
  date: string;
  temp_max: number;
  temp_min: number;
  icon: string;
  precipitation: number;
}

export interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
}
