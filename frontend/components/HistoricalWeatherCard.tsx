'use client';

import { useEffect, useState } from 'react';
import { weatherService } from '@/services/weatherService';
import { HistoricalWeather } from '@/types/weather';
import { getWeatherIcon } from '@/utils/weatherIcons';
import { LargeCardSkeleton } from './LoadingSkeleton';
import { History, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface HistoricalWeatherCardProps {
  city: string;
}

export default function HistoricalWeatherCard({ city }: HistoricalWeatherCardProps) {
  const [historicalData, setHistoricalData] = useState<HistoricalWeather[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const data = await weatherService.getHistoricalWeather(city, 24);

      if (data) {
        setHistoricalData(data.slice(0, 12)); // Show last 12 hours for better readability
      } else {
        setError('Failed to load historical data');
      }

      setLoading(false);
    };

    fetchData();
  }, [city]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const getTempTrend = (index: number) => {
    if (index === 0 || index >= historicalData.length - 1) return null;
    const current = historicalData[index].temperature;
    const previous = historicalData[index + 1].temperature;
    const diff = current - previous;

    if (diff > 0.5) return <TrendingUp className="w-3 h-3 text-red-500" />;
    if (diff < -0.5) return <TrendingDown className="w-3 h-3 text-blue-500" />;
    return <Minus className="w-3 h-3 text-gray-400" />;
  };

  return (
    <>
      {loading ? (
        <LargeCardSkeleton />
      ) : error ? (
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
          <div className="text-red-500 text-sm">{error}</div>
        </div>
      ) : (
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 card-hover fade-in h-full">
          <div className="flex items-center gap-2 mb-6">
            <History className="w-5 h-5 text-indigo-500" strokeWidth={2} />
            <h3 className="text-xl font-bold text-gray-800">Historical Weather</h3>
            <span className="text-xs text-gray-500 ml-auto">Past 24 Hours</span>
          </div>

          {historicalData.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-500">No historical data available</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto scrollbar-hide">
              {historicalData.map((data, index) => (
                <div
                  key={data.epochTime || index}
                  className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-indigo-50/50 transition-all duration-200 border border-white/30 bg-white/30 backdrop-blur-sm"
                >
                  {/* Time */}
                  <div className="flex-1 text-sm font-semibold text-gray-700 min-w-[90px]">
                    {formatTime(data.dateTime)}
                  </div>

                  {/* Weather Icon */}
                  <div className="flex-1 flex justify-center">
                    <div className="text-indigo-500 transition-transform duration-200 hover:scale-110">
                      {getWeatherIcon(data.weatherIcon, 24)}
                    </div>
                  </div>

                  {/* Temperature */}
                  <div className="flex-1 flex items-center justify-center gap-2">
                    <span className="text-lg font-bold text-gray-800">
                      {Math.round(data.temperature)}°
                    </span>
                    {getTempTrend(index)}
                  </div>

                  {/* Weather Text */}
                  <div className="flex-1 text-xs text-gray-600 text-right truncate max-w-[120px]">
                    {data.weatherText}
                  </div>

                  {/* Humidity */}
                  <div className="flex-1 flex justify-end">
                    <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-lg">
                      <span className="text-xs text-blue-600 font-semibold">
                        {data.humidity}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {historicalData.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Avg Temp</div>
                  <div className="text-lg font-bold text-gray-800">
                    {Math.round(historicalData.reduce((sum, d) => sum + d.temperature, 0) / historicalData.length)}°
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Avg Humidity</div>
                  <div className="text-lg font-bold text-gray-800">
                    {Math.round(historicalData.reduce((sum, d) => sum + d.humidity, 0) / historicalData.length)}%
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Temp Range</div>
                  <div className="text-lg font-bold text-gray-800">
                    {Math.round(Math.max(...historicalData.map(d => d.temperature)) - Math.min(...historicalData.map(d => d.temperature)))}°
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
