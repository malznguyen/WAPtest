'use client';

import { useEffect, useState } from 'react';
import { weatherService } from '@/services/weatherService';
import { DailyForecast } from '@/types/weather';
import { getWeatherIcon } from '@/utils/weatherIcons';
import { WeatherCardSkeleton } from './LoadingSkeleton';
import { ArrowUp, ArrowDown, Droplets, Calendar } from 'lucide-react';

interface ExtendedForecastCardProps {
  city: string;
}

export default function ExtendedForecastCard({ city }: ExtendedForecastCardProps) {
  const [dailyData, setDailyData] = useState<DailyForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const data = await weatherService.getExtendedForecast(city, 15);

      if (data) {
        setDailyData(data);
      } else {
        setError('Failed to load extended forecast');
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
    <>
      {loading ? (
        <WeatherCardSkeleton />
      ) : error ? (
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
          <div className="text-red-500 text-sm">{error}</div>
        </div>
      ) : (
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 card-hover fade-in h-full">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5 text-purple-500" strokeWidth={2} />
            <h3 className="text-xl font-bold text-gray-800">15-Day Extended Forecast</h3>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto scrollbar-hide pr-2">
            {dailyData.map((day, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-purple-50/50 transition-all duration-200 border border-white/30 bg-white/30 backdrop-blur-sm"
              >
                {/* Date */}
                <div className="flex-1 text-sm font-semibold text-gray-700 min-w-[120px]">
                  {formatDate(day.date)}
                </div>

                {/* Weather Icon */}
                <div className="flex-1 flex justify-center">
                  <div className="text-purple-500 transition-transform duration-200 hover:scale-110">
                    {getWeatherIcon(day.day.icon, 28)}
                  </div>
                </div>

                {/* Temperature Range */}
                <div className="flex-1 flex items-center justify-end gap-2">
                  <div className="flex items-center gap-1.5 bg-red-50 px-2 py-1 rounded-lg">
                    <ArrowUp className="w-3 h-3 text-red-500" strokeWidth={2.5} />
                    <span className="text-sm font-bold text-gray-800">{Math.round(day.temperatureMax)}°</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-blue-50 px-2 py-1 rounded-lg">
                    <ArrowDown className="w-3 h-3 text-blue-500" strokeWidth={2.5} />
                    <span className="text-sm font-semibold text-gray-600">{Math.round(day.temperatureMin)}°</span>
                  </div>
                </div>

                {/* Precipitation */}
                {day.day.precipitationProbability > 0 && (
                  <div className="flex-1 flex justify-end ml-2">
                    <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-lg">
                      <Droplets className="w-3 h-3 text-blue-500" />
                      <span className="text-xs text-blue-600 font-semibold min-w-[30px] text-right">
                        {day.day.precipitationProbability}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
