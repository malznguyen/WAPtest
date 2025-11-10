'use client';
import { useState, useEffect } from 'react';
import { getCurrentWeather } from '../services/weatherApi';

export default function FeelsLikeCard() {
  const [temp, setTemp] = useState<number | null>(null);

  useEffect(() => {
    getCurrentWeather().then(data => setTemp(data.feels_like));
  }, []);

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg">
      <p className="text-sm text-gray-500 mb-2">Feels like</p>
      <p className="text-4xl font-bold text-gray-800">
        {temp ? `${Math.round(temp)}°C` : '--'}
      </p>
    </div>
  );
}
