'use client';

import { useEffect, useState } from 'react';
import { weatherService } from '@/services/weatherService';

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
    <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
      <div className="text-sm text-gray-500 font-medium mb-2">FEELS LIKE</div>

      {loading ? (
        <div className="flex items-center justify-center h-24">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-sm">{error}</div>
      ) : (
        <div className="flex items-center justify-center h-24">
          <div className="text-5xl font-bold text-gray-800">{feelsLike}°</div>
        </div>
      )}
    </div>
  );
}
