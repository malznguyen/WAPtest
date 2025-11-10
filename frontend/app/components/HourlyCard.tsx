'use client';
import { useState, useEffect } from 'react';
import { getHourlyForecast } from '../services/weatherApi';
import { format } from 'date-fns';

export default function HourlyCard() {
  const [hourly, setHourly] = useState<any[]>([]);

  useEffect(() => {
    getHourlyForecast().then(setHourly);
  }, []);

  const getEmoji = (icon: string) => {
    if (icon.includes('rain')) return '🌧️';
    if (icon.includes('cloud')) return '☁️';
    if (icon.includes('sun')) return '☀️';
    return '🌤️';
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg col-span-2">
      <h3 className="text-lg font-semibold mb-4">Hourly Forecast</h3>
      <div className="flex gap-6 overflow-x-auto">
        {hourly.map((h, i) => (
          <div key={i} className="flex flex-col items-center min-w-[70px]">
            <p className="text-xs text-gray-500">
              {i === 0 ? 'Now' : format(new Date(h.time), 'HH:mm')}
            </p>
            <span className="text-3xl my-2">{getEmoji(h.icon)}</span>
            <p className="text-sm font-semibold">{Math.round(h.temperature)}°</p>
            <p className="text-xs text-blue-500">{h.precipitation}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
