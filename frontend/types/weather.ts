// Weather data types

export interface CurrentWeather {
  temperature: number;
  temperatureF: number;
  feelsLike: number;
  feelsLikeF: number;
  weatherText: string;
  weatherIcon: number;
  humidity: number;
  wind: {
    speed: number;
    direction: number;
    directionText: string;
  };
  windGust: {
    speed: number;
  };
  uvIndex: number;
  uvIndexText: string;
  visibility: number;
  cloudCover: number;
  pressure: number;
  isDayTime: boolean;
}

export interface HourlyForecast {
  dateTime: string;
  temperature: number;
  temperatureF: number;
  weatherIcon: number;
  iconPhrase: string;
  precipitationProbability: number;
  rainProbability: number;
  snowProbability: number;
  wind: {
    speed: number;
    direction: number;
  };
}

export interface DailyForecast {
  date: string;
  temperatureMin: number;
  temperatureMax: number;
  temperatureMinF: number;
  temperatureMaxF: number;
  day: {
    icon: number;
    iconPhrase: string;
    precipitationProbability: number;
    rainProbability: number;
    snowProbability: number;
  };
  night: {
    icon: number;
    iconPhrase: string;
    precipitationProbability: number;
  };
}

export interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface WeatherAlert {
  alertId: string;
  type: string;
  severity: number;
  headline: string;
  category: string;
  priority: number;
  source: string;
  startTime: string;
  endTime: string;
}

export interface WeatherIndex {
  id: number;
  name: string;
  category: string;
  categoryValue: number;
  value: number;
  text: string;
  ascending: boolean;
}

export interface HistoricalWeather {
  dateTime: string;
  epochTime: number;
  temperature: number;
  temperatureF: number;
  weatherText: string;
  weatherIcon: number;
  humidity: number;
  wind: {
    speed: number;
    direction: number;
  };
  pressure: number;
  isDayTime: boolean;
}
