'use client';

import { useEffect, useState } from 'react';
import { weatherService } from '@/services/weatherService';
import { HourlyForecast } from '@/types/weather';
import { getWeatherIcon } from '@/utils/weatherIcons';
import { HourlyForecastSkeleton } from './LoadingSkeleton';
import { Droplets } from 'lucide-react';

interface HourlyForecastCardProps {
  city: string;
}

export default function HourlyForecastCard({ city }: HourlyForecastCardProps) {
  const [hourlyData, setHourlyData] = useState<HourlyForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
    <>
      {loading ? (
        <HourlyForecastSkeleton />
      ) : error ? (
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20">
          <div className="text-red-500 text-sm">{error}</div>
        </div>
      ) : (
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 card-hover fade-in">
          <div className="text-sm text-gray-500 font-semibold mb-4 tracking-wider">HOURLY FORECAST</div>

          <div className="space-y-4">
            {/* Hourly Items */}
            <div className="relative">
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
                {hourlyData.map((hour, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center gap-2 min-w-[80px] p-3 rounded-2xl transition-all duration-300 cursor-pointer snap-center ${
                    hoveredIndex === index ? 'bg-blue-50 scale-105 shadow-md' : 'hover:bg-gray-50'
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="text-xs text-gray-500 font-semibold">{formatTime(hour.dateTime)}</div>
                  <div className="text-blue-500 transition-transform duration-300" style={{ transform: hoveredIndex === index ? 'scale(1.2)' : 'scale(1)' }}>
                    {getWeatherIcon(hour.weatherIcon, 32)}
                  </div>
                  <div className="text-lg font-bold text-gray-800">{Math.round(hour.temperature)}°</div>
                  {hour.precipitationProbability > 0 && (
                    <div className="flex items-center gap-1 text-xs text-blue-600 font-semibold">
                      <Droplets className="w-3 h-3" />
                      {hour.precipitationProbability}%
                    </div>
                  )}
                </div>
              ))}
              </div>
              {/* Scroll indicator for mobile */}
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white/70 to-transparent pointer-events-none md:hidden" />
            </div>

            {/* Temperature Chart */}
            <div className="relative h-24 mt-4 bg-gradient-to-b from-blue-50/30 to-transparent rounded-xl p-2">
              <svg className="w-full h-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
                {/* Grid lines */}
                <line x1="0" y1="25" x2="1000" y2="25" stroke="#e5e7eb" strokeWidth="0.5" opacity="0.5" />
                <line x1="0" y1="50" x2="1000" y2="50" stroke="#e5e7eb" strokeWidth="0.5" opacity="0.5" />
                <line x1="0" y1="75" x2="1000" y2="75" stroke="#e5e7eb" strokeWidth="0.5" opacity="0.5" />

                {/* Gradient for area under line */}
                <defs>
                  <linearGradient id="tempGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {/* Area under line */}
                <polygon
                  points={`0,100 ${hourlyData.map((hour, index) => {
                    const x = (index / (hourlyData.length - 1)) * 1000;
                    const y = getYPosition(hour.temperature);
                    return `${x},${y}`;
                  }).join(' ')} 1000,100`}
                  fill="url(#tempGradient)"
                />

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
                      r={hoveredIndex === index ? "6" : "4"}
                      fill="#3b82f6"
                      stroke="white"
                      strokeWidth="2"
                      className="transition-all duration-200 cursor-pointer"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    />
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
