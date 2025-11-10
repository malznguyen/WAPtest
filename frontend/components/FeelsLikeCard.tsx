'use client';

import { useEffect, useState } from 'react';
import { weatherService } from '@/services/weatherService';
import { SmallCardSkeleton } from './LoadingSkeleton';
import { Thermometer } from 'lucide-react';

interface FeelsLikeCardProps {
  city: string;
}

export default function FeelsLikeCard({ city }: FeelsLikeCardProps) {
  const [feelsLike, setFeelsLike] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const data = await weatherService.getCurrentWeather(city);

      if (data) {
        setFeelsLike(Math.round(data.feelsLike));
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
          <div className="flex items-center gap-2 mb-3">
            <Thermometer className="w-4 h-4 text-orange-500" strokeWidth={2} />
            <div className="text-sm text-gray-500 font-semibold tracking-wider">FEELS LIKE</div>
          </div>

          <div className="flex items-center justify-center h-24">
            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-500 to-red-400">
              {feelsLike}°
            </div>
          </div>
        </div>
      )}
    </>
  );
}
