'use client';

import { useEffect, useState } from 'react';
import { weatherService } from '@/services/weatherService';
import { DailyForecast } from '@/types/weather';
import { getWeatherEmoji } from '@/utils/weatherIcons';

interface DailyForecastCardProps {
  city: string;
}

export default function DailyForecastCard({ city }: DailyForecastCardProps) {
  const [dailyData, setDailyData] = useState<DailyForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const data = await weatherService.getDailyForecast(city, 5);

      if (data) {
        setDailyData(data);
      } else {
        setError('Failed to load');
      }

      setLoading(false);
    };

    fetchData();
  }, [city]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all">
      <div className="text-sm text-gray-500 font-medium mb-4">7-DAY FORECAST</div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-sm">{error}</div>
      ) : (
        <div className="space-y-3">
          {dailyData.map((day, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0"
            >
              {/* Date */}
              <div className="flex-1 text-sm font-medium text-gray-700 min-w-[120px]">
                {formatDate(day.date)}
              </div>

              {/* Weather Icon */}
              <div className="flex-1 flex justify-center">
                <span className="text-3xl">{getWeatherEmoji(day.day.icon)}</span>
              </div>

              {/* Temperature Range */}
              <div className="flex-1 flex items-center justify-end gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">↑</span>
                  <span className="text-lg font-bold text-gray-800">{Math.round(day.temperatureMax)}°</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">↓</span>
                  <span className="text-lg font-semibold text-gray-600">{Math.round(day.temperatureMin)}°</span>
                </div>
              </div>

              {/* Precipitation */}
              {day.day.precipitationProbability > 0 && (
                <div className="flex-1 flex justify-end">
                  <span className="text-sm text-blue-500 min-w-[50px] text-right">
                    💧 {day.day.precipitationProbability}%
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
