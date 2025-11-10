'use client';

import { useEffect, useState } from 'react';
import { weatherService } from '@/services/weatherService';
import { CurrentWeather } from '@/types/weather';
import { getWeatherEmoji } from '@/utils/weatherIcons';

interface CurrentWeatherCardProps {
  city: string;
}

export default function CurrentWeatherCard({ city }: CurrentWeatherCardProps) {
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const data = await weatherService.getCurrentWeather(city);

      if (data) {
        setWeather(data);
      } else {
        setError('Failed to load');
      }

      setLoading(false);
    };

    fetchData();
  }, [city]);

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all">
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-sm">{error}</div>
      ) : weather ? (
        <div className="space-y-4">
          {/* Main Temperature */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-6xl font-bold text-gray-800">{Math.round(weather.temperature)}°C</div>
              <div className="text-xl text-gray-600 mt-2">{weather.weatherText}</div>
            </div>
            <div className="text-7xl">{getWeatherEmoji(weather.weatherIcon)}</div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div>
              <div className="text-xs text-gray-500">Humidity</div>
              <div className="text-lg font-semibold text-gray-800">{weather.humidity}%</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">UV Index</div>
              <div className="text-lg font-semibold text-gray-800">{weather.uvIndex} - {weather.uvIndexText}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Visibility</div>
              <div className="text-lg font-semibold text-gray-800">{weather.visibility} km</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Pressure</div>
              <div className="text-lg font-semibold text-gray-800">{Math.round(weather.pressure)} mb</div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
