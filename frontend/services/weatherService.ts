import { CurrentWeather, HourlyForecast, DailyForecast, WeatherAlert, WeatherIndex, HistoricalWeather, ApiResponse } from '@/types/weather';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const weatherService = {
  async getCurrentWeather(city: string = 'Hanoi'): Promise<CurrentWeather | null> {
    try {
      const response = await fetch(`${API_URL}/api/weather/current?city=${encodeURIComponent(city)}`);
      const result: ApiResponse<CurrentWeather> = await response.json();

      if (result.success && result.data) {
        return result.data;
      }

      console.error('Failed to fetch current weather:', result.error);
      return null;
    } catch (error) {
      console.error('Error fetching current weather:', error);
      return null;
    }
  },

  async getHourlyForecast(city: string = 'Hanoi', hours: number = 12): Promise<HourlyForecast[] | null> {
    try {
      const response = await fetch(`${API_URL}/api/weather/hourly?city=${encodeURIComponent(city)}&hours=${hours}`);
      const result: ApiResponse<HourlyForecast[]> = await response.json();

      if (result.success && result.data) {
        return result.data;
      }

      console.error('Failed to fetch hourly forecast:', result.error);
      return null;
    } catch (error) {
      console.error('Error fetching hourly forecast:', error);
      return null;
    }
  },

  async getDailyForecast(city: string = 'Hanoi', days: number = 5): Promise<DailyForecast[] | null> {
    try {
      const response = await fetch(`${API_URL}/api/weather/daily?city=${encodeURIComponent(city)}&days=${days}`);
      const result: ApiResponse<DailyForecast[]> = await response.json();

      if (result.success && result.data) {
        return result.data;
      }

      console.error('Failed to fetch daily forecast:', result.error);
      return null;
    } catch (error) {
      console.error('Error fetching daily forecast:', error);
      return null;
    }
  },

  async getWeatherAlerts(city: string = 'Hanoi'): Promise<WeatherAlert[] | null> {
    try {
      const response = await fetch(`${API_URL}/api/weather/alerts?city=${encodeURIComponent(city)}`);
      const result: ApiResponse<WeatherAlert[]> = await response.json();

      if (result.success && result.data) {
        return result.data;
      }

      console.error('Failed to fetch weather alerts:', result.error);
      return null;
    } catch (error) {
      console.error('Error fetching weather alerts:', error);
      return null;
    }
  },

  async getWeatherIndices(city: string = 'Hanoi', days: number = 1): Promise<WeatherIndex[] | null> {
    try {
      const response = await fetch(`${API_URL}/api/weather/indices?city=${encodeURIComponent(city)}&days=${days}`);
      const result: ApiResponse<WeatherIndex[]> = await response.json();

      if (result.success && result.data) {
        return result.data;
      }

      console.error('Failed to fetch weather indices:', result.error);
      return null;
    } catch (error) {
      console.error('Error fetching weather indices:', error);
      return null;
    }
  },

  async getExtendedForecast(city: string = 'Hanoi', days: number = 15): Promise<DailyForecast[] | null> {
    try {
      const response = await fetch(`${API_URL}/api/weather/extended?city=${encodeURIComponent(city)}&days=${days}`);
      const result: ApiResponse<DailyForecast[]> = await response.json();

      if (result.success && result.data) {
        return result.data;
      }

      console.error('Failed to fetch extended forecast:', result.error);
      return null;
    } catch (error) {
      console.error('Error fetching extended forecast:', error);
      return null;
    }
  },

  async getHistoricalWeather(city: string = 'Hanoi', hours: number = 24): Promise<HistoricalWeather[] | null> {
    try {
      const response = await fetch(`${API_URL}/api/weather/historical?city=${encodeURIComponent(city)}&hours=${hours}`);
      const result: ApiResponse<HistoricalWeather[]> = await response.json();

      if (result.success && result.data) {
        return result.data;
      }

      console.error('Failed to fetch historical weather:', result.error);
      return null;
    } catch (error) {
      console.error('Error fetching historical weather:', error);
      return null;
    }
  }
};
