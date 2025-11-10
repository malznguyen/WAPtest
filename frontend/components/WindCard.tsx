'use client';

import { useEffect, useState } from 'react';
import { weatherService } from '@/services/weatherService';
import { SmallCardSkeleton } from './LoadingSkeleton';
import { Wind } from 'lucide-react';

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
    <>
      {loading ? (
        <SmallCardSkeleton />
      ) : error ? (
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20">
          <div className="text-red-500 text-sm">{error}</div>
        </div>
      ) : (
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 card-hover fade-in h-full">
          <div className="flex items-center gap-2 mb-4">
            <Wind className="w-4 h-4 text-cyan-600" strokeWidth={2} />
            <div className="text-sm text-gray-500 font-semibold tracking-wider">WIND</div>
          </div>

          <div className="flex items-center justify-between gap-4">
            {/* Wind Information */}
            <div className="flex-1 space-y-2">
              <div>
                <div className="text-xs text-gray-500 font-medium">Speed</div>
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-600 to-blue-500">
                  {windData.speed} <span className="text-base">km/h</span>
                </div>
              </div>
              {windData.gustSpeed > 0 && (
                <div>
                  <div className="text-xs text-gray-500 font-medium">Gusts</div>
                  <div className="text-lg font-semibold text-gray-700">{windData.gustSpeed} km/h</div>
                </div>
              )}
              <div>
                <div className="text-xs text-gray-500 font-medium">Direction</div>
                <div className="text-lg font-semibold text-gray-700">{windData.directionText}</div>
              </div>
            </div>

            {/* Compass */}
            <div className="relative w-20 h-20 flex-shrink-0">
              <div className="absolute inset-0 rounded-full border-4 border-gradient-to-br from-cyan-200 to-blue-200 bg-gradient-to-br from-cyan-50 to-blue-50 shadow-inner"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-1 h-8 bg-gradient-to-t from-cyan-600 to-blue-500 rounded-full shadow-lg transition-transform duration-700 ease-out"
                  style={{
                    transform: `rotate(${windData.direction}deg)`,
                    transformOrigin: 'center bottom'
                  }}
                ></div>
              </div>
              <div className="absolute top-0.5 left-1/2 -translate-x-1/2 text-xs font-bold text-cyan-600">N</div>
              <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 text-xs font-semibold text-gray-400">S</div>
              <div className="absolute left-0.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">W</div>
              <div className="absolute right-0.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">E</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
