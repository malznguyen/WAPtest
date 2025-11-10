'use client';
import { useState, useEffect } from 'react';
import { getCurrentWeather } from '../services/weatherApi';

export default function WindCard() {
  const [wind, setWind] = useState<any>(null);

  useEffect(() => {
    getCurrentWeather().then(data =>
      setWind({ speed: data.wind_speed, direction: data.wind_direction })
    );
  }, []);

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-3">Wind</h3>
      {wind ? (
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm">Wind: {wind.speed} km/h</p>
            <p className="text-sm">Direction: {wind.direction}</p>
          </div>
          <div className="w-20 h-20 rounded-full border-2 border-gray-300 flex items-center justify-center">
            <span className="text-xs font-semibold">{wind.direction}</span>
          </div>
        </div>
      ) : <p className="text-sm text-gray-400">Loading...</p>}
    </div>
  );
}
