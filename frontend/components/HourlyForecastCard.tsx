'use client';

import { useEffect, useState } from 'react';
import { weatherService } from '@/services/weatherService';
import { HourlyForecast } from '@/types/weather';
import { getWeatherEmoji } from '@/utils/weatherIcons';

interface HourlyForecastCardProps {
  city: string;
}

export default function HourlyForecastCard({ city }: HourlyForecastCardProps) {
  const [hourlyData, setHourlyData] = useState<HourlyForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const data = await weatherService.getHourlyForecast(city, 12);

      if (data) {
        setHourlyData(data);
      } else {
        setError('Failed to load');
      }

      setLoading(false);
    };

    fetchData();
  }, [city]);

  const formatTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
  };

  // Calculate chart dimensions
  const maxTemp = hourlyData.length > 0 ? Math.max(...hourlyData.map(h => h.temperature)) : 30;
  const minTemp = hourlyData.length > 0 ? Math.min(...hourlyData.map(h => h.temperature)) : 10;
  const tempRange = maxTemp - minTemp || 10;

  const getYPosition = (temp: number) => {
    return ((maxTemp - temp) / tempRange) * 80 + 10;
  };

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all">
      <div className="text-sm text-gray-500 font-medium mb-4">HOURLY FORECAST</div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-sm">{error}</div>
      ) : (
        <div className="space-y-4">
          {/* Hourly Items */}
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {hourlyData.map((hour, index) => (
              <div key={index} className="flex flex-col items-center gap-2 min-w-[70px]">
                <div className="text-xs text-gray-500 font-medium">{formatTime(hour.dateTime)}</div>
                <div className="text-2xl">{getWeatherEmoji(hour.weatherIcon)}</div>
                <div className="text-lg font-bold text-gray-800">{Math.round(hour.temperature)}°</div>
                {hour.precipitationProbability > 0 && (
                  <div className="text-xs text-blue-500">{hour.precipitationProbability}%</div>
                )}
              </div>
            ))}
          </div>

          {/* Temperature Chart */}
          <div className="relative h-24 mt-4">
            <svg className="w-full h-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
              {/* Grid lines */}
              <line x1="0" y1="25" x2="1000" y2="25" stroke="#e5e7eb" strokeWidth="0.5" />
              <line x1="0" y1="50" x2="1000" y2="50" stroke="#e5e7eb" strokeWidth="0.5" />
              <line x1="0" y1="75" x2="1000" y2="75" stroke="#e5e7eb" strokeWidth="0.5" />

              {/* Temperature line */}
              <polyline
                points={hourlyData.map((hour, index) => {
                  const x = (index / (hourlyData.length - 1)) * 1000;
                  const y = getYPosition(hour.temperature);
                  return `${x},${y}`;
                }).join(' ')}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {hourlyData.map((hour, index) => {
                const x = (index / (hourlyData.length - 1)) * 1000;
                const y = getYPosition(hour.temperature);
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#3b82f6"
                    stroke="white"
                    strokeWidth="2"
                  />
                );
              })}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
