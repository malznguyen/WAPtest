'use client';

import { useEffect, useState } from 'react';
import { weatherService } from '@/services/weatherService';
import { getWindDirection } from '@/utils/weatherIcons';

interface WindCardProps {
  city: string;
}

export default function WindCard({ city }: WindCardProps) {
  const [windData, setWindData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const data = await weatherService.getCurrentWeather(city);

      if (data) {
        setWindData({
          speed: Math.round(data.wind.speed),
          gustSpeed: Math.round(data.windGust.speed),
          direction: data.wind.direction,
          directionText: data.wind.directionText
        });
      } else {
        setError('Failed to load');
      }

      setLoading(false);
    };

    fetchData();
  }, [city]);

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
      <div className="text-sm text-gray-500 font-medium mb-4">WIND</div>

      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-sm">{error}</div>
      ) : (
        <div className="flex items-center justify-between gap-6">
          {/* Wind Information */}
          <div className="flex-1 space-y-2">
            <div>
              <div className="text-xs text-gray-500">Speed</div>
              <div className="text-2xl font-bold text-gray-800">{windData.speed} km/h</div>
            </div>
            {windData.gustSpeed > 0 && (
              <div>
                <div className="text-xs text-gray-500">Gusts</div>
                <div className="text-lg font-semibold text-gray-700">{windData.gustSpeed} km/h</div>
              </div>
            )}
            <div>
              <div className="text-xs text-gray-500">Direction</div>
              <div className="text-lg font-semibold text-gray-700">{windData.directionText}</div>
            </div>
          </div>

          {/* Compass */}
          <div className="relative w-24 h-24 flex-shrink-0">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-1 h-10 bg-blue-500 rounded-full"
                style={{
                  transform: `rotate(${windData.direction}deg)`,
                  transformOrigin: 'center bottom'
                }}
              ></div>
            </div>
            <div className="absolute top-1 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-600">N</div>
          </div>
        </div>
      )}
    </div>
  );
}
