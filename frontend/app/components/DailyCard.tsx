'use client';
import { useState, useEffect } from 'react';
import { getDailyForecast } from '../services/weatherApi';
import { format } from 'date-fns';

export default function DailyCard() {
  const [daily, setDaily] = useState<any[]>([]);

  useEffect(() => {
    getDailyForecast().then(setDaily);
  }, []);

  const getEmoji = (icon: string) => {
    if (icon.includes('rain')) return '🌧️';
    if (icon.includes('cloud')) return '☁️';
    if (icon.includes('sun')) return '☀️';
    return '🌤️';
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg col-span-2">
      <h3 className="text-lg font-semibold mb-4">7 Days Forecast</h3>
      <div className="space-y-3">
        {daily.map((d, i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <p className="text-sm w-24">{format(new Date(d.date), 'EEE, MMM d')}</p>
              <span className="text-2xl">{getEmoji(d.icon)}</span>
              <p className="text-sm text-gray-600">{d.icon}</p>
            </div>
            <div className="flex gap-4 items-center">
              <p className="text-sm font-medium">
                {Math.round(d.temp_max)}° / {Math.round(d.temp_min)}°
              </p>
              <p className="text-sm text-blue-500">{d.precipitation}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
