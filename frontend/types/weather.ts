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
