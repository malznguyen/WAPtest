'use client';

import { useEffect, useState } from 'react';
import { weatherService } from '@/services/weatherService';
import { CurrentWeather } from '@/types/weather';
import { getWeatherIcon } from '@/utils/weatherIcons';
import { WeatherCardSkeleton } from './LoadingSkeleton';
import { Droplets, Eye, Gauge } from 'lucide-react';

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
    <>
      {loading ? (
        <WeatherCardSkeleton />
      ) : error ? (
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
          <div className="text-center space-y-4">
            <div className="text-red-500 text-sm">{error}</div>
            <button
              onClick={() => {
                setLoading(true);
                setError(null);
                weatherService.getCurrentWeather(city).then(data => {
                  if (data) {
                    setWeather(data);
                  } else {
                    setError('Failed to load weather data. Please try again.');
                  }
                  setLoading(false);
                });
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all text-sm font-semibold shadow-md hover:shadow-lg"
            >
              Retry
            </button>
          </div>
        </div>
      ) : weather ? (
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 card-hover fade-in">
          <div className="space-y-4">
            {/* Main Temperature */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-blue-400">
                    {Math.round(weather.temperature)}
                  </div>
                  <div className="text-5xl font-medium text-blue-400 mb-2">°C</div>
                </div>
                <div className="text-xl text-gray-600 mt-2 font-medium">{weather.weatherText}</div>
              </div>
              <div className="text-blue-500 float-slow">
                {getWeatherIcon(weather.weatherIcon, 96)}
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/50 hover:bg-blue-50 transition-colors">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Droplets className="w-5 h-5 text-blue-600" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium">Humidity</div>
                  <div className="text-lg font-bold text-gray-800">{weather.humidity}%</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/50 hover:bg-amber-50 transition-colors">
                <div className="p-2 rounded-lg bg-amber-100">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="5" strokeWidth="2" />
                    <path strokeLinecap="round" strokeWidth="2" d="M12 1v6M12 17v6M23 12h-6M7 12H1M19.07 4.93l-4.24 4.24M9.17 14.83l-4.24 4.24M19.07 19.07l-4.24-4.24M9.17 9.17L4.93 4.93" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium">UV Index</div>
                  <div className="text-lg font-bold text-gray-800">{weather.uvIndex}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-sky-50/50 hover:bg-sky-50 transition-colors">
                <div className="p-2 rounded-lg bg-sky-100">
                  <Eye className="w-5 h-5 text-sky-600" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium">Visibility</div>
                  <div className="text-lg font-bold text-gray-800">{weather.visibility} km</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-50/50 hover:bg-purple-50 transition-colors">
                <div className="p-2 rounded-lg bg-purple-100">
                  <Gauge className="w-5 h-5 text-purple-600" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium">Pressure</div>
                  <div className="text-lg font-bold text-gray-800">{Math.round(weather.pressure)} mb</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
